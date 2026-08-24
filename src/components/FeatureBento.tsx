import { SERVICE_FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const accentStyles = {
  navy: "bg-navy text-white",
  gold: "bg-gold text-white",
  light: "bg-white text-navy border border-border shadow-sm",
};

export function FeatureBento({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section id="what-we-do" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {showHeader && (
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              What We Supply
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Marine, offshore, and vessel support
              <br />
              <span className="text-light-blue">across West African ports</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Technical stores, provisions, lubricants, safety materials,
              publications, and crew essentials delivered with a premium
              standard of sourcing and coordination.
            </p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_FEATURES.map((feature, index) => (
            <article
              key={feature.id}
              className={cn(
                "relative p-8 sm:p-10",
                accentStyles[feature.accent as keyof typeof accentStyles],
                index === 0 && "md:col-span-2 lg:col-span-2",
                index === 2 && "lg:row-span-2 lg:flex lg:flex-col lg:justify-center"
              )}
            >
              <h3 className="font-display text-xl font-bold leading-snug sm:text-2xl">
                {feature.title}
              </h3>
              <p
                className={cn(
                  "mt-4 text-sm leading-relaxed sm:text-base",
                  feature.accent === "navy" || feature.accent === "gold"
                    ? "text-white"
                    : "text-muted"
                )}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
