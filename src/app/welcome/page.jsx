"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Neighbour Net</h1>
        <nav className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center flex-1">
        <SignedIn>
          <h2 className="text-3xl font-semibold">👋 Welcome Neighbour!👋</h2>
          <p className="mt-2 text-gray-600">
            Explore posts, make connections, and share!
          </p>
        </SignedIn>
        <SignedOut>
          <p className="text-red-500">You need to log in first.</p>
        </SignedOut>
      </main>
    </div>
  );
}
