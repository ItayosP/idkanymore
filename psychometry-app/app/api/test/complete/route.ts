import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import jwt from 'jsonwebtoken'; // No longer needed
import { getServerSession } from 'next-auth/next'; // Import getServerSession
import { authOptions } from '@/lib/authOptions'; // Corrected import path
import { PrismaClient } from '@prisma/client';

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
    console.log('Request Body:', { testType, sections, essayContent, overallTimeSpent });

    // For single section tests, convert the data to match the full test structure
    if (testType !== 'full') {
      // Convert single section data to match the structure expected by the results API
      const formattedAnswers = sections[0].answers.map((answer: any) => ({
        questionId: answer.questionId,
        selectedAnswerIndex: answer.selectedAnswer,
        isCorrect: answer.isCorrect,
        timeSpent: answer.timeSpent
      }));

      // Calculate score for single section
      const score = calculateScore(formattedAnswers);

      // Create a test attempt with the standardized structure
      const testAttempt = await prisma.testAttempt.create({
        data: {
          userId: userId,
          section: testType,
          score: score,
          answers: JSON.stringify(formattedAnswers),
          timeSpent: overallTimeSpent || 0,
          completedAt: new Date(),
          testType: testType
        },
      });

      console.log('Test Completion API: Single Section attempt saved successfully');
      return new NextResponse(
        JSON.stringify({ 
          success: true, 
          attemptId: testAttempt.id
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Full test handling
    // Calculate scores for each section
    const sectionScores = sections.map((section: { type: string; answers: any[] }) => {
      if (section.type === 'essay') return 0; // Essay score is calculated separately
      const formattedAnswers = section.answers.map((answer: any) => ({
        questionId: answer.questionId,
        selectedAnswerIndex: answer.selectedAnswer,
        isCorrect: answer.isCorrect,
        timeSpent: answer.timeSpent
      }));
      return calculateScore(formattedAnswers);
    });

    // Calculate overall score (excluding essay for now)
    const overallScore = sectionScores.reduce((sum: number, score: number) => sum + score, 0) / sectionScores.length;

    const testAttempt = await prisma.testAttempt.create({
      data: {
        userId: userId,
        section: 'full_test',
        score: overallScore,
        answers: JSON.stringify(sections),
        essayContent: essayContent,
        timeSpent: overallTimeSpent || 0,
        completedAt: new Date(),
        testType: testType
      },
    });

    console.log('Test Completion API: Full Test attempt saved with score:', overallScore);
    return new NextResponse(
      JSON.stringify({ 
        success: true, 
        attemptId: testAttempt.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Test Completion API: Server error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'שגיאת שרת פנימית' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Helper function to calculate score
function calculateScore(answers: any[]): number {
  const correctAnswers = answers.filter((answer: any) => answer.isCorrect).length;
  const totalQuestions = answers.length;
  const accuracyScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  
  const maxTimePerQuestion = 120;
  const totalMaxTime = maxTimePerQuestion * totalQuestions;
  const totalTimeSpent = answers.reduce((sum, answer) => sum + (answer.timeSpent || 0), 0);
  const timingScore = totalMaxTime > 0 ? Math.max(0, 100 - ((totalTimeSpent / totalMaxTime) * 100)) : 100;
  
  return (accuracyScore * 0.8) + (timingScore * 0.2);
} 