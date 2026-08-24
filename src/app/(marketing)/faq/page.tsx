import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about MGE-SWITCH's Ghanaian-registered ship agency, full port-call coverage, oil and gas upstream support, and the Tema–Takoradi–Lome corridor.",
  openGraph: {
    title: "FAQ | MGE-SWITCH",
    description: "Answers to common questions about ship agency, crew change, and port attendance.",
    images: [{ url: IMAGES.og, width: 1200, height: 630, alt: "MGE-SWITCH FAQ" }],
  },
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions before you enquire"
        description="Everything you need to know about our ship agency lines, oil and gas upstream support, and coverage across Tema, Takoradi, and Lome."
        image={IMAGES.hero}
        imageAlt="MGE-SWITCH FAQ"
        minHeight="min-h-[42vh]"
      />
      <FAQSection showHeader={false} />
      <CTABanner />
    </>
  );
}
