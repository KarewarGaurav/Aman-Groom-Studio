import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-sm font-body text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        default: "btn-luxury-primary",
        gold: "btn-luxury-gold",
        outline: "btn-luxury-outline",
        ghost: "btn-luxury-ghost",
        luxury: "btn-luxury-muted",
        link: "rounded-none border-0 bg-transparent p-0 font-normal normal-case tracking-normal text-burgundy shadow-none hover:underline",
      },
      size: {
        default: "h-12 min-w-0 px-6 sm:min-w-[10.5rem] sm:px-8",
        sm: "h-10 min-w-0 px-5 sm:min-w-[9rem] sm:px-6 text-[10px]",
        card: "h-9 min-h-9 min-w-0 px-2.5 text-[10px] tracking-[0.14em] leading-none",
        lg: "h-14 min-w-0 px-8 sm:min-w-[11.5rem] sm:px-10 text-sm tracking-[0.22em]",
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
