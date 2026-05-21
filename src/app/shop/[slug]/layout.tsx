import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { ProductJsonLd } from "@/components/shop/ProductJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: product.images[0]?.startsWith("http")
        ? [product.images[0]]
        : undefined,
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <ProductJsonLd product={product} />
      {children}
    </>
  );
}
