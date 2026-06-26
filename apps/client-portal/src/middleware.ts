// DEV BYPASS: middleware auth is disabled during building phase.
// Re-enable once auth-portal is live and DB is connected.
// import { auth } from "@smartkode/auth";
// import { NextResponse } from "next/server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/overview/:path*", "/projects/:path*", "/invoices/:path*", "/settings/:path*"],
};
