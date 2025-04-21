import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Log request details
    console.log('Debug API: Request URL:', request.url);
    console.log('Debug API: Request Method:', request.method);
    console.log('Debug API: Request Headers:', Object.fromEntries(request.headers.entries()));
    
    // Return a simple JSON response
    return new Response(
      JSON.stringify({ message: 'Debug response' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Debug API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 