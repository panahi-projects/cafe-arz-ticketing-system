import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect only if accessing the root path ("/")
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL("/dashboard/tickets/list", request.url)
    );
  }

  // For all other paths, continue without redirect
  return NextResponse.next();
}

export const config = {
  // Match only the root path
  matcher: "/",
};
