"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/auth/PasswordField";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { AuthAlert } from "@/components/auth/AuthAlert";
import { useAuthStore } from "@/store/auth-store";
import {
  isValidEmail,
  validatePassword,
  validatePhone,
} from "@/lib/auth-validation";

export function SignupForm() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const errors: Record<string, string> = {};
    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!isValidEmail(email)) errors.email = "Enter a valid email";
    if (!validatePhone(phone)) errors.phone = "Enter a valid phone number";
    const pwErr = validatePassword(password);
    if (pwErr) errors.password = pwErr;
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    const ok = await signup({
      email,
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
    });
    if (ok) router.push("/signup/verify-email");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthAlert error={error} loading={loading} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-2"
            autoComplete="given-name"
          />
          {fieldErrors.firstName && (
            <p className="mt-1.5 text-xs text-burgundy">{fieldErrors.firstName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-2"
            autoComplete="family-name"
          />
          {fieldErrors.lastName && (
            <p className="mt-1.5 text-xs text-burgundy">{fieldErrors.lastName}</p>
          )}
        </div>
      </div>

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
        {fieldErrors.email && (
          <p className="mt-1.5 text-xs text-burgundy">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2"
          autoComplete="tel"
        />
        {fieldErrors.phone && (
          <p className="mt-1.5 text-xs text-burgundy">{fieldErrors.phone}</p>
        )}
      </div>

      <PasswordField
        id="password"
        label="Password"
        value={password}
        onChange={setPassword}
        error={fieldErrors.password}
        autoComplete="new-password"
        placeholder="Min. 8 characters"
      />

      <Button type="submit" variant="default" className="w-full" disabled={loading}>
        Create Account
      </Button>

      <SocialAuthButtons />
    </form>
  );
}
