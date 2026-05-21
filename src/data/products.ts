import { IMAGES } from "@/lib/images";
import type { Product } from "@/types/cms";

export const products: Product[] = [
  {
    id: "p1",
    slug: "maharaja-royal-sherwani",
    name: "Maharaja Royal Sherwani",
    shortDescription: "Hand-embroidered silk with antique gold zari",
    description:
      "An opulent wedding sherwani crafted in deep burgundy raw silk, featuring hand-embroidered motifs inspired by Mughal artistry. Designed for the groom who commands the room.",
    price: 185000,
    compareAtPrice: 210000,
    category: "sherwanis",
    collectionId: "royal-wedding",
    images: [
      IMAGES.products.maharajaSherwani,
      IMAGES.products.jodhpuri,
      IMAGES.hero,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
        { id: "s4", label: "Size", value: "44" },
      ],
      colors: [
        { id: "c1", label: "Color", value: "Royal Wine" },
        { id: "c2", label: "Color", value: "Midnight Burgundy" },
      ],
    },
    tags: ["bestseller", "wedding"],
    inStock: true,
    stockCount: 3,
    featured: true,
    isNew: true,
    fabric: "Raw Silk",
    craftsmanship: "120+ hours hand embroidery",
  },
  {
    id: "p2",
    slug: "imperial-black-tuxedo",
    name: "Imperial Black Tuxedo",
    shortDescription: "Italian wool, satin peak lapel, bespoke fit",
    description:
      "A cinematic black-tie tuxedo tailored from premium Italian wool with satin peak lapels and mother-of-pearl buttons. Perfect for reception and western ceremonies.",
    price: 125000,
    category: "tuxedos",
    collectionId: "black-tie",
    images: [
      IMAGES.products.imperialTuxedo,
      IMAGES.products.receptionBlazer,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
      ],
      colors: [{ id: "c1", label: "Color", value: "Classic Black" }],
    },
    tags: ["reception", "black-tie"],
    inStock: true,
    stockCount: 5,
    featured: true,
    fabric: "Italian Wool",
  },
  {
    id: "p3",
    slug: "regent-indo-western",
    name: "Regent Indo-Western Ensemble",
    shortDescription: "Structured bandhgala with contemporary silhouette",
    description:
      "Bridging heritage and modernity — a structured bandhgala jacket with tailored trousers, finished in champagne gold accents.",
    price: 98000,
    category: "indo-western",
    images: [
      IMAGES.products.indoWestern,
      IMAGES.products.receptionBlazer,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
      ],
      colors: [
        { id: "c1", label: "Color", value: "Champagne Gold" },
        { id: "c2", label: "Color", value: "Charcoal" },
      ],
    },
    tags: ["sangeet", "cocktail"],
    inStock: true,
    featured: true,
  },
  {
    id: "p4",
    slug: "heritage-kurta-set",
    name: "Heritage Embroidered Kurta Set",
    shortDescription: "Mehendi-ready elegance in ivory and gold",
    description:
      "An exquisite kurta set for mehendi and haldi celebrations, featuring delicate threadwork and flowing silhouette.",
    price: 45000,
    category: "kurta-sets",
    images: [IMAGES.products.kurtaSet, IMAGES.products.indoWestern],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
      ],
      colors: [{ id: "c1", label: "Color", value: "Soft Ivory" }],
    },
    tags: ["mehendi", "haldi"],
    inStock: true,
    stockCount: 8,
  },
  {
    id: "p5",
    slug: "crown-jewel-accessory-set",
    name: "Crown Jewel Accessory Set",
    shortDescription: "Brooch, pocket square, and ceremonial stole",
    description:
      "Complete your wedding look with our curated accessory set — handcrafted brooch, silk pocket square, and ceremonial stole.",
    price: 28000,
    category: "accessories",
    images: [IMAGES.products.accessories, IMAGES.products.maharajaSherwani],
    variants: {
      sizes: [{ id: "s1", label: "Size", value: "One Size" }],
      colors: [
        { id: "c1", label: "Color", value: "Gold" },
        { id: "c2", label: "Color", value: "Burgundy" },
      ],
    },
    tags: ["accessories"],
    inStock: true,
    stockCount: 12,
  },
  {
    id: "p6",
    slug: "bespoke-couture-experience",
    name: "Bespoke Couture Experience",
    shortDescription: "Fully custom-designed wedding ensemble",
    description:
      "Our signature bespoke service — from concept sketches to final fitting. Includes three consultations, fabric sourcing, and lifetime alterations.",
    price: 350000,
    category: "custom",
    images: [IMAGES.bespoke, IMAGES.products.bespoke],
    variants: {
      sizes: [{ id: "s1", label: "Size", value: "Made to Measure" }],
      colors: [{ id: "c1", label: "Color", value: "Custom" }],
    },
    tags: ["bespoke", "exclusive"],
    inStock: true,
    featured: true,
  },
  {
    id: "p7",
    slug: "velvet-reception-blazer",
    name: "Velvet Reception Blazer",
    shortDescription: "Midnight velvet with silk lining",
    description:
      "A statement reception blazer in midnight velvet with contrast silk lining — designed for the groom's after-party moment.",
    price: 72000,
    category: "reception",
    images: [
      IMAGES.products.receptionBlazer,
      IMAGES.products.imperialTuxedo,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
      ],
      colors: [
        { id: "c1", label: "Color", value: "Midnight" },
        { id: "c2", label: "Color", value: "Wine" },
      ],
    },
    tags: ["reception"],
    inStock: true,
    stockCount: 4,
  },
  {
    id: "p8",
    slug: "jodhpuri-heritage-set",
    name: "Jodhpuri Heritage Set",
    shortDescription: "Royal Jodhpuri with antique buttons",
    description:
      "A regal Jodhpuri suit with structured shoulders and heritage-inspired detailing — ideal for baraat and royal-themed weddings.",
    price: 115000,
    category: "sherwanis",
    images: [
      IMAGES.products.jodhpuri,
      IMAGES.products.maharajaSherwani,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "40" },
        { id: "s2", label: "Size", value: "42" },
        { id: "s3", label: "Size", value: "44" },
      ],
      colors: [{ id: "c1", label: "Color", value: "Royal Wine" }],
    },
    tags: ["baraat", "royal"],
    inStock: false,
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category) return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRecommendations(
  productId: string,
  limit = 4
): Product[] {
  const current = products.find((p) => p.id === productId);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== productId && p.category === current.category)
    .slice(0, limit);
}
