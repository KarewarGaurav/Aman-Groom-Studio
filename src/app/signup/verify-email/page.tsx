import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function VerifyEmailPage() {
  return (
    <AuthSplitLayout
      title="Verify Your Email"
      subtitle="One more step to secure your couture account."
    >
      <VerifyEmailForm />
    </AuthSplitLayout>
  );
}
