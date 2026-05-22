import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-sm border border-taupe/20 bg-warmwhite px-4 py-2 font-sans text-sm text-charcoal transition-colors placeholder:text-taupe focus-visible:border-burgundy/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-burgundy/20 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
