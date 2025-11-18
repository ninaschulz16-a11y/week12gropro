// src/proxy.js

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// define public routes that anyone can access
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/posts/(.*)",
  "/profile/(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // protect routes that aren't public
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const { userId } = await auth();

  // redirect to profile after sign in/up
  if (userId && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/profile/me", request.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
