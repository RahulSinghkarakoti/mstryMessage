import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/','/dashboard/:path*', '/sign-in', '/sign-up', '/verify/:path*'],
};

export async function middleware(request: NextRequest) { 
  const token = await getToken({ req: request }); 

  const url = request.nextUrl;

  // Redirect authenticated users away from auth pages
  if (token && ['/sign-in', '/sign-up', '/verify'].includes(url.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users trying to access /dashboard
  // 
  if (!token && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/verify') )) {

    console.log("------------in middle ware ")
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
