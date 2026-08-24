import { BOOKING_STEPS } from "@/lib/constants";

export function ProcessTimeline({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="border-t border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {showHeader && (
          <div className="mb-14 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              How It Works
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy sm:text-4xl">
              Four steps to coordinated ship agency response
            </h2>
          </div>
        )}

        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-gold/30 lg:block"
            aria-hidden
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {BOOKING_STEPS.map((item) => (
              <li key={item.step} className="relative text-center lg:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-navy bg-white font-mono text-lg font-bold text-navy lg:mx-0">
                  {item.step}
                </div>
                <h3 className="mt-5 text-base font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
