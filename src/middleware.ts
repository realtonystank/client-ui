import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register"
  ) {
    const searchParams = request.nextUrl.searchParams;
    const accessToken = request.cookies.get("accessToken");
    if (accessToken?.value) {
      const restaurantId = searchParams.get("restaurantId");
      const redirectTo = restaurantId ? `/?restaurantId=${restaurantId}` : `/`;
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }
}
