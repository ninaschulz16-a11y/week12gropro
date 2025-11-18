"use client";

// this page checks if the user already has a profile in the database.. if not, it creates one automatically and redirects to profile page

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    // if user is not signed in redirect to sign in page
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    async function checkProfile() {
      try {
        // send clerk id to api to create or fetch profile
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerk_user_id: user.id,
            username: user.username || user.firstName || "user",
            avatar_url: user.imageUrl,
          }),
        });

        const data = await res.json();

        // redirect to own profile using id from db
        if (data?.id) {
          router.push(`/profile/${data.id}`);
        }
      } catch (error) {
        console.error("profile setup error:", error);
      }
    }

    checkProfile();
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-600 text-lg">Loading your profile...</p>
    </div>
  );
}
