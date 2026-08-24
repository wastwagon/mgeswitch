import type { Metadata } from "next";
import {
  BrochureDownload,
  CorporateEnquiryForm,
} from "@/components/corporate/CorporateSections";
import { PageHero } from "@/components/PageHero";
import { CORPORATE_CONTENT } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Enquiries",
  description:
    "Send ship agency, vessel support, and regional port enquiries to MGE-SWITCH.",
  openGraph: {
    title: "Ship Agency Enquiries | MGE-SWITCH",
    description:
      "A premium enquiry channel for technical stores, provisions, and regional vessel support.",
    images: [{ url: IMAGES.fleet.suv, width: 1200, height: 630, alt: "MGE-SWITCH enquiries" }],
  },
});

export default function CorporatePage() {
  const { hero, offerings, contact } = CORPORATE_CONTENT;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.headline}
        description={hero.subheadline}
        image={IMAGES.fleet.suv}
        imageAlt="MGE-SWITCH operations enquiry"
      />

      <section className="border-b border-border bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              What We Handle
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-navy">
              Enquiry lines for planned and urgent calls
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {offerings.map((offering, i) => (
              <article
                key={offering.title}
                className="grid gap-4 py-8 lg:grid-cols-12 lg:items-start"
              >
                <span className="font-display text-sm text-gold lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold text-navy lg:col-span-3">
                  {offering.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted lg:col-span-4">
                  {offering.description}
                </p>
                <ul className="space-y-2 lg:col-span-4">
                  {offering.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-navy">
                      <span className="h-px w-4 bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <BrochureDownload />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Get in Touch
            </p>
            <h2 className="font-display mt-4 text-2xl font-bold text-navy sm:text-3xl">
              {contact.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {contact.description}
            </p>
            <div className="mt-8">
              <CorporateEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
