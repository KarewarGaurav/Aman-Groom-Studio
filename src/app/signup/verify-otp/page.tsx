import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { OtpVerifyForm } from "@/components/auth/OtpVerifyForm";

export const metadata: Metadata = {
  title: "Verify OTP",
};

export default function VerifyOtpPage() {
  return (
    <AuthSplitLayout
      title="Enter OTP"
      subtitle="Confirm your identity to activate your account."
    >
      <Suspense fallback={<div className="h-48 animate-pulse rounded-sm bg-cream" />}>
        <OtpVerifyForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
