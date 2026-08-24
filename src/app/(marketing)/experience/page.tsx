import type { Metadata } from "next";
import Image from "next/image";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "A visual look at MGE-SWITCH ship agency, husbandry, oil and gas upstream, crew change, and protective agency operations across Tema, Takoradi, and Lome.",
  openGraph: {
    title: "Gallery | MGE-SWITCH",
    description:
      "Port and vessel-support visuals reflecting precision agency attendance.",
    images: [{ url: IMAGES.meetGreet, width: 1200, height: 630, alt: "MGE-SWITCH gallery" }],
  },
});

const galleryImages = [
  {
    src: "/gallery/mge-ship-agency-port-01.png",
    alt: "Ship agency coordination at a commercial West African port",
  },
  {
    src: "/gallery/mge-ship-spares-delivery-02.png",
    alt: "Ship spares clearing and quayside delivery staging",
  },
  {
    src: "/gallery/mge-crew-change-03.png",
    alt: "Crew change logistics near vessel gangway",
  },
  {
    src: "/gallery/mge-protective-agency-04.png",
    alt: "Protective agency attendance during vessel turnaround",
  },
  {
    src: "/gallery/mge-port-operations-hero-05.png",
    alt: "Commercial vessel alongside port for agency attendance",
  },
] as const;

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Port operations, captured with care"
        description="Visuals that reflect ship agency attendance, crew logistics, spares delivery, and protective cover across our port network."
        image={IMAGES.meetGreet}
        imageAlt="MGE-SWITCH operations gallery"
      />
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                Operations Photography
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
                Agency, husbandry, and turnaround readiness
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
              These images ground MGE-SWITCH in practical port work — vessel
              attendance, logistics coordination, and the calm discipline owners
              expect during a call.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-6">
            {galleryImages.map((item, index) => (
              <div
                key={item.src}
                className={
                  index === 0
                    ? "relative aspect-[4/3] overflow-hidden bg-navy md:col-span-4 md:row-span-2 md:aspect-auto md:min-h-[420px]"
                    : "relative aspect-square overflow-hidden bg-navy md:col-span-2"
                }
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
