import { products } from "@/data/products";
import { IMAGES } from "@/lib/images";
import type {
  AdminCategory,
  AdminCustomer,
  AdminInventoryRow,
  AdminNotification,
  AdminOrder,
  AdminPayment,
  AdminProduct,
  AdminReview,
  RevenueDataPoint,
  StoreSettings,
} from "@/types/admin";
import type { OrderStatus } from "@/types/auth";

function mapProducts(): AdminProduct[] {
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    collectionId: p.collectionId,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    image: p.images[0] ?? IMAGES.products.maharajaSherwani,
    tags: p.tags ?? [],
    featured: p.featured ?? false,
    inStock: p.inStock,
    stockCount: p.stockCount ?? 0,
    variants:
      p.variants?.sizes?.map((s) => ({
        size: s.value,
        stock: Math.max(0, Math.floor((p.stockCount ?? 4) / (p.variants?.sizes?.length ?? 1))),
      })) ?? [{ size: "One Size", stock: p.stockCount ?? 0 }],
    description: p.description,
  }));
}

export const initialAdminProducts = mapProducts();

export const initialAdminCategories: AdminCategory[] = [
  { id: "cat1", name: "Sherwanis", slug: "sherwanis", productCount: 4, image: IMAGES.categories.sherwanis, featured: true },
  { id: "cat2", name: "Tuxedos", slug: "tuxedos", productCount: 2, image: IMAGES.categories.tuxedos, featured: true },
  { id: "cat3", name: "Indo-Western", slug: "indo-western", productCount: 2, image: IMAGES.categories.indoWestern, featured: true },
  { id: "cat4", name: "Kurta Sets", slug: "kurta-sets", productCount: 2, image: IMAGES.categories.kurtaSets, featured: false },
  { id: "cat5", name: "Reception", slug: "reception", productCount: 2, image: IMAGES.categories.reception, featured: true },
  { id: "cat6", name: "Accessories", slug: "accessories", productCount: 3, image: IMAGES.categories.accessories, featured: false },
];

export const initialAdminCustomers: AdminCustomer[] = [
  { id: "c1", firstName: "Arjun", lastName: "Kapoor", email: "arjun.kapoor@gmail.com", phone: "+91 98102 44120", city: "New Delhi", totalSpent: 485000, orderCount: 3, wishlistCount: 5, status: "active", joinedAt: "2024-11-12", lastOrderAt: "2025-05-18", avatarColor: "bg-burgundy/10" },
  { id: "c2", firstName: "Rohan", lastName: "Malhotra", email: "rohan.m@outlook.com", phone: "+91 98765 33210", city: "Mumbai", totalSpent: 312000, orderCount: 2, wishlistCount: 2, status: "active", joinedAt: "2025-01-08", lastOrderAt: "2025-05-10", avatarColor: "bg-sandgold/20" },
  { id: "c3", firstName: "Vikram", lastName: "Singh Rathore", email: "vikram.rathore@yahoo.com", phone: "+91 99887 12004", city: "Jaipur", totalSpent: 720000, orderCount: 4, wishlistCount: 8, status: "active", joinedAt: "2024-08-22", lastOrderAt: "2025-05-20", avatarColor: "bg-champagne" },
  { id: "c4", firstName: "Aditya", lastName: "Verma", email: "aditya.verma@gmail.com", phone: "+91 91234 55678", city: "Gurugram", totalSpent: 98000, orderCount: 1, wishlistCount: 3, status: "active", joinedAt: "2025-03-15", lastOrderAt: "2025-03-20", avatarColor: "bg-cream" },
  { id: "c5", firstName: "Kabir", lastName: "Khanna", email: "kabir.khanna@icloud.com", phone: "+91 98111 90234", city: "Chandigarh", totalSpent: 0, orderCount: 0, wishlistCount: 6, status: "active", joinedAt: "2025-05-01", lastOrderAt: "—", avatarColor: "bg-ivory" },
  { id: "c6", firstName: "Nikhil", lastName: "Bansal", email: "nikhil.b@spam.test", phone: "+91 90000 11111", city: "Noida", totalSpent: 45000, orderCount: 1, wishlistCount: 0, status: "blocked", joinedAt: "2025-02-10", lastOrderAt: "2025-02-12", avatarColor: "bg-charcoalsoft/10" },
];

