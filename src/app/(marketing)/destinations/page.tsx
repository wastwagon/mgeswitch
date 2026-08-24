import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { DestinationsExplorer } from "@/components/DestinationsExplorer";
import { PortProfiles } from "@/components/PortProfiles";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Ports & Coverage",
  description:
    "Discover MGE-SWITCH's operational footprint across Tema, Takoradi, and Lome.",
  openGraph: {
    title: "Ports & Coverage | MGE-SWITCH",
    description:
      "A Ghana-based ship agency network serving key West African ports.",
    images: [{ url: IMAGES.hero, width: 1200, height: 630, alt: "MGE-SWITCH port coverage" }],
  },
});

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Ports"
        title="Focused coverage in Ghana and Togo"
        description="Ground operations in Tema and Takoradi — Ghana’s two principal ports — with allied coverage at Lome, West Africa’s key transit hub."
        image={IMAGES.hero}
        imageAlt="MGE-SWITCH ports and regional network"
        minHeight="min-h-[42vh]"
      />
      <DestinationsExplorer showHeader={false} />
      <PortProfiles />
      <CTABanner />
    </>
  );
}
