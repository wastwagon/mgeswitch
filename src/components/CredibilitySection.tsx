import { CredibilityBadges } from "@/components/CredibilityBadges";

export function CredibilitySection() {
  return (
    <section className="border-y border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Why owners appoint us
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
            Local cover with the discipline of a principal&apos;s desk
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Six operating standards we hold on every call — from first nomination
            through last line, across Tema, Takoradi, and Lome.
          </p>
        </div>
        <div className="mt-14">
          <CredibilityBadges />
        </div>
      </div>
    </section>
  );
}