const orderStatuses: OrderStatus[] = [
  "placed",
  "confirmed",
  "tailoring",
  "ready",
  "shipped",
  "delivered",
  "cancelled",
];

export const initialAdminOrders: AdminOrder[] = [
  {
    id: "o1",
    orderNumber: "AGS-2025-4821",
    customerId: "c1",
    customerName: "Arjun Kapoor",
    customerEmail: "arjun.kapoor@gmail.com",
    customerPhone: "+91 98102 44120",
    items: [
      { productId: "p1", name: "Maharaja Royal Sherwani", image: IMAGES.products.maharajaSherwani, size: "42", color: "Royal Wine", quantity: 1, price: 185000 },
      { productId: "p5", name: "Crown Jewel Accessory Set", image: IMAGES.products.accessories, size: "One Size", color: "Gold", quantity: 1, price: 28000 },
    ],
    subtotal: 213000,
    discount: 15000,
    total: 198000,
    status: "tailoring",
    paymentMethod: "UPI · Razorpay",
    paymentStatus: "paid",
    shippingCity: "New Delhi",
    trackingId: undefined,
    tailoringNotes: "Final fitting scheduled 28 May — shoulder adjustment requested",
    createdAt: "2025-05-12T10:30:00Z",
    updatedAt: "2025-05-18T14:00:00Z",
  },
  {
    id: "o2",
    orderNumber: "AGS-2025-4798",
    customerId: "c3",
    customerName: "Vikram Singh Rathore",
    customerEmail: "vikram.rathore@yahoo.com",
    customerPhone: "+91 99887 12004",
    items: [
      { productId: "p6", name: "Bespoke Couture Experience", image: IMAGES.bespoke, size: "Made to Measure", color: "Custom", quantity: 1, price: 350000 },
    ],
    subtotal: 350000,
    discount: 0,
    total: 350000,
    status: "confirmed",
    paymentMethod: "Bank Transfer",
    paymentStatus: "paid",
    shippingCity: "Jaipur",
    tailoringNotes: "Concept consultation completed — fabric swatches approved",
    createdAt: "2025-05-19T09:15:00Z",
    updatedAt: "2025-05-19T09:15:00Z",
  },
  {
    id: "o3",
    orderNumber: "AGS-2025-4755",
    customerId: "c2",
    customerName: "Rohan Malhotra",
    customerEmail: "rohan.m@outlook.com",
    customerPhone: "+91 98765 33210",
    items: [
      { productId: "p2", name: "Imperial Black Tuxedo", image: IMAGES.products.imperialTuxedo, size: "40", color: "Classic Black", quantity: 1, price: 125000 },
    ],
    subtotal: 125000,
    discount: 5000,
    total: 120000,
    status: "shipped",
    paymentMethod: "Credit Card · Visa",
    paymentStatus: "paid",
    shippingCity: "Mumbai",
    trackingId: "BLUEDART-88291034",
    createdAt: "2025-05-05T11:00:00Z",
    updatedAt: "2025-05-14T16:30:00Z",
  },
  {
    id: "o4",
    orderNumber: "AGS-2025-4701",
    customerId: "c1",
    customerName: "Arjun Kapoor",
    customerEmail: "arjun.kapoor@gmail.com",
    customerPhone: "+91 98102 44120",
    items: [
      { productId: "p4", name: "Heritage Embroidered Kurta Set", image: IMAGES.products.kurtaSet, size: "40", color: "Soft Ivory", quantity: 1, price: 45000 },
    ],
    subtotal: 45000,
    discount: 0,
    total: 45000,
    status: "delivered",
    paymentMethod: "UPI · Razorpay",
    paymentStatus: "paid",
    shippingCity: "New Delhi",
    trackingId: "BLUEDART-88120001",
    createdAt: "2025-04-20T08:00:00Z",
    updatedAt: "2025-04-28T12:00:00Z",
  },
  {
    id: "o5",
    orderNumber: "AGS-2025-4688",
    customerId: "c4",
    customerName: "Aditya Verma",
    customerEmail: "aditya.verma@gmail.com",
    customerPhone: "+91 91234 55678",
    items: [
      { productId: "p3", name: "Regent Indo-Western Ensemble", image: IMAGES.products.indoWestern, size: "42", color: "Champagne Gold", quantity: 1, price: 98000 },
    ],
    subtotal: 98000,
    discount: 0,
    total: 98000,
    status: "placed",
    paymentMethod: "COD",
    paymentStatus: "pending",
    shippingCity: "Gurugram",
    createdAt: "2025-05-21T15:45:00Z",
    updatedAt: "2025-05-21T15:45:00Z",
  },
  {
    id: "o6",
    orderNumber: "AGS-2025-4610",
    customerId: "c3",
    customerName: "Vikram Singh Rathore",
    customerEmail: "vikram.rathore@yahoo.com",
    customerPhone: "+91 99887 12004",
    items: [
      { productId: "p10", name: "Dynasty Emerald Sherwani", image: IMAGES.products.dynastySherwani, size: "44", color: "Dynasty Emerald", quantity: 1, price: 195000 },
      { productId: "p14", name: "Royal Safa & Stole Set", image: IMAGES.products.safaStoleSet, size: "One Size", color: "Gold", quantity: 1, price: 18500 },
    ],
    subtotal: 213500,
    discount: 0,
    total: 213500,
    status: "ready",
    paymentMethod: "UPI · Razorpay",
    paymentStatus: "paid",
    shippingCity: "Jaipur",
    tailoringNotes: "Ready for dispatch — premium packaging requested",
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-17T09:00:00Z",
  },
  {
    id: "o7",
    orderNumber: "AGS-2025-4522",
    customerId: "c6",
    customerName: "Nikhil Bansal",
    customerEmail: "nikhil.b@spam.test",
    customerPhone: "+91 90000 11111",
    items: [
      { productId: "p4", name: "Heritage Embroidered Kurta Set", image: IMAGES.products.kurtaSet, size: "38", color: "Soft Ivory", quantity: 1, price: 45000 },
    ],
    subtotal: 45000,
    discount: 0,
    total: 45000,
    status: "cancelled",
    paymentMethod: "UPI · Razorpay",
    paymentStatus: "refunded",
    shippingCity: "Noida",
    createdAt: "2025-02-10T12:00:00Z",
    updatedAt: "2025-02-11T10:00:00Z",
  },
];

