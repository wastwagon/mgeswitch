import { TRUST_STATS } from "@/lib/trust";

export function TrustStatsBar() {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="px-6 py-10 text-center sm:py-12">
            <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
              {stat.value}
              {stat.suffix ? (
                <span className="text-gold">{stat.suffix}</span>
              ) : null}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-widest text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
