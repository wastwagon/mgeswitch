import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeExploreLinks } from "@/lib/navigation";

export function HomeExplore() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Explore Ulfborg
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
            Premium structure for serious maritime buyers
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Every section is arranged to help operators, purchasers, and vessel
            teams reach the right service line quickly and with confidence.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeExploreLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col border border-border bg-white p-8 transition hover:border-gold hover:shadow-[0_20px_60px_-30px_rgba(27,54,93,0.25)]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                {item.eyebrow}
              </p>
              <h3 className="font-display mt-3 text-xl font-bold text-navy">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy transition group-hover:text-gold">
                Learn more
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
