"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const { isSignedIn } = useUser();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
            
            {/* logo / home link */}
            <Link href="/" className="text-xl font-bold text-green-700">
                neighbour net
            </Link>

            {/* nav links */}
            <div className="flex items-center gap-6">
                <Link 
                href="/posts" 
                className="text-gray-700 hover:text-green-700 transition"
                >
                posts
                </Link>

                {isSignedIn ? (
                <>
                    <Link 
                    href="/home" 
                    className="text-gray-700 hover:text-green-700 transition"
                    >
                    my profile
                    </Link>
                    <Link 
                    href="/create-post" 
                    className="text-gray-700 hover:text-green-700 transition"
                    >
                    create post
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                </>
                ) : (
                <>
                    <Link 
                    href="/sign-in" 
                    className="text-gray-700 hover:text-green-700 transition"
                    >
                    sign in
                    </Link>
                    <Link 
                    href="/sign-up" 
                    className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition"
                    >
                    sign up
                    </Link>
                </>
                )}
            </div>
            </div>
        </div>
        </nav>
    );
}