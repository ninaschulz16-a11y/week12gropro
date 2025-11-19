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
                formButtonPrimary: 
                "bg-[#3E513E] hover:bg-[#2d3d2d] text-white !important",
                primaryButton:
                "bg-[#3E513E] hover:bg-[#2d3d2d] text-white !important"
            }
            }}
        />
        </div>
    );
}