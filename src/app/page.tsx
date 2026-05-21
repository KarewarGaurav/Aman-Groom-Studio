import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { MarqueeStrip } from "@/components/common/MarqueeStrip";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";

const HomeBelowFold = dynamic(
  () =>
    import("@/components/home/HomeBelowFold").then((m) => ({
      default: m.HomeBelowFold,
    })),
  {
    loading: () => <SectionSkeleton variant="tall" />,
  }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <FeaturedCollections />
      <HomeBelowFold />
    </>
  );
}
