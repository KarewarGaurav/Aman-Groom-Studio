import type { Metadata } from "next";
import Link from "next/link";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignupPage() {
  return (
    <AuthSplitLayout
      title="Join the Atelier"
      subtitle="Create your member account for seamless checkout and order tracking."
      footer={
        <>
          Already a member?{" "}
          <Link href="/login" className="text-burgundy hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthSplitLayout>
  );
}
