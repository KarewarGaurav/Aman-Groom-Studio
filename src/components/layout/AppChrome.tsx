"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CartDrawer } from "@/components/cart/CartDrawer";

function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin_login" || pathname.startsWith("/admin");
}

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const admin = isAdminRoute(pathname);

  if (admin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full max-w-[100vw] overflow-x-clip">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
    </>
  );
}
