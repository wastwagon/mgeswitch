import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FeatureBento } from "@/components/FeatureBento";
import { ServiceCatalogue } from "@/components/ServiceCatalogue";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";
import { SERVICE_DETAILS } from "@/lib/services";

export const metadata: Metadata = createMetadata({
  title: "Marine Supply Services",
  description:
    "Explore Ulfborg Rebooth's premium marine and offshore supply services including provisions, technical stores, lubricants, ropes, medical items, safety equipment, and nautical publications.",
  openGraph: {
    title: "Marine Supply Services | Ulfborg Rebooth",
    description:
      "Premium marine and offshore support from Tema to major West African ports.",
    images: [
      {
        url: IMAGES.meetGreet,
        width: 1200,
        height: 630,
        alt: "Ulfborg Rebooth supply services",
      },
    ],
  },
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Supply"
        title="A premium marine supply catalogue built around operational reality"
        description="Each service line is structured to support vessel turnaround, crew welfare, and technical continuity with dependable sourcing and responsive coordination."
        image={IMAGES.hero}
        imageAlt="Ulfborg Rebooth marine supply services"
      />

      <section className="border-b border-border bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 sm:px-6">
          {SERVICE_DETAILS.map((service) => (
            <Link
              key={service.id}
              href={`#${service.id}`}
              className="border border-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-navy transition hover:border-gold hover:text-gold"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </section>

      <FeatureBento showHeader={false} />
      <ServiceCatalogue />
      <CTABanner />
    </>
  );
}
