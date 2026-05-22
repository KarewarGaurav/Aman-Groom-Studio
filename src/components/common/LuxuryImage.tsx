"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

export function LuxuryImage({
  src,
  alt,
  className,
  aspectClass = "aspect-[3/4]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill,
}: LuxuryImageProps) {
  const [loaded, setLoaded] = useState(false);
  const isRemote = src.startsWith("http");

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden bg-cream", className)}>
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse bg-gradient-to-br from-cream to-champagne/50"
            aria-hidden
          />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized={isRemote}
          className={cn(
            "object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-cream",
        aspectClass,
        className
      )}
    >
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-cream to-champagne/50"
          aria-hidden
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={isRemote}
        className={cn(
          "object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
