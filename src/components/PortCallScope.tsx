import { PORT_CALL_SCOPE } from "@/lib/operations";

export function PortCallScope() {
  return (
    <section className="border-y border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Full Port Call
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
              Every aspect of the call, from arrival to sailaway
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted lg:col-span-5">
            MGE-SWITCH is a Ghanaian-registered ship agency and husbandry
            partner, with oil and gas upstream support on the ground in Tema and
            Takoradi, and allied coverage at Lome — West Africa’s key transit
            hub.
          </p>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PORT_CALL_SCOPE.map((item, index) => (
            <article key={item.title} className="bg-white p-8 sm:p-10">
              <span className="font-display text-sm text-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-4 text-xl font-bold text-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