export const initialAdminPayments: AdminPayment[] = initialAdminOrders
  .filter((o) => o.paymentStatus !== "pending")
  .map((o, i) => ({
    id: `pay_${i + 1}`,
    orderId: o.id,
    orderNumber: o.orderNumber,
    customerName: o.customerName,
    amount: o.total,
    method: o.paymentMethod,
    status:
      o.paymentStatus === "paid"
        ? "completed"
        : o.paymentStatus === "refunded"
          ? "refunded"
          : "pending",
    createdAt: o.createdAt,
  }));

export const initialAdminReviews: AdminReview[] = [
  { id: "r1", customerName: "Arjun Kapoor", productName: "Maharaja Royal Sherwani", productImage: IMAGES.products.maharajaSherwani, rating: 5, comment: "The embroidery quality exceeded every expectation. The studio team handled fittings with couture-level care.", status: "approved", featured: true, createdAt: "2025-05-02" },
  { id: "r2", customerName: "Vikram Singh Rathore", productName: "Dynasty Emerald Sherwani", productImage: IMAGES.products.dynastySherwani, rating: 5, comment: "Stunning for our palace wedding in Jaipur. Received countless compliments during baraat.", status: "approved", featured: true, createdAt: "2025-04-28" },
  { id: "r3", customerName: "Rohan Malhotra", productName: "Imperial Black Tuxedo", productImage: IMAGES.products.imperialTuxedo, rating: 4, comment: "Perfect reception look. Delivery was on time; would appreciate more size options.", status: "approved", featured: false, createdAt: "2025-05-15" },
  { id: "r4", customerName: "Kabir Khanna", productName: "Champagne Sangeet Bandhgala", productImage: IMAGES.products.champagneBandhgala, rating: 5, comment: "Elegant and contemporary — exactly the sangeet vibe I wanted.", status: "pending", featured: false, createdAt: "2025-05-20" },
  { id: "r5", customerName: "Aditya Verma", productName: "Regent Indo-Western Ensemble", productImage: IMAGES.products.indoWestern, rating: 3, comment: "Beautiful design but sizing ran slightly large.", status: "pending", featured: false, createdAt: "2025-05-21" },
];

