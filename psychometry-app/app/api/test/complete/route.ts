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

    // --- MODIFIED FOR FULL TEST --- 
    // Expecting a different body structure for full tests
    const { testType, sections, essayContent, overallTimeSpent } = await request.json(); 
    console.log('Request Body:', { testType, sections, essayContent, overallTimeSpent });

    if (testType === 'full') {
        // TODO: Implement full test saving logic
        // 1. Validate the structure of 'sections' array
        // 2. Calculate scores for each non-pilot MC section
        // 3. Calculate weighted verbal score including essay (requires scoring logic for essay)
        // 4. Calculate overall score (if applicable based on spec)
        // 5. Update Prisma schema for TestAttempt to store:
        //    - testType ('full', 'verbal', etc.)
        //    - essayContent (string/text)
        //    - structured answers (e.g., JSON containing answers per section, pilot status, section scores)
        //    - overallScore, verbalScore, quantScore, englishScore
        // 6. Create ONE TestAttempt record for the entire full test.

        console.warn("Full test saving logic not fully implemented in backend!");
        
        // Placeholder: Save a basic attempt record (Needs schema update)
        const testAttempt = await prisma.testAttempt.create({
          data: {
            userId: userId,
            section: 'full_test', // Indicate it's a full test
            score: 0, // Placeholder score - needs calculation
            answers: JSON.stringify(sections), // Store section answers (structure needs finalization)
            essayContent: essayContent, // <<< Save the essay content (Requires DB schema change!)
            timeSpent: overallTimeSpent || 0,
            completedAt: new Date(),
            testType: testType // <<< Added missing field
          },
        });

        console.log('Test Completion API: Placeholder Full Test attempt saved');
        return new NextResponse(
          JSON.stringify({ 
            success: true, 
            attemptId: testAttempt.id // Return the ID of the saved full test attempt
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } else {
      // --- Existing Single Section Logic --- 
      // Assuming body contains { section, answers, timeSpent } for single sections
      const { section, answers, timeSpent } = { testType, sections, overallTimeSpent }; // Reinterpret if needed or keep separate handling

      // TODO: Refactor single section logic if endpoint handles both
      // The existing calculation might need adjustment depending on `answers` structure now
      const correctAnswers = answers.filter((answer: any) => answer.isCorrect).length;
      const totalQuestions = answers.length;
      const accuracyScore = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
      
      const maxTimePerQuestion = 120; 
      const totalMaxTime = maxTimePerQuestion * totalQuestions;
      const timingScore = totalMaxTime > 0 ? Math.max(0, 100 - ((timeSpent / totalMaxTime) * 100)) : 100;
      
      const finalScore = (accuracyScore * 0.8) + (timingScore * 0.2);

      const testAttempt = await prisma.testAttempt.create({
        data: {
          userId: userId,
          section: section, // Use the single section name
          score: finalScore,
          answers: JSON.stringify(answers),
          timeSpent,
          completedAt: new Date(),
          testType: testType // <<< Add testType here as well
        },
      });
      
      // Calculate progress (remains the same for single section)
      // ... (progress calculation logic as before)

      console.log('Test Completion API: Single Section attempt saved successfully');
      return new NextResponse(
        JSON.stringify({
          success: true,
          attemptId: testAttempt.id, // Return the ID
          // progress: averageScore, // Progress might be removed or recalculated
          score: finalScore,
          // accuracy: accuracyScore,
          // timing: timingScore
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

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