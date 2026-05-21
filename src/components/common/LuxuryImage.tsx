"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspectClass?: string;
}

export function LuxuryImage({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  aspectClass = "aspect-[3/4]",
}: LuxuryImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-wine/50 to-charcoal",
        aspectClass,
        className
      )}
    >
      {!loaded && !error && (
        <div
          className="absolute inset-0 z-[1] animate-pulse bg-gradient-to-br from-wine/40 via-charcoal to-burgundy/30"
          aria-hidden
        />
      )}
      {error ? (
        <div className="absolute inset-0 z-[2] flex items-center justify-center p-6 text-center">
          <p className="font-display text-lg text-champagne/50">{alt}</p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
          )}
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent"
        aria-hidden
      />
    </div>
  );
}
