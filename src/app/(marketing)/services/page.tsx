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
  title: "Ship Agency Services",
  description:
    "Explore MGE-SWITCH ship agency, husbandry, crew change, protective agency, and oil and gas upstream support across Tema, Takoradi, and Lome.",
  openGraph: {
    title: "Ship Agency Services | MGE-SWITCH",
    description:
      "Precision port agency and allied services in Tema, Takoradi, and Lome.",
    images: [
      {
        url: IMAGES.meetGreet,
        width: 1200,
        height: 630,
        alt: "MGE-SWITCH ship agency services",
      },
    ],
  },
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Agency and husbandry lines built around real port calls"
        description="Each service line is structured to ease administrative and logistics burden — from documentation, crew change, and spares to protective attendance and oil and gas upstream support."
        image={IMAGES.hero}
        imageAlt="MGE-SWITCH ship agency services"
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
