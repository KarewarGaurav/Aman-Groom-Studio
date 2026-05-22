"use client";

import Image from "next/image";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminLoginVisual } from "@/components/admin/AdminLoginVisual";

export function AdminLoginPageClient() {
  return (
    <div className="auth-page-shell relative overflow-hidden premium-gradient">
      <div
        className="grain-overlay pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col lg:flex-row">
        <AdminLoginVisual />

        <div className="relative z-20 flex flex-1 flex-col justify-center px-4 py-8 safe-x sm:px-6 sm:py-10 md:px-12 lg:px-16 lg:py-12">
          <div className="relative z-20 mx-auto w-full max-w-md pointer-events-auto">
            <div className="mb-6 text-center sm:mb-8 lg:mb-10 lg:text-left">
              <Image
                src="/logo.png"
                alt="Aman Groom Studio"
                width={56}
                height={56}
                className="mx-auto mb-4 sm:mb-6 lg:mx-0"
              />
              <p className="editorial-label">Studio Control Panel</p>
              <h1 className="mt-2 font-display text-3xl font-light tracking-tight text-charcoal sm:text-4xl">
                Admin Sign In
              </h1>
              <p className="mt-3 font-body text-sm text-charcoalsoft">
                Authorized atelier staff only. Your session is secured and
                encrypted.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="h-64 animate-pulse rounded-xl bg-champagne/30" />
              }
            >
              <AdminLoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
