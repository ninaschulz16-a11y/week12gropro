import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// map which routes should require authentication
export const config = {
  matcher: ["/((?!_next|static|.*\\..*).*)", "/api/:path*"],
};
