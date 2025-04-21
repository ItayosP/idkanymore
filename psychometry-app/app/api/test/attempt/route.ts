import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  // --- Use NextAuth Session Authentication --- 
  const session = await getServerSession(authOptions);
  // console.log('Session object received in /api/test/attempt:', session);

  if (!session || !session.user || !session.user.id) {
    console.log('Unauthorized: No valid NextAuth session found in /api/test/attempt.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  console.log(`Saving test attempt for user ID from session: ${userId}`);
  // --- End NextAuth Authentication --- 

  // --- Save attempt using userId from NextAuth session --- 
  try {
    // Parse request body
    const body = await request.json();
    const { section, score, answers } = body;

    // Create test attempt
    const attempt = await prisma.testAttempt.create({
      data: {
        userId: userId, // Use userId from session
        section,
        score,
        answers: JSON.stringify(answers),
        completedAt: new Date()
      }
    });

    return new NextResponse(
      JSON.stringify({ success: true, attempt }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // --- This catch block now handles DB or JSON parsing errors --- 
    console.error('Error creating test attempt:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to save test attempt' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 