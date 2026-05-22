import { ProductSlider } from "@/components/shop/ProductSlider";
import { WeddingCollections } from "@/components/home/WeddingCollections";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { SectionDivider } from "@/components/common/SectionDivider";
import {
  getBestSellingProducts,
  getNewArrivals,
  getFeaturedProducts,
  getTrendingProducts,
} from "@/data/products";

export function HomeBelowFold() {
  const bestSellers = getBestSellingProducts(4);
  const newArrivals = getNewArrivals(4);
  const featured = getFeaturedProducts().slice(0, 4);
  const trending = getTrendingProducts(4);

  return (
    <>
      <SectionDivider label="Curated for the Groom" />
      <ProductSlider
        label="Bestsellers"
        title="Best Selling"
        subtitle="Most loved pieces by our grooms"
        products={bestSellers}
        viewAllHref="/shop?sort=featured"
        tone="ivory"
      />
      <SectionDivider />
      <ProductSlider
        label="Just In"
        title="New Arrivals"
        subtitle="Fresh from the atelier"
        products={newArrivals.length ? newArrivals : featured}
        viewAllHref="/shop?sort=new"
        tone="cream"
      />
      <WeddingCollections />
      <SectionDivider label="Editorial Selection" />
      <ProductSlider
        label="Editor's Pick"
        title="Featured Products"
        products={featured}
        viewAllHref="/shop"
        tone="warm"
      />
      <ProductSlider
        label="Trending"
        title="Trending Styles"
        subtitle="What grooms are shopping now"
        products={trending}
        viewAllHref="/shop"
        tone="sand"
      />
      <PromoBanner />
      <SectionDivider label="Style & Stories" />
      <InstagramGallery />
      <TestimonialsSection />
    </>
  );
}
