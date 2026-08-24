import Image from "next/image";
import type { Metadata } from "next";
import {
  BrochureDownload,
  CorporateEnquiryForm,
} from "@/components/corporate/CorporateSections";
import { CORPORATE_CONTENT } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Enquiries",
  description:
    "Send marine supply, vessel support, and regional port enquiries to Ulfborg Rebooth.",
  openGraph: {
    title: "Marine Supply Enquiries | Ulfborg Rebooth",
    description:
      "A premium enquiry channel for technical stores, provisions, and regional vessel support.",
    images: [{ url: IMAGES.fleet.suv, width: 1200, height: 630, alt: "Ulfborg Rebooth enquiries" }],
  },
});

export default function CorporatePage() {
  const { hero, offerings, contact } = CORPORATE_CONTENT;

  return (
    <>
        <section className="relative flex min-h-[55vh] items-end overflow-hidden">
          <Image
            src={IMAGES.fleet.suv}
            alt="Ulfborg Rebooth operations enquiry"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/40" />
          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              {hero.eyebrow}
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
              {hero.subheadline}
            </p>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {offerings.map((offering, i) => (
                <article
                  key={offering.title}
                  className="flex flex-col border border-border bg-white"
                >
                  <div className="bg-navy px-6 py-5">
                    <span className="font-mono text-xs text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display mt-2 text-xl font-bold text-white">
                      {offering.title}
                    </h2>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm leading-relaxed text-muted">
                      {offering.description}
                    </p>
                    <ul className="mt-6 space-y-3 border-t border-border pt-6">
                      {offering.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-navy"
                        >
                          <span className="h-1 w-4 bg-gold" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-light-blue-bg/40 py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <BrochureDownload />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
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
