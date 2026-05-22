import { IMAGES } from "@/lib/images";
import type { Address, Order, StoredUserRecord } from "@/types/auth";
import { buildOrderTimeline } from "@/lib/orders";

const defaultAddress: Address = {
  id: "addr-demo-1",
  label: "Home",
  line1: "E-19, BM, Lajpat Nagar-II, Central Market",
  line2: "New Delhi",
  city: "New Delhi",
  state: "Delhi",
  pin: "110024",
  isDefault: true,
};

const demoOrders: Order[] = [
  {
    id: "ord-demo-1",
    orderNumber: "AGS-2025-1842",
    userId: "user-demo",
    items: [
      {
        productId: "p1",
        slug: "maharaja-royal-sherwani",
        name: "Maharaja Royal Sherwani",
        price: 185000,
        image: IMAGES.products.maharajaSherwani,
        size: "40",
        color: "Maroon",
        quantity: 1,
      },
    ],
    subtotal: 185000,
    total: 166500,
    discount: 0.1,
    status: "shipped",
    timeline: buildOrderTimeline("shipped", "2025-04-12T10:00:00Z"),
    paymentLabel: "Visa •••• 4242",
    shippingAddress: defaultAddress,
    estimatedDelivery: "2025-05-28",
    createdAt: "2025-04-12T10:00:00Z",
    coupon: "MAHARAJA10",
  },
  {
    id: "ord-demo-2",
    orderNumber: "AGS-2025-2103",
    userId: "user-demo",
    items: [
      {
        productId: "p4",
        slug: "imperial-midnight-tuxedo",
        name: "Imperial Midnight Tuxedo",
        price: 142000,
        image: IMAGES.products.imperialTuxedo,
        size: "42",
        color: "Black",
        quantity: 1,
      },
    ],
    subtotal: 142000,
    total: 142000,
    discount: 0,
    status: "tailoring",
    timeline: buildOrderTimeline("tailoring", "2025-05-01T14:30:00Z"),
    paymentLabel: "UPI — amangroom@upi",
    shippingAddress: defaultAddress,
    estimatedDelivery: "2025-06-15",
    createdAt: "2025-05-01T14:30:00Z",
    coupon: null,
  },
];

export const DEMO_CREDENTIALS = {
  email: "guest@amangroom.com",
  password: "Couture123",
} as const;

export function createDemoUserRecord(): StoredUserRecord {
  return {
    user: {
      id: "user-demo",
      email: DEMO_CREDENTIALS.email,
      firstName: "Arjun",
      lastName: "Malhotra",
      phone: "+91 98765 43210",
      emailVerified: true,
      createdAt: "2024-11-01T00:00:00Z",
    },
    password: DEMO_CREDENTIALS.password,
    addresses: [defaultAddress],
    paymentMethods: [
      {
        id: "pm-1",
        brand: "Visa",
        last4: "4242",
        expiry: "09/27",
        isDefault: true,
      },
      {
        id: "pm-2",
        brand: "Mastercard",
        last4: "8891",
        expiry: "03/26",
        isDefault: false,
      },
    ],
    measurements: {
      chest: "42",
      waist: "34",
      shoulder: "18",
      sleeve: "25",
      notes: "Prefer relaxed fit for reception",
    },
    orders: demoOrders,
  };
}
