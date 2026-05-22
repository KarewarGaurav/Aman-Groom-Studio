import type { Metadata } from "next";
import { AdminLoginPageClient } from "@/components/admin/AdminLoginPageClient";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLoginPageClient />;
}
