import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import jwt from 'jsonwebtoken'; // No longer needed
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '@/lib/authOptions'; // Corrected import path
import { PrismaClient } from '@prisma/client';
import { Question } from '@prisma/client'; // Import Question type from Prisma

// Helper function to get question details (simplified for this context)
async function getCorrectAnswerIndex(questionId: string): Promise<number | null> {
  try {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { correctAnswer: true, options: true } // Select only necessary fields
    });
    if (!question || question.correctAnswer === null || typeof question.correctAnswer !== 'number') {
       console.warn(`Correct answer index not found or invalid for question ${questionId}`);
       return null; // Handle case where question or index is missing/invalid
    }
    
    // If options were shuffled on the frontend, we need the original index
    // This assumes the correctAnswer stored in DB is the *original* index before shuffling
    return question.correctAnswer; 
  } catch (error) {
    console.error(`Error fetching correct answer for question ${questionId}:`, error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    console.log('Test Completion API: Received request');
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    const userId = session.user.id;
    console.log('Authenticated User ID from session:', userId);

    const { testType, sections, essayContent, overallTimeSpent } = await request.json();
    console.log('Request Body Received:', JSON.stringify({ testType, sections, essayContent, overallTimeSpent }, null, 2));

    // For single section tests, convert the data to match the full test structure
    if (testType !== 'full') {
      if (!sections || !Array.isArray(sections) || sections.length === 0 || !sections[0].answers) {
         console.error('Invalid sections data for single test:', sections);
         return new NextResponse(JSON.stringify({ error: 'Invalid test data format.' }), { status: 400 });
      }
      
      const submittedAnswers = sections[0].answers;
      console.log('Processing submitted answers:', submittedAnswers);

      // Recalculate isCorrect based on DB data
      const formattedAnswers = await Promise.all(submittedAnswers.map(async (answer: any) => {
        // Validate submitted answer structure
        if (typeof answer.questionId !== 'string' || typeof answer.selectedAnswer !== 'number') {
          console.warn('Invalid answer format received from frontend:', answer);
          return null; // Skip invalid answers
        }
        
        const correctAnswerIndex = await getCorrectAnswerIndex(answer.questionId);
        // Correct comparison: Use submitted INDEX
        const isCorrect = correctAnswerIndex !== null && answer.selectedAnswer === correctAnswerIndex; 

        // Corrected Logging: Log the actual submitted index field
        console.log(`Processing QID: ${answer.questionId}, Submitted Index: ${answer.selectedAnswer}, Correct Index: ${correctAnswerIndex}, Calculated isCorrect: ${isCorrect}`);

        return {
          questionId: answer.questionId,
          selectedAnswerIndex: answer.selectedAnswer, // Keep the submitted index
          isCorrect: isCorrect, 
          timeSpent: answer.timeSpent || 0
        };
      }));

      // Filter out any null values from invalid answers
      const validFormattedAnswers = formattedAnswers.filter(a => a !== null);

      console.log('Formatted Answers with recalculated isCorrect:', validFormattedAnswers);
      
      const score = calculateScore(validFormattedAnswers);
      console.log('Calculated Score:', score);

      const testAttempt = await prisma.testAttempt.create({
        data: {
          userId: userId,
          section: testType,
          score: score,
          answers: JSON.stringify([{ 
            type: testType,
            isPilot: false,
            answers: validFormattedAnswers // Use the validated & formatted answers
          }]),
          timeSpent: overallTimeSpent || 0,
          completedAt: new Date(),
          testType: testType
        },
      });

      console.log('Test Completion API: Single Section attempt saved successfully. Attempt ID:', testAttempt.id);
      return new NextResponse(
        JSON.stringify({ 
          success: true, 
          attemptId: testAttempt.id
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Full test handling
    console.warn('Full test completion logic needs review for isCorrect recalculation.');

    const sectionScores = sections.map((section: { type: string; answers: any[] }) => {
      if (section.type === 'essay' || !section.answers) return 0; 
      
      // Assuming full test answers *might* already have correct 'isCorrect'
      // If not, fetch correct answers and recalculate like above
      const answersForScore = section.answers.map((answer: any) => ({
        questionId: answer.questionId,
        selectedAnswerIndex: answer.selectedAnswer, // Check if this is index or text
        isCorrect: answer.isCorrect === true, // Relying on frontend - needs verification
        timeSpent: answer.timeSpent || 0
      }));
      return calculateScore(answersForScore);
    });

    const validScores = sectionScores.filter((s: number | 0): s is number => typeof s === 'number');
    const overallScore = validScores.length > 0 
        ? validScores.reduce((sum: number, score: number) => sum + score, 0) / validScores.length
        : 0;

    const testAttempt = await prisma.testAttempt.create({
      data: {
        userId: userId,
        section: 'full_test', // Or derive from sections if needed
        score: overallScore,
        answers: JSON.stringify(sections), // Save raw sections data
        essayContent: essayContent,
        timeSpent: overallTimeSpent || 0,
        completedAt: new Date(),
        testType: testType
      },
    });

    console.log('Test Completion API: Full Test attempt saved with score:', overallScore, 'Attempt ID:', testAttempt.id);
    return new NextResponse(
      JSON.stringify({ 
        success: true, 
        attemptId: testAttempt.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Test Completion API: Server error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new NextResponse(
      JSON.stringify({ error: 'שגיאת שרת פנימית', details: errorMessage }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Helper function to calculate score
function calculateScore(answers: any[]): number {
  if (!Array.isArray(answers) || answers.length === 0) {
    return 0;
  }
  // Ensure isCorrect is strictly true
  const correctAnswers = answers.filter((answer: any) => answer.isCorrect === true).length;
  const totalQuestions = answers.length;
  
  console.log(`Calculating score: ${correctAnswers} correct out of ${totalQuestions}`);

  // Basic accuracy score for now (0-100)
  const accuracyScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  
  // Keep scoring simple for now, focus on accuracy %
  // const maxTimePerQuestion = 120;
  // const totalMaxTime = maxTimePerQuestion * totalQuestions;
  // const totalTimeSpent = answers.reduce((sum, answer) => sum + (answer.timeSpent || 0), 0);
  // const timingScore = totalMaxTime > 0 ? Math.max(0, 100 - ((totalTimeSpent / totalMaxTime) * 100)) : 100;
  // return (accuracyScore * 0.8) + (timingScore * 0.2);
  
  return accuracyScore; 
} 