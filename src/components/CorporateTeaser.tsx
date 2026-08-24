import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

export function CorporateTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[480px]">
          <Image
            src={IMAGES.fleet.van}
            alt="Nautical publications and marine supply planning"
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Operations & Procurement
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-white sm:text-4xl">
            A premium enquiry flow for urgent and planned supply requirements
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">
            Submit vessel, offshore, or port support requirements with the detail
            serious maritime operations demand. Our team reviews supply scope,
            timing, and specification before responding.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/corporate"
              className="inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
            >
              Start An Enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/corporate/brochure"
              target="_blank"
              className="inline-flex items-center justify-center border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:border-gold hover:text-gold"
            >
              View Capability Sheet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
