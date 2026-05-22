import { IMAGES } from "@/lib/images";
import type { Collection } from "@/types/cms";

export const collections: Collection[] = [
  {
    id: "royal-wedding",
    slug: "royal-wedding",
    title: "Royal Wedding",
    subtitle: "Regal sherwanis for the grand ceremony",
    description:
      "Opulent silhouettes inspired by Indian royalty — hand embroidery, rich silks, and ceremonial grandeur.",
    image: IMAGES.collections.sherwanis,
    productIds: ["p1", "p8", "p9", "p10"],
    featured: true,
  },
  {
    id: "black-tie",
    slug: "black-tie",
    title: "Black Tie Edit",
    subtitle: "Western elegance redefined",
    description:
      "Precision-tailored tuxedos and formal wear for reception nights and cosmopolitan celebrations.",
    image: IMAGES.collections.tuxedos,
    productIds: ["p2", "p7", "p13"],
    featured: true,
  },
  {
    id: "fusion-couture",
    slug: "fusion-couture",
    title: "Fusion Couture",
    subtitle: "Indo-western for the modern groom",
    description:
      "Contemporary silhouettes that honour tradition while embracing modern luxury.",
    image: IMAGES.collections.indoWestern,
    productIds: ["p3", "p4", "p11", "p12"],
    featured: true,
  },
  {
    id: "reception-nights",
    slug: "reception-nights",
    title: "Reception Nights",
    subtitle: "Statement pieces for celebration",
    description:
      "Velvet blazers, embellished jackets, and after-party essentials.",
    image: IMAGES.collections.reception,
    productIds: ["p7", "p2", "p14"],
    featured: false,
  },
];
