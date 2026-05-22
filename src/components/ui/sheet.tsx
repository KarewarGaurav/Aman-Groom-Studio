"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  side?: "left" | "right";
  /** Accessible panel title (required by Radix Dialog primitive). */
  title?: string;
  hideTitle?: boolean;
};

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, title, hideTitle, "aria-describedby": ariaDescribedBy, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      aria-describedby={ariaDescribedBy ?? undefined}
      className={cn(
        "fixed z-50 flex h-full flex-col shadow-luxury transition ease-in-out",
        side === "right" &&
          "inset-y-0 right-0 w-full max-w-md border-l border-taupe/15",
        side === "left" &&
          "inset-y-0 left-0 w-full max-w-md border-r border-taupe/15",
        className
      )}
      {...props}
    >
      <DialogPrimitive.Title
        className={cn(
          "shrink-0 font-display text-2xl font-light text-charcoal px-6 pt-6 pr-12",
          hideTitle && "sr-only",
          !title && "sr-only"
        )}
      >
        {title ?? "Panel"}
      </DialogPrimitive.Title>
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 text-charcoalsoft hover:text-charcoal">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display text-2xl font-light text-charcoal", className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle };
