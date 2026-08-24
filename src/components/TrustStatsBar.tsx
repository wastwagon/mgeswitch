import { TRUST_STATS } from "@/lib/trust";

export function TrustStatsBar() {
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto flex max-w-7xl flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0">
        {TRUST_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className="flex flex-1 items-baseline gap-4 px-6 py-8 sm:py-10"
          >
            <span className="font-display text-sm font-semibold text-gold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-display text-3xl font-bold text-navy sm:text-4xl">
                {stat.value}
                {stat.suffix ? (
                  <span className="text-gold">{stat.suffix}</span>
                ) : null}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
