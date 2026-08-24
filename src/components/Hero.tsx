"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { HERO_COPY } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { useBrand } from "@/components/BrandProvider";

export function Hero() {
  const brand = useBrand();
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        <div className="order-2 flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 lg:order-1 lg:col-span-5 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            {HERO_COPY.eyebrow}
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl xl:text-[3.35rem]">
            {HERO_COPY.headline}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {HERO_COPY.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/corporate"
              className="group inline-flex items-center gap-3 bg-gold px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light"
            >
              {HERO_COPY.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`tel:${brand.phone}`}
              className="inline-flex items-center gap-2 border border-navy/20 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-navy transition hover:border-gold hover:text-gold"
            >
              <Phone className="h-4 w-4" />
              {brand.phone}
            </a>
          </div>
        </div>

        <div className="relative order-1 min-h-[46vh] lg:order-2 lg:col-span-7 lg:min-h-[82vh]">
          <Image
            src={IMAGES.hero}
            alt="Commercial vessel alongside for ship agency attendance"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      </div>
    </section>
  );
}
