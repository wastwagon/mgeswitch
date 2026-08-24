import type { Metadata } from "next";
import Image from "next/image";
import { CTABanner } from "@/components/CTABanner";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "A visual look at Ulfborg Rebooth's real marine supply operations, cargo preparation, and vessel-support readiness.",
  openGraph: {
    title: "Gallery | Ulfborg Rebooth",
    description:
      "Real media from supply operations and cargo handling for marine and offshore clients.",
    images: [{ url: IMAGES.meetGreet, width: 1200, height: 630, alt: "Ulfborg Rebooth gallery" }],
  },
});

const galleryImages = [
  {
    src: "/gallery/ulfborg-ship-provisions-container-01.jpeg",
    alt: "Ulfborg Rebooth ship provisions packed in a container for vessel supply",
  },
  {
    src: "/gallery/ulfborg-marine-cabin-stores-02.jpeg",
    alt: "Marine cabin stores and food provisions prepared for ship delivery",
  },
  {
    src: "/gallery/ulfborg-vessel-cargo-net-supply-03.jpeg",
    alt: "Vessel supply cargo secured with industrial cargo netting",
  },
  {
    src: "/gallery/ulfborg-offshore-provisions-container-04.jpeg",
    alt: "Offshore provisions container staged for West African port delivery",
  },
] as const;

const galleryVideos = [
  "/gallery/ulfborg-marine-supply-operations-01.mp4",
  "/gallery/ulfborg-ship-chandling-operations-02.mp4",
  "/gallery/ulfborg-vessel-supply-operations-03.mp4",
] as const;

export default function ExperiencePage() {
  return (
    <>
      <section className="relative flex min-h-[48vh] items-end overflow-hidden">
        <Image
          src={IMAGES.meetGreet}
          alt="Ulfborg Rebooth operations gallery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/35" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Gallery
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
            Real supply visuals from the field
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85">
            This section uses your provided media to ground the brand in real
            operational credibility rather than relying only on stock-style visuals.
          </p>
        </div>
      </section>
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Operations Photography
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
                Proof of preparation, packing, and supply readiness
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted">
              The imagery shows containerised provisions, orderly staging,
              visible cargo-control measures, and the type of practical
              ship-support work that reinforces a premium, capable identity.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {galleryImages.map((item) => (
              <div key={item.src} className="relative aspect-[4/3] overflow-hidden bg-navy">
                <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-light-blue-bg/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Video Highlights
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
              Motion footage from cargo and supply activity
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {galleryVideos.map((src) => (
              <video
                key={src}
                src={src}
                controls
                preload="metadata"
                className="w-full bg-navy"
              />
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
