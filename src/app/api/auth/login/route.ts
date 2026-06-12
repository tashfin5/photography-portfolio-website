import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Default hardcoded credentials
    if (username === 'admin' && password === 'admin') {
      const response = NextResponse.json({ success: true });
      
      // Set HTTP-only cookie for simple auth
      response.cookies.set({
        name: 'auth_token',
        value: 'authenticated_moderator_session',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
