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
  {
    id: "p9",
    slug: "nizam-ivory-achkan",
    name: "Nizam Ivory Achkan",
    shortDescription: "Ceremonial ivory silk with restrained gold zari",
    description:
      "A refined achkan sherwani in pearl ivory raw silk — understated gold threadwork at collar and cuffs for grooms who prefer timeless elegance over heavy ornamentation. Ideal for day weddings and palace venues.",
    price: 165000,
    compareAtPrice: 185000,
    category: "sherwanis",
    collectionId: "royal-wedding",
    images: [
      IMAGES.products.nizamAchkan,
      IMAGES.products.maharajaSherwani,
      IMAGES.products.dynastySherwani,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
        { id: "s4", label: "Size", value: "44" },
      ],
      colors: [
        { id: "c1", label: "Color", value: "Pearl Ivory" },
        { id: "c2", label: "Color", value: "Soft Champagne" },
      ],
    },
    tags: ["wedding", "ceremony"],
    inStock: true,
    stockCount: 4,
    featured: true,
    isNew: true,
    fabric: "Raw Silk",
    craftsmanship: "Hand-finished collar and cuff zari",
  },
  {
    id: "p10",
    slug: "dynasty-emerald-sherwani",
    name: "Dynasty Emerald Sherwani",
    shortDescription: "Emerald brocade with antique gold buta motifs",
    description:
      "A regal emerald brocade sherwani featuring heritage-inspired gold buta embroidery — crafted for baraat entries and royal-themed celebrations where the groom leads in colour.",
    price: 195000,
    category: "sherwanis",
    collectionId: "royal-wedding",
    images: [
      IMAGES.products.dynastySherwani,
      IMAGES.products.jodhpuri,
      IMAGES.products.maharajaSherwani,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "40" },
        { id: "s2", label: "Size", value: "42" },
        { id: "s3", label: "Size", value: "44" },
      ],
      colors: [{ id: "c1", label: "Color", value: "Dynasty Emerald" }],
    },
    tags: ["baraat", "royal", "bestseller"],
    inStock: true,
    stockCount: 2,
    featured: true,
    fabric: "Silk Brocade",
    craftsmanship: "140+ hours hand embroidery",
  },
  {
    id: "p11",
    slug: "champagne-sangeet-bandhgala",
    name: "Champagne Sangeet Bandhgala",
    shortDescription: "Structured bandhgala for cocktail and sangeet nights",
    description:
      "A contemporary champagne gold bandhgala with precision tailoring and subtle metallic thread accents — the definitive Indo-Western look for sangeet and cocktail celebrations.",
    price: 105000,
    category: "indo-western",
    collectionId: "fusion-couture",
    images: [
      IMAGES.products.champagneBandhgala,
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
        { id: "c2", label: "Color", value: "Antique Bronze" },
      ],
    },
    tags: ["sangeet", "cocktail"],
    inStock: true,
    stockCount: 6,
    featured: true,
    isNew: true,
    fabric: "Wool-Silk Blend",
  },
  {
    id: "p12",
    slug: "pearl-haldi-kurta-set",
    name: "Pearl Haldi Kurta Set",
    shortDescription: "Breathable silk for haldi and mehendi mornings",
    description:
      "A lightweight pearl white kurta set with delicate gold threadwork — designed for comfort during haldi and mehendi rituals while maintaining couture-level finishing.",
    price: 52000,
    category: "kurta-sets",
    collectionId: "fusion-couture",
    images: [
      IMAGES.products.haldiKurta,
      IMAGES.products.kurtaSet,
      IMAGES.products.indoWestern,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
        { id: "s4", label: "Size", value: "44" },
      ],
      colors: [
        { id: "c1", label: "Color", value: "Pearl White" },
        { id: "c2", label: "Color", value: "Sunrise Ivory" },
      ],
    },
    tags: ["haldi", "mehendi"],
    inStock: true,
    stockCount: 10,
    isNew: true,
    fabric: "Lightweight Silk",
  },
  {
    id: "p13",
    slug: "platinum-shawl-lapel-tuxedo",
    name: "Platinum Shawl Lapel Tuxedo",
    shortDescription: "Midnight navy with satin shawl lapel",
    description:
      "An elevated alternative to classic black — midnight navy Italian wool with satin shawl lapels and mother-of-pearl closures, tailored for cosmopolitan receptions and western ceremonies.",
    price: 138000,
    category: "tuxedos",
    collectionId: "black-tie",
    images: [
      IMAGES.products.platinumTuxedo,
      IMAGES.products.imperialTuxedo,
      IMAGES.products.receptionBlazer,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
        { id: "s4", label: "Size", value: "44" },
      ],
      colors: [{ id: "c1", label: "Color", value: "Midnight Navy" }],
    },
    tags: ["reception", "black-tie"],
    inStock: true,
    stockCount: 5,
    featured: true,
    fabric: "Italian Wool",
  },
  {
    id: "p14",
    slug: "sangeet-sequin-blazer",
    name: "Sangeet Sequin Blazer",
    shortDescription: "Velvet blazer with gold sequin lapels",
    description:
      "A statement after-party blazer in deep velvet with hand-applied gold sequin lapels — built for the groom who owns the dance floor at sangeet and reception after-parties.",
    price: 85000,
    category: "reception",
    collectionId: "reception-nights",
    images: [
      IMAGES.products.sangeetBlazer,
      IMAGES.products.receptionBlazer,
      IMAGES.products.indoWestern,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "38" },
        { id: "s2", label: "Size", value: "40" },
        { id: "s3", label: "Size", value: "42" },
      ],
      colors: [
        { id: "c1", label: "Color", value: "Midnight Black" },
        { id: "c2", label: "Color", value: "Royal Wine" },
      ],
    },
    tags: ["sangeet", "reception"],
    inStock: true,
    stockCount: 5,
    isNew: true,
    fabric: "Cotton-Velvet",
  },
  {
    id: "p15",
    slug: "royal-safa-stole-set",
    name: "Royal Safa & Stole Set",
    shortDescription: "Hand-tied safa with zari-bordered ceremonial stole",
    description:
      "Complete your baraat and ceremony look with a hand-crafted safa in burgundy and gold, paired with a silk ceremonial stole featuring antique zari borders. Includes styling consultation.",
    price: 35000,
    category: "accessories",
    images: [
      IMAGES.products.safaStoleSet,
      IMAGES.products.accessories,
      IMAGES.products.maharajaSherwani,
    ],
    variants: {
      sizes: [{ id: "s1", label: "Size", value: "One Size" }],
      colors: [
        { id: "c1", label: "Color", value: "Royal Burgundy" },
        { id: "c2", label: "Color", value: "Champagne Gold" },
        { id: "c3", label: "Color", value: "Ivory Pearl" },
      ],
    },
    tags: ["baraat", "accessories", "wedding"],
    inStock: true,
    stockCount: 15,
    featured: true,
  },
  {
    id: "p16",
    slug: "heritage-embroidered-mojari",
    name: "Heritage Embroidered Mojari",
    shortDescription: "Velvet mojari with gold zari hand embroidery",
    description:
      "Traditional velvet mojaris with intricate gold zari embroidery — the finishing touch for sherwani and kurta ensembles. Cushioned insole for long ceremony hours.",
    price: 22000,
    category: "accessories",
    images: [
      IMAGES.products.mojariSet,
      IMAGES.products.accessories,
      IMAGES.products.safaStoleSet,
    ],
    variants: {
      sizes: [
        { id: "s1", label: "Size", value: "UK 7" },
        { id: "s2", label: "Size", value: "UK 8" },
        { id: "s3", label: "Size", value: "UK 9" },
        { id: "s4", label: "Size", value: "UK 10" },
        { id: "s5", label: "Size", value: "UK 11" },
      ],
      colors: [
        { id: "c1", label: "Color", value: "Wine Velvet" },
        { id: "c2", label: "Color", value: "Midnight Black" },
        { id: "c3", label: "Color", value: "Antique Gold" },
      ],
    },
    tags: ["accessories", "footwear"],
    inStock: true,
    stockCount: 20,
    isNew: true,
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

export function getBestSellingProducts(limit = 8): Product[] {
  return [...products]
    .filter((p) => p.tags?.includes("bestseller") || p.featured)
    .sort((a, b) => (b.stockCount ?? 0) - (a.stockCount ?? 0))
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function getTrendingProducts(limit = 6): Product[] {
  return products
    .filter((p) => p.inStock)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, limit);
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
