import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <SignIn 
            routing="path"
            path="/sign-in"
            afterSignInUrl="/home"
            appearance={{
            elements: {
                formButtonPrimary: {
                backgroundColor: "#3E513E",
                "&:hover": {
                    backgroundColor: "#2d3d2d"
                }
                }
            }
            }}
        />
        </div>
    );
}