import dynamic from "next/dynamic";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";

const AdminDashboardView = dynamic(
  () =>
    import("@/components/admin/views/AdminDashboardView").then(
      (m) => m.AdminDashboardView
    ),
  { loading: () => <AdminPageLoader label="Loading dashboard…" /> }
);

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
