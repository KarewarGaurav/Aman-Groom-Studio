"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CATEGORIES, BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[55] bg-charcoal lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-5">
            <p className="font-display text-xl">{BRAND.name}</p>
            <button type="button" onClick={onClose} aria-label="Close menu">
              <X className="h-6 w-6 text-champagne" />
            </button>
          </div>
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28 }}
            className="flex flex-col gap-1 px-4 py-8"
          >
            <Link
              href="/shop"
              onClick={onClose}
              className="border-b border-white/10 py-4 font-display text-2xl"
            >
              Shop All
            </Link>
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={cat.href}
                  onClick={onClose}
                  className="block py-3 font-body text-lg text-champagne"
                >
                  {cat.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <Button asChild variant="gold">
                <Link href="/booking" onClick={onClose}>
                  Book Styling Session
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/wishlist" onClick={onClose}>
                  Wishlist
                </Link>
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
