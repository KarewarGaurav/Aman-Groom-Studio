"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/auth/PasswordField";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { useAuthStore } from "@/store/auth-store";
import { useAuthRedirectStore } from "@/store/auth-redirect-store";
import { isValidEmail } from "@/lib/auth-validation";
import { DEMO_CREDENTIALS } from "@/data/demo-auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const consumeReturnUrl = useAuthRedirectStore((s) => s.consumeReturnUrl);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const errors: Record<string, string> = {};
    if (!isValidEmail(email)) errors.email = "Enter a valid email address";
    if (!password) errors.password = "Password is required";
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    const ok = await login(email, password, rememberMe);
    if (ok) {
      const redirect =
        searchParams.get("redirect") ?? consumeReturnUrl();
      router.push(redirect);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AuthAlert error={error} loading={loading} />

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2"
          placeholder="you@example.com"
        />
        {fieldErrors.email && (
          <p className="mt-1.5 text-xs text-burgundy">{fieldErrors.email}</p>
        )}
      </div>

      <PasswordField
        id="password"
        label="Password"
        value={password}
        onChange={setPassword}
        error={fieldErrors.password}
        autoComplete="current-password"
      />

      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-charcoalsoft">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded-sm border-taupe/30 accent-burgundy"
          />
          <span className="text-xs uppercase tracking-wider">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-xs uppercase tracking-wider text-burgundy hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" variant="default" className="w-full" disabled={loading}>
        Sign In
      </Button>

      <SocialAuthButtons />

      <p className="rounded-sm border border-champagne/40 bg-cream/50 px-4 py-3 text-xs text-charcoalsoft">
        Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
      </p>
    </form>
  );
}
