import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { TrustStatsBar } from "@/components/TrustStatsBar";
import { CredibilitySection } from "@/components/CredibilitySection";
import { HomeExplore } from "@/components/HomeExplore";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BlogTeaser } from "@/components/BlogTeaser";
import { CorporateTeaser } from "@/components/CorporateTeaser";
import { PortCallScope } from "@/components/PortCallScope";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata();

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStatsBar />
      <PortCallScope />
      <CredibilitySection />
      <HomeExplore />
      <TestimonialsSection />
      <BlogTeaser />
      <CorporateTeaser />
      <CTABanner />
    </>
  );
}
