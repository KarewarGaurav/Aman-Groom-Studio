import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <AuthSplitLayout
      title="Welcome Back"
      subtitle="Access your orders, wishlist, and bespoke preferences."
      footer={
        <>
          New to Aman Groom?{" "}
          <Link href="/signup" className="text-burgundy hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <Suspense fallback={<div className="h-64 animate-pulse rounded-sm bg-cream" />}>
        <LoginForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
