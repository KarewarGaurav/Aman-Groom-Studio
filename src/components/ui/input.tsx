import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-none border border-white/15 bg-charcoal/80 px-4 py-2 font-body text-sm text-ivory transition-colors placeholder:text-champagne/40 focus-visible:border-gold/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
