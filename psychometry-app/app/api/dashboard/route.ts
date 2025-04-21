import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';

// Define the structure for progress data
interface ProgressItem {
  count: number;
  averageScore: number;
  bestScore: number;
}

interface ProgressData {
  [section: string]: ProgressItem;
}

// Define structure for recent attempts
interface RecentAttempt {
  id: string;
  section: string;
  score: number;
  completedAt: Date;
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userId = session.user.id;

    // 1. Fetch User Profile Data
    const userName = session.user.name;
    const userEmail = session.user.email;
    const userImage = session.user.image;

    // 2. Fetch Test Attempts (Get necessary fields for progress and recent attempts)
    const attempts = await prisma.testAttempt.findMany({
      where: { userId: userId },
      select: {
        id: true,
        section: true,
        score: true,
        completedAt: true,
      },
      orderBy: {
        completedAt: 'desc',
      },
    });

    // 3. Calculate Progress & Find Best Scores
    const progress: ProgressData = {};
    const sectionScores: { [section: string]: number[] } = {};

    for (const attempt of attempts) {
      if (!sectionScores[attempt.section]) {
        sectionScores[attempt.section] = [];
      }
      sectionScores[attempt.section].push(attempt.score);
    }

    for (const section in sectionScores) {
      const scores = sectionScores[section];
      const totalScore = scores.reduce((sum, score) => sum + score, 0);
      const averageScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0;
      const bestScore = scores.length > 0 ? Math.round(Math.max(...scores)) : 0;
      progress[section] = {
        count: scores.length,
        averageScore: averageScore,
        bestScore: bestScore,
      };
    }

    // 4. Get Recent Attempts (already sorted desc by date)
    const recentAttempts: RecentAttempt[] = attempts.slice(0, 5).map(a => ({
      id: a.id,
      section: a.section,
      score: Math.round(a.score),
      completedAt: a.completedAt
    }));

    // 5. Construct Response
    const dashboardData = {
      user: {
        name: userName,
        email: userEmail,
        image: userImage,
      },
      progress: progress,
      recentAttempts: recentAttempts,
    };

    return new NextResponse(JSON.stringify(dashboardData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Dashboard API Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error fetching dashboard data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
} 