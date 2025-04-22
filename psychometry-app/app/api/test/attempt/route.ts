import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Question } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { section, count = 20 } = await req.json();

    // Get questions from database only
    const questions = await prisma.question.findMany({
      where: { section },
      take: count,
      orderBy: { id: 'asc' }
    });

    // Shuffle questions
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    // Create test attempt
    const testAttempt = await prisma.testAttempt.create({
      data: {
        userId: session.user.id,
        section,
        questions: shuffledQuestions.map((q: Question) => q.id),
        answers: [],
        score: 0,
        completed: false,
        startedAt: new Date()
      }
    });

    return NextResponse.json({ 
      attemptId: testAttempt.id,
      questions: shuffledQuestions.map((q: Question) => ({
        id: q.id,
        content: q.content,
        options: JSON.parse(q.options),
        correctAnswer: q.correctAnswer,
        section: q.section,
        difficulty: q.difficulty
      }))
    });
  } catch (error) {
    console.error('Error creating test attempt:', error);
    return NextResponse.json({ error: 'Failed to create test attempt' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section');
    const count = parseInt(searchParams.get('count') || '20');

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    // Get questions from database only
    const questions = await prisma.question.findMany({
      where: { section },
      take: count,
      orderBy: { id: 'asc' }
    });

    // Shuffle questions
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    return NextResponse.json(
      shuffledQuestions.map((q: Question) => ({
        id: q.id,
        content: q.content,
        options: JSON.parse(q.options),
        correctAnswer: q.correctAnswer,
        section: q.section,
        difficulty: q.difficulty
      }))
    );
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
} 