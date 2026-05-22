"use client";

import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { LuxuryImage } from "@/components/common/LuxuryImage";
import { IMAGES } from "@/lib/images";
import { useAuthPageEnter } from "@/hooks/useAuthGsap";
import { cn } from "@/lib/utils";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthSplitLayout({
  children,
  title,
  subtitle,
  footer,
  className,
}: AuthSplitLayoutProps) {
  const ref = useAuthPageEnter();

  return (
    <div
      ref={ref}
      className="auth-page-shell bg-ivory pt-20 sm:pt-24 md:min-h-screen"
    >
      <div className="relative mx-auto h-44 w-full overflow-hidden sm:h-52 md:h-56 lg:hidden">
        <LuxuryImage
          src={IMAGES.hero}
          alt="Luxury groom couture"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 safe-x">
          <p className="editorial-label text-champagne">{BRAND.tagline}</p>
          <p className="mt-1 font-display text-xl text-warmwhite sm:text-2xl">
            Your couture journey begins here
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-2 lg:min-h-[calc(100vh-6rem)]">
        <div
          data-auth-visual
          className="relative hidden min-h-full overflow-hidden lg:block"
        >
          <LuxuryImage
            src={IMAGES.hero}
            alt="Luxury groom couture"
            fill
            className="absolute inset-0 h-full w-full object-cover"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-ivory/30" />
          <div className="absolute bottom-12 left-10 right-10 text-warmwhite">
            <p className="editorial-label text-champagne">{BRAND.tagline}</p>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight">
              Your couture journey begins here
            </h2>
            <p className="mt-4 max-w-md text-sm text-champagne/90">
              {BRAND.location}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col justify-center px-4 py-8 safe-x sm:px-6 sm:py-10 md:px-12 lg:px-16 lg:py-12",
            className
          )}
        >
          <Link
            href="/"
            data-auth-enter
            className="mb-6 inline-block font-display text-base text-charcoal hover:text-burgundy sm:mb-8 sm:text-lg lg:mb-10"
          >
            {BRAND.name}
          </Link>
          <div data-auth-enter>
            <p className="editorial-label">Members</p>
            <h1 className="mt-2 font-displayAlt text-3xl text-charcoal sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 max-w-md text-sm text-charcoalsoft">
                {subtitle}
              </p>
            )}
          </div>
          <div data-auth-enter className="mt-6 sm:mt-8 lg:mt-10">
            {children}
          </div>
          {footer && (
            <div data-auth-enter className="mt-8 text-center text-sm text-charcoalsoft">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
