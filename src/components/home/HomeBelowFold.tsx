import { BespokeSection } from "@/components/home/BespokeSection";
import { WeddingTimeline } from "@/components/home/WeddingTimeline";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ClientShowcase } from "@/components/home/ClientShowcase";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { BookingCTA } from "@/components/home/BookingCTA";
import { StoreSection } from "@/components/home/StoreSection";
import { FAQSection } from "@/components/home/FAQSection";
import { MarqueeStrip } from "@/components/common/MarqueeStrip";

export function HomeBelowFold() {
  return (
    <>
      <BespokeSection />
      <WeddingTimeline />
      <MarqueeStrip speed={40} />
      <FeaturedProducts />
      <TestimonialsSection />
      <ClientShowcase />
      <InstagramGallery />
      <BookingCTA />
      <StoreSection />
      <FAQSection />
    </>
  );
}
