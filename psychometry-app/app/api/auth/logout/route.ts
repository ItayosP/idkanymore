import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ success: true });
  
  // Clear all auth-related cookies
  ['token', 'auth-token'].forEach(cookieName => {
    response.cookies.set(cookieName, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0)
    });
  });

  return response;
} 