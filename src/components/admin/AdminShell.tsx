"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminNavProgress } from "@/components/admin/AdminNavProgress";
import { AdminNavigationListener } from "@/components/admin/AdminNavigationListener";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";
import { useRequireAdmin } from "@/hooks/useRequireAdmin";
import { useAdminNavStore } from "@/store/admin-nav-store";
import { AdminStatSkeleton } from "@/components/admin/AdminSkeleton";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const ready = useRequireAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isNavigating = useAdminNavStore((s) => s.isNavigating);

  useEffect(() => {
    document.documentElement.classList.add("admin-layout-lock");
    return () => {
      document.documentElement.classList.remove("admin-layout-lock");
    };
  }, []);

  if (!ready) {
    return (
      <div className="admin-panel-root flex h-[100dvh] overflow-hidden">
        <div className="admin-sidebar-panel hidden w-[260px] border-r border-champagne/40 bg-warmwhite lg:block">
          <AdminStatSkeleton />
        </div>
        <div className="admin-main-scroll flex-1 p-8">
          <AdminPageLoader label="Preparing studio panel…" />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-root relative flex h-[100dvh] overflow-hidden">
      <AdminNavigationListener />
      <div
        className="admin-panel-grain grain-overlay pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />

      <div className="admin-panel-content relative z-10 flex h-full w-full overflow-hidden">
        <AdminSidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <AdminNavProgress />
          <AdminTopbar onMenuClick={() => setMobileOpen(true)} />
          <main className="admin-main-scroll relative px-4 py-6 md:px-6 lg:px-8 lg:py-8">
            {isNavigating ? (
              <div
                className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center bg-warmwhite/75 pt-12 backdrop-blur-[1px]"
                aria-hidden
              >
                <div className="w-full max-w-4xl px-4">
                  <AdminPageLoader compact />
                </div>
              </div>
            ) : null}
            <div
              className={
                isNavigating
                  ? "pointer-events-none opacity-40 transition-opacity duration-150"
                  : "transition-opacity duration-150"
              }
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
