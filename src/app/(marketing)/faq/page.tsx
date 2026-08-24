import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FAQSection } from "@/components/FAQSection";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Ulfborg Rebooth's marine supply scope, response model, and West African port coverage.",
  openGraph: {
    title: "FAQ | Ulfborg Rebooth",
    description: "Answers to common questions about marine and offshore supply support.",
    images: [{ url: IMAGES.og, width: 1200, height: 630, alt: "Ulfborg Rebooth FAQ" }],
  },
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions before you enquire"
        description="Everything you need to know about our marine supply categories, regional support network, and vessel-response approach."
        image={IMAGES.hero}
        imageAlt="Ulfborg Rebooth FAQ"
        minHeight="min-h-[42vh]"
      />
      <FAQSection showHeader={false} />
      <CTABanner />
    </>
  );
}
