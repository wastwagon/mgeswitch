import { CredibilityBadges } from "@/components/CredibilityBadges";

export function CredibilitySection() {
  return (
    <section className="border-y border-border bg-[#fafbfc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Why Ulfborg
          </p>
          <h2 className="font-display mt-4 text-2xl font-bold text-navy sm:text-3xl">
            Built for reliability in demanding marine operations
          </h2>
        </div>
        <CredibilityBadges />
      </div>
    </section>
  );
}
