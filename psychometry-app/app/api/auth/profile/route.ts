import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request) {
  console.log('Profile API: Received request');

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    console.log('Unauthorized: No valid NextAuth session found in /api/auth/profile.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  console.log('Profile API: Authenticated User ID from session:', userId);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      console.log('Profile API: User not found in DB for ID:', userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Profile API: Returning user data:', user);
    return NextResponse.json(user);

  } catch (error) {
    console.error('Profile API: Error fetching user from DB:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 