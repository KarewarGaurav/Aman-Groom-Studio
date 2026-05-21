import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import { ProductDetailView } from "@/components/shop/ProductDetailView";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
