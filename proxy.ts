import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/login",
  "/super-admin/setup",
  "/api/auth/login",
  "/api/auth/logout",
  "/api/admin/super-setup",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic =
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    ) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".");

  const hasSession = Boolean(request.cookies.get("garud_session")?.value);

  if (pathname === "/" && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublic && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
