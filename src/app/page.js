import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to Neighbour Net
        </h1>
        <SignIn
          routing="hash"
          afterSignInUrl="/home"
          afterSignUpUrl="/home"
        />
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            do not have an account?{" "}
            <Link href="/sign-up" className="text-orange-600 font-semibold hover:underline">
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}