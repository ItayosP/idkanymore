import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: Request) {
  const token = await getToken({ req: request });
  const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

  // Check if the request is for an admin route
  if (request.url.includes('/admin')) {
    // If no token or not the admin user, redirect to home
    if (!token || token.sub !== ADMIN_USER_ID) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*']
}; 