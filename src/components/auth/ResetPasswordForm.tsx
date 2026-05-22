"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/auth/PasswordField";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { useAuthStore } from "@/store/auth-store";
import { validatePassword } from "@/lib/auth-validation";

export function ResetPasswordForm() {
  const router = useRouter();
  const resetPassword = useAuthStore((s) => s.resetPassword);
  const resetEmail = useAuthStore((s) => s.resetEmail);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!resetEmail) {
    return (
      <p className="text-sm text-charcoalsoft">
        Reset session expired.{" "}
        <Link href="/forgot-password" className="text-burgundy underline">
          Request a new link
        </Link>
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const errors: Record<string, string> = {};
    const pwErr = validatePassword(password);
    if (pwErr) errors.password = pwErr;
    if (password !== confirm) errors.confirm = "Passwords do not match";
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    const ok = await resetPassword(password);
    if (ok) router.push("/login?reset=success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthAlert error={error} loading={loading} />
      <PasswordField
        id="password"
        label="New Password"
        value={password}
        onChange={setPassword}
        error={fieldErrors.password}
        autoComplete="new-password"
      />
      <PasswordField
        id="confirm"
        label="Confirm Password"
        value={confirm}
        onChange={setConfirm}
        error={fieldErrors.confirm}
        autoComplete="new-password"
      />
      <Button type="submit" variant="default" className="w-full" disabled={loading}>
        Update Password
      </Button>
    </form>
  );
}
