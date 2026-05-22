import dynamic from "next/dynamic";
import { AdminPageLoader } from "@/components/admin/AdminPageLoader";

const AdminAnalyticsView = dynamic(
  () =>
    import("@/components/admin/views/AdminAnalyticsView").then(
      (m) => m.AdminAnalyticsView
    ),
  { loading: () => <AdminPageLoader label="Loading analytics…" /> }
);

export default function AdminAnalyticsPage() {
  return <AdminAnalyticsView />;
}
