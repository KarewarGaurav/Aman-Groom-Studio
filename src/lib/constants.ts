export const BRAND = {
  name: "Aman Groom Studio",
  tagline: "Luxury Groom Couture",
  location: "E-19, BM, Lajpat Nagar-II, Central Market, New Delhi",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "concierge@amangroom.com",
  instagram: "https://instagram.com/amangroomstudio",
} as const;

export const CATEGORIES = [
  { id: "sherwanis", label: "Sherwanis", href: "/shop?category=sherwanis" },
  { id: "tuxedos", label: "Tuxedos", href: "/shop?category=tuxedos" },
  { id: "indo-western", label: "Indo-Western", href: "/shop?category=indo-western" },
  { id: "kurta-sets", label: "Kurta Sets", href: "/shop?category=kurta-sets" },
  { id: "accessories", label: "Wedding Accessories", href: "/shop?category=accessories" },
  { id: "custom", label: "Custom Tailoring", href: "/shop?category=custom" },
  { id: "reception", label: "Reception Wear", href: "/shop?category=reception" },
] as const;

export const BOOKING_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
  "07:00 PM",
] as const;
