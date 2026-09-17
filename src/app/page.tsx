import { Hero } from "@/components/home/Hero";
import { TwoSides } from "@/components/home/TwoSides";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ShelfRentalIntro } from "@/components/home/ShelfRentalIntro";
import { DiscoverPreview } from "@/components/home/DiscoverPreview";
import { StoreComfort } from "@/components/home/StoreComfort";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { StoreLocation } from "@/components/home/StoreLocation";
import { FaqPreview } from "@/components/home/FaqPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TwoSides />
      <HowItWorks />
      <ShelfRentalIntro />
      <DiscoverPreview />
      <StoreComfort />
      <StoryTeaser />
      <StoreLocation />
      <FaqPreview />
    </>
  );
}
