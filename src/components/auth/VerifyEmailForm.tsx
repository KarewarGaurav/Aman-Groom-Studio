"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { useAuthStore } from "@/store/auth-store";

export function VerifyEmailForm() {
  const router = useRouter();
  const pendingEmail = useAuthStore((s) => s.pendingEmail);
  const verifyEmail = useAuthStore((s) => s.verifyEmail);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (verifyEmail(code)) router.push("/signup/verify-otp");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthAlert error={error} />
      <p className="text-sm text-charcoalsoft">
        We sent a verification link to{" "}
        <span className="font-medium text-charcoal">{pendingEmail}</span>.
        Enter the code below (demo: <strong>123456</strong>).
      </p>
      <div>
        <Label htmlFor="code">Verification Code</Label>
        <Input
          id="code"
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-2 tracking-[0.5em]"
          placeholder="••••••"
        />
      </div>
      <Button type="submit" variant="default" className="w-full">
        Verify Email
      </Button>
    </form>
  );
}
