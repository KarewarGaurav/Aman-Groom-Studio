"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { useAuthStore } from "@/store/auth-store";
import { useAuthRedirectStore } from "@/store/auth-redirect-store";

export function OtpVerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pendingEmail = useAuthStore((s) => s.pendingEmail);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const resendOtp = useAuthStore((s) => s.resendOtp);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const consumeReturnUrl = useAuthRedirectStore((s) => s.consumeReturnUrl);
  const [code, setCode] = useState("");
  const [resent, setResent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (verifyOtp(code)) {
      const redirect =
        searchParams.get("redirect") ?? consumeReturnUrl();
      router.push(redirect);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthAlert error={error} />
      <p className="text-sm text-charcoalsoft">
        Enter the 6-digit OTP sent to{" "}
        <span className="font-medium text-charcoal">{pendingEmail}</span> (demo:{" "}
        <strong>123456</strong>).
      </p>
      <div>
        <Label htmlFor="otp">One-Time Password</Label>
        <Input
          id="otp"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-2 text-center text-lg tracking-[0.6em]"
          placeholder="000000"
        />
      </div>
      <Button type="submit" variant="default" className="w-full">
        Verify & Continue
      </Button>
      <button
        type="button"
        onClick={() => {
          resendOtp();
          setResent(true);
        }}
        className="w-full text-xs uppercase tracking-widest text-bronze hover:text-burgundy"
      >
        {resent ? "OTP resent" : "Resend OTP"}
      </button>
    </form>
  );
}
