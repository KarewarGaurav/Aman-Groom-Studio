"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { useAuthStore } from "@/store/auth-store";
import { isValidEmail } from "@/lib/auth-validation";

export function ForgotPasswordForm() {
  const router = useRouter();
  const requestReset = useAuthStore((s) => s.requestPasswordReset);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!isValidEmail(email)) {
      setFieldError("Enter a valid email address");
      return;
    }
    setFieldError("");
    const ok = await requestReset(email);
    if (ok) router.push("/reset-password");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthAlert error={error} loading={loading} />
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2"
          autoComplete="email"
        />
        {fieldError && (
          <p className="mt-1.5 text-xs text-burgundy">{fieldError}</p>
        )}
      </div>
      <Button type="submit" variant="default" className="w-full" disabled={loading}>
        Send Reset Link
      </Button>
    </form>
  );
}
