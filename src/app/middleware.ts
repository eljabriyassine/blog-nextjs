// app/middleware.ts
import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user && req.url.includes("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to continue if it's not an '/auth
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/*"], // Apply the middleware only on pages under '/auth'
};
