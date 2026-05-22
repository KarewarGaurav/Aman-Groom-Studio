import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { SectionDivider } from "@/components/common/SectionDivider";
import { SectionSkeleton } from "@/components/common/SectionSkeleton";

const HomeBelowFold = dynamic(
  () =>
    import("@/components/home/HomeBelowFold").then((m) => ({
      default: m.HomeBelowFold,
    })),
  {
    loading: () => <SectionSkeleton variant="grid" />,
  }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider label="Signature Collections" />
      <FeaturedCategories />
      <HomeBelowFold />
    </>
  );
}
