import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
  const webToken = request.cookies.get("accessToken")

  const isAuthPage = 
    request.nextUrl.pathname.startsWith("/login") || 
    request.nextUrl.pathname.startsWith("/auth") || 
    request.nextUrl.pathname.startsWith("/register")

  const isDashboardPage = 
    request.nextUrl.pathname.startsWith("/") ||
    request.nextUrl.pathname.startsWith("/projects") ||
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/settings")

  if (!webToken && isDashboardPage){
    return NextResponse.redirect(new URL("/login",request.url))
  }  

  if(webToken && isAuthPage){
    return NextResponse.redirect(new URL("/",request.url))
  }

  return NextResponse.next()
}
