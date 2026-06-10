import { NextResponse } from "next/server";
import { auth } from "@smartkode/auth";

// Define protected and public routes
const protectedRoutes = ["/overview", "/intake", "/projects", "/payouts", "/settings"];
const publicRoutes = ["/login", "/register", "/register/pending", "/"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // If user is trying to access a protected route without being logged in
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // If user is logged in and trying to access login/register
  if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/overview", nextUrl));
  }

  return NextResponse.next();
});

// Matcher configuration for Next.js middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png|logo.png).*)"],
};
