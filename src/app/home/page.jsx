"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function HomePage() {
  // get user info from clerk
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // wait for clerk to load
    if (!isLoaded) {
      return;
    }

    // if not signed in, go to sign in page
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    async function checkProfile() {
      try {
        // create or fetch profile from database
        const response = await fetch("/api/profile", {
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

        const profileData = await response.json();

        // redirect to profile page
        if (profileData?.id) {
          router.push(`/profile/${profileData.id}`);
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