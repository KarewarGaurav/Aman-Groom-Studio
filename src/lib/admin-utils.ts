import type { AdminDashboardStats } from "@/types/admin";
import type { AdminOrder, AdminProduct } from "@/types/admin";

export function computeDashboardStats(
  orders: AdminOrder[],
  customers: { status: string }[],
  products: AdminProduct[]
): AdminDashboardStats {
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  return {
    totalOrders: orders.length,
    totalRevenue,
    pendingOrders: orders.filter((o) =>
      ["placed", "confirmed", "tailoring", "ready"].includes(o.status)
    ).length,
    deliveredOrders: orders.filter((o) => o.status === "delivered").length,
    activeCustomers: customers.filter((c) => c.status === "active").length,
    lowStockAlerts: products.filter((p) => p.stockCount <= 3 && p.inStock).length,
  };
}

const ADMIN_ROUTE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/dashboard": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/products": "Products",
  "/admin/customers": "Customers",
  "/admin/categories": "Categories",
  "/admin/inventory": "Inventory",
  "/admin/payments": "Payments",
  "/admin/reviews": "Reviews",
  "/admin/analytics": "Analytics",
  "/admin/settings": "Settings",
};

export function getAdminPageTitle(pathname: string): string {
  const match = Object.keys(ADMIN_ROUTE_TITLES)
    .filter((route) => pathname === route || pathname.startsWith(`${route}/`))
    .sort((a, b) => b.length - a.length)[0];
  return match ? ADMIN_ROUTE_TITLES[match] : "Studio Admin";
}

export function formatAdminDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
