import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    const accessToken = request.cookies.get("accessToken");
    if (accessToken?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
