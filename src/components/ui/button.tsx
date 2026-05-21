import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-body text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        default:
          "border border-gold/25 bg-gradient-to-r from-burgundy via-wine to-burgundy text-ivory shadow-[inset_0_1px_0_rgba(212,175,106,0.2)] hover:border-gold/50 hover:shadow-[0_8px_32px_rgba(92,21,40,0.45)] active:scale-[0.98]",
        gold:
          "border border-champagne/30 bg-gradient-to-r from-champagne via-gold to-bronze text-charcoal shadow-[0_4px_24px_rgba(212,175,106,0.25)] hover:brightness-110 hover:shadow-[0_8px_32px_rgba(212,175,106,0.35)] active:scale-[0.98]",
        outline:
          "border border-gold/40 bg-charcoal/40 text-champagne backdrop-blur-sm hover:border-gold hover:bg-gold/10 hover:text-ivory active:scale-[0.98]",
        ghost:
          "border border-transparent text-champagne hover:border-white/10 hover:bg-white/5 hover:text-ivory",
        luxury:
          "border border-gold/30 bg-transparent text-gold before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-gold/20 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full hover:bg-gold/5 hover:text-ivory",
        link: "border-0 p-0 text-gold normal-case tracking-normal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 min-w-[10rem] px-8",
        sm: "h-10 min-w-[8rem] px-6 text-[10px]",
        lg: "h-14 min-w-[12rem] px-10 text-sm",
        icon: "h-11 w-11 min-w-0 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
