import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <SignUp 
            routing="path"
            path="/sign-up"
            afterSignUpUrl="/home"
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