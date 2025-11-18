import PostsList from "@/components/PostsList";
import Image from "next/image";

import { SignIn } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to Neighbour Net
        </h1>
        <SignIn
          routing="hash" // enable hash routing to avoid catch-all warning
          afterSignInUrl="/home"
          afterSignUpUrl="/home"
        />
      </div>
    </div>
  );
}
