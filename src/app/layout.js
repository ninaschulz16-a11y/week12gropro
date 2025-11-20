import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Neighbour Net",
  description: "Connect with your neighbours",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* navbar */}
          <nav className="bg-[#375f37] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                {/* logo */}
                <Link
                  href="/"
                  className="text-xl font-bold text-white tracking-wide drop-shadow-md"
                >
                  Neighbour Net
                </Link>

                {/* nav links */}
                <div className="flex items-center gap-2">
                  <Link
                    href="/posts"
                    className="text-white hover:text-[#3E513E] hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                  >
                    Posts
                  </Link>

                  <SignedOut>
                    <Link
                      href="/sign-in"
                      className="text-white hover:text-[#3E513E] hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="bg-[#3E513E] text-white px-4 py-2 rounded-full hover:bg-[#2d3d2d] transition"
                    >
                      Sign Up
                    </Link>
                  </SignedOut>

                  <SignedIn>
                    <Link
                      href="/home"
                      className="text-white hover:text-[#3E513E] hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-post"
                      className="text-white hover:text-[#3E513E] hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                    >
                      Create Post
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </div>
            </div>
          </nav>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
