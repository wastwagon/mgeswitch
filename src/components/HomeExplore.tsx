import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeExploreLinks } from "@/lib/navigation";

export function HomeExplore() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Explore MGE-SWITCH
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
              Premium structure for serious maritime buyers
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
            Every section is arranged to help operators, purchasers, and vessel
            teams reach the right service line quickly and with confidence.
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {homeExploreLinks.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group grid gap-3 py-8 transition hover:bg-background sm:grid-cols-12 sm:items-center sm:gap-6 sm:px-2"
            >
              <span className="font-display text-sm text-gold sm:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:col-span-2">
                {item.eyebrow}
              </p>
              <h3 className="font-display text-xl font-bold text-navy sm:col-span-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted sm:col-span-4">
                {item.description}
              </p>
              <span className="inline-flex items-center text-navy transition group-hover:text-gold sm:col-span-1 sm:justify-end">
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                <span className="sr-only">Learn more</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
