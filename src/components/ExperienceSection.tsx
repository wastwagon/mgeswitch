import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

export function ExperienceSection() {
  return (
    <section id="experience" className="overflow-hidden bg-navy">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-[400px] lg:min-h-[600px]">
          <Image
            src={IMAGES.meetGreet}
            alt="Packed marine supply cargo secured inside a container"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-navy/20 lg:bg-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Supply Execution
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Staged with care.
            <br />
            Delivered with urgency.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75">
            Every delivery is shaped around operational readiness: carefully
            selected products, practical packing, responsive communication, and
            a service approach built to protect vessel turnaround at port and
            offshore support points.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Quality-led product selection",
              "Cargo prepared for safe handling",
              "Fast response to urgent requirements",
              "Regional support across multiple West African ports",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-white/85"
              >
                <span className="h-px w-6 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/experience"
            className="mt-10 inline-flex w-fit border border-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-gold transition hover:bg-gold hover:text-white"
          >
            View The Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
