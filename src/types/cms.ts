export type ProductCategory =
  | "sherwanis"
  | "tuxedos"
  | "indo-western"
  | "kurta-sets"
  | "accessories"
  | "custom"
  | "reception";

export interface ProductVariant {
  id: string;
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  collectionId?: string;
  images: string[];
  variants: {
    sizes: ProductVariant[];
    colors: ProductVariant[];
  };
  tags: string[];
  inStock: boolean;
  stockCount?: number;
  featured?: boolean;
  isNew?: boolean;
  fabric?: string;
  craftsmanship?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  productIds: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  weddingDate?: string;
  quote: string;
  rating: number;
  image?: string;
  outfit?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  category?: string;
  caption?: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  appointmentDate: string;
  timeSlot: string;
  outfitPreference: string;
  message?: string;
}