export const initialAdminNotifications: AdminNotification[] = [
  { id: "n1", title: "New order placed", message: "AGS-2025-4688 — Aditya Verma · ₹98,000", type: "order", read: false, createdAt: "2025-05-21T15:45:00Z" },
  { id: "n2", title: "Low stock alert", message: "Dynasty Emerald Sherwani — only 2 units left", type: "inventory", read: false, createdAt: "2025-05-20T09:00:00Z" },
  { id: "n3", title: "Review pending approval", message: "Kabir Khanna rated Champagne Sangeet Bandhgala", type: "review", read: true, createdAt: "2025-05-20T11:00:00Z" },
  { id: "n4", title: "Payment received", message: "AGS-2025-4798 — ₹3,50,000 bank transfer confirmed", type: "payment", read: true, createdAt: "2025-05-19T09:20:00Z" },
];

export function buildInventoryRows(productList: AdminProduct[]): AdminInventoryRow[] {
  return productList.map((p) => ({
    productId: p.id,
    productName: p.name,
    image: p.image,
    category: p.category,
    sku: `AGS-${p.slug.slice(0, 6).toUpperCase()}`,
    totalStock: p.stockCount,
    lowStockThreshold: 3,
    sizes: p.variants,
    available: p.inStock,
  }));
}

export const revenueChartData: RevenueDataPoint[] = [
  { month: "Dec", revenue: 820000, orders: 12 },
  { month: "Jan", revenue: 1240000, orders: 18 },
  { month: "Feb", revenue: 980000, orders: 14 },
  { month: "Mar", revenue: 1560000, orders: 22 },
  { month: "Apr", revenue: 1890000, orders: 26 },
  { month: "May", revenue: 2145000, orders: 31 },
];

export const topSellingProducts = [
  { name: "Maharaja Royal Sherwani", sales: 28, revenue: 5180000, image: IMAGES.products.maharajaSherwani },
  { name: "Dynasty Emerald Sherwani", sales: 19, revenue: 3705000, image: IMAGES.products.dynastySherwani },
  { name: "Imperial Black Tuxedo", sales: 24, revenue: 3000000, image: IMAGES.products.imperialTuxedo },
  { name: "Bespoke Couture Experience", sales: 8, revenue: 2800000, image: IMAGES.bespoke },
  { name: "Nizam Ivory Achkan", sales: 15, revenue: 2475000, image: IMAGES.products.nizamAchkan },
];

export const defaultStoreSettings: StoreSettings = {
  storeName: "Aman Groom Studio",
  tagline: "Luxury Groom Couture",
  email: "studio@amangroom.com",
  phone: "+91 11 4105 8820",
  address: "E-19, BM, Lajpat Nagar-II, Central Market, New Delhi",
  shippingFee: 0,
  freeShippingAbove: 150000,
  taxRate: 12,
  heroBannerTitle: "Royal Wedding Season 2025",
  promoBannerEnabled: true,
  instagram: "@amangroomstudio",
  whatsapp: "+91 98100 00000",
  orderNotifications: true,
  lowStockAlerts: true,
};

export { orderStatuses };
