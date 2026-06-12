import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /moderator routes except /moderator/login
  if (path.startsWith('/moderator') && path !== '/moderator/login') {
    const token = request.cookies.get('auth_token')?.value;

    if (!token || token !== 'authenticated_moderator_session') {
      return NextResponse.redirect(new URL('/moderator/login', request.url));
    }
  }

  // Redirect authenticated users away from login
  if (path === '/moderator/login') {
    const token = request.cookies.get('auth_token')?.value;
    if (token === 'authenticated_moderator_session') {
      return NextResponse.redirect(new URL('/moderator', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/moderator/:path*'],
};
