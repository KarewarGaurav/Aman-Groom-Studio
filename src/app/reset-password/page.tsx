import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "New Password",
};

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout
      title="Choose New Password"
      subtitle="Create a strong password for your account."
    >
      <ResetPasswordForm />
    </AuthSplitLayout>
  );
}
