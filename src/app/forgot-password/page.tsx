import type { Metadata } from "next";
import Link from "next/link";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout
      title="Reset Password"
      subtitle="We'll send instructions to restore access to your account."
      footer={
        <Link href="/login" className="text-burgundy hover:underline">
          Back to sign in
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthSplitLayout>
  );
}
