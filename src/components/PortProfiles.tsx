import { PORT_PROFILES } from "@/lib/operations";

export function PortProfiles() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Ground Operations
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
            Ghana’s two principal ports, plus Lome as the regional transit hub
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PORT_PROFILES.map((profile) => (
            <article
              key={profile.port}
              className="border border-border bg-light-blue-bg/30 p-8"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                {profile.country}
              </p>
              <h3 className="font-display mt-3 text-2xl font-bold text-navy">
                {profile.port}
              </h3>
              <p className="mt-1 text-sm font-medium text-navy/70">
                {profile.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {profile.summary}
              </p>
              <ul className="mt-6 space-y-2">
                {profile.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-navy"
                  >
                    <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
