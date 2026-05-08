import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")
  const refreshToken = request.cookies.get("refreshToken")

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname.startsWith("/register")

  const isDashboardPage =
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/projects") ||
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/settings") ||
    request.nextUrl.pathname.startsWith("/analytics") ||
    request.nextUrl.pathname.startsWith("/billing")

   if (!accessToken && refreshToken && isDashboardPage) {
    const refreshUrl = new URL("/api/auth/refresh", request.url);

    refreshUrl.searchParams.set(
      "redirectTo",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(refreshUrl);
  }  

  if (!accessToken && !refreshToken && isDashboardPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/projects/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
