"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAdminRouter } from "@/hooks/useAdminRouter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/auth/PasswordField";
import { useAdminAuthStore } from "@/store/admin-auth-store";
import { isValidEmail } from "@/lib/auth-validation";
import { Loader2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminLoginForm() {
  const router = useAdminRouter();
  const searchParams = useSearchParams();
  const login = useAdminAuthStore((s) => s.login);
  const loading = useAdminAuthStore((s) => s.loading);
  const error = useAdminAuthStore((s) => s.error);
  const clearError = useAdminAuthStore((s) => s.clearError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const errors: Record<string, string> = {};
    if (!isValidEmail(email)) errors.email = "Enter a valid studio admin email";
    if (!password) errors.password = "Password is required";
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    const ok = await login(email, password, rememberMe);
    if (ok) {
      const redirect = searchParams.get("redirect") ?? "/admin/dashboard";
      router.push(redirect);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-burgundy/20 bg-burgundy/5 px-4 py-3 font-body text-sm text-burgundy"
        >
          {error}
        </div>
      ) : null}

      <div>
        <Label htmlFor="admin-email" className="text-charcoalsoft">
          Studio admin email
        </Label>
        <Input
          id="admin-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          disabled={loading}
          className={cn(
            "pointer-events-auto mt-2 border-champagne/60 bg-warmwhite focus:border-sandgold",
            fieldErrors.email && "border-burgundy/40"
          )}
          placeholder="Enter studio admin email"
        />
        {fieldErrors.email ? (
          <p className="mt-1 font-body text-xs text-burgundy">{fieldErrors.email}</p>
        ) : null}
      </div>

      <PasswordField
        id="admin-password"
        label="Password"
        value={password}
        onChange={setPassword}
        error={fieldErrors.password}
        autoComplete="current-password"
        placeholder="Enter your password"
        disabled={loading}
      />

      <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-charcoalsoft">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="rounded border-champagne text-burgundy focus:ring-sandgold"
        />
        Remember this device for 7 days
      </label>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-charcoal py-6 font-body text-sm uppercase tracking-[0.2em] hover:bg-burgundy"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            <Shield className="mr-2 h-4 w-4" />
            Enter control panel
          </>
        )}
      </Button>

      <p className="text-center font-body text-xs text-taupe">
        <Link href="/" className="text-bronze hover:text-charcoal hover:underline">
          Return to storefront
        </Link>
        {" · "}
        Authorized personnel only
      </p>
    </form>
  );
}
