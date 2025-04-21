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
    const userId = session.user.id;
    console.log('Authenticated User ID from session:', userId);

    const { section, answers, timeSpent } = await request.json();
    console.log('Request Body:', { section, answers, timeSpent });

    // Calculate score based on correct answers (80% weight) and timing (20% weight)
    const correctAnswers = answers.filter((answer: any) => answer.isCorrect).length;
    const totalQuestions = answers.length;
    const accuracyScore = (correctAnswers / totalQuestions) * 100;
    
    // Calculate timing score (faster is better, max time is 2 minutes per question)
    const maxTimePerQuestion = 120; // 2 minutes in seconds
    const totalMaxTime = maxTimePerQuestion * totalQuestions;
    const timingScore = Math.max(0, 100 - ((timeSpent / totalMaxTime) * 100));
    
    // Final score calculation
    const finalScore = (accuracyScore * 0.8) + (timingScore * 0.2);

    // Save the test attempt
    const testAttempt = await prisma.testAttempt.create({
      data: {
        userId: userId,
        section: section,
        score: finalScore,
        answers: JSON.stringify(answers),
        timeSpent,
        completedAt: new Date(),
      },
    });

    // Calculate new progress
    const attempts = await prisma.testAttempt.findMany({
      where: { 
        userId: userId,
        section,
      },
      select: {
        score: true,
      },
    });

    // Calculate average score for this section
    const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
    const averageScore = Math.round(totalScore / attempts.length);

    console.log('Test Completion API: Test attempt saved successfully');
    return new NextResponse(
      JSON.stringify({
        success: true,
        attemptId: testAttempt.id,
        progress: averageScore,
        score: finalScore,
        accuracy: accuracyScore,
        timing: timingScore
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
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
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
} 