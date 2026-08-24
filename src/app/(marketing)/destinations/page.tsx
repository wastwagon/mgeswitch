import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { DestinationsExplorer } from "@/components/DestinationsExplorer";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Ports & Coverage",
  description:
    "Discover MGE-SWITCH's operational footprint across Tema, Takoradi, Lome, Cotonou, Apapa, and Monrovia.",
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
        title="A responsive West African port network"
        description="Our core Ghana presence is reinforced by branch and operational support points across West Africa, giving clients continuity beyond a single call."
        image={IMAGES.hero}
        imageAlt="MGE-SWITCH ports and regional network"
        minHeight="min-h-[42vh]"
      />
      <DestinationsExplorer showHeader={false} />
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          {[
            "Tema, Ghana — Heavy Industrial Area Enclave",
            "Takoradi, Ghana — Beach Road Drive",
            "Lome, Togo — Grande Contournement Rond Point Adakpame",
            "Cotonou, Benin — Boulevard La Marina Plage",
            "Apapa, Nigeria — Abayomi Street, Apapa",
            "Monrovia, Liberia — Off Sufi Junction, Congo Town",
          ].map((office) => (
            <div key={office} className="border border-border bg-light-blue-bg/30 p-6 text-sm text-navy">
              {office}
            </div>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
