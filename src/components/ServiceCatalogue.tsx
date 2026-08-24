import Image from "next/image";
import { SERVICE_DETAILS } from "@/lib/services";

export function ServiceCatalogue() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Service Catalogue
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
            Detailed supply lines with product depth
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Each category pairs descriptive capability copy with the product
            ranges vessels actually request — designed as a premium procurement
            profile, not a placeholder brochure.
          </p>
        </div>

        <div className="space-y-10 lg:space-y-16">
          {SERVICE_DETAILS.map((service, index) => {
            const imageLeft = index % 2 === 0;
            return (
              <article
                key={service.id}
                id={service.id}
                className="overflow-hidden border border-border bg-white"
              >
                <div
                  className={`grid lg:grid-cols-2 ${
                    imageLeft ? "" : "lg:[&>*:first-child]:order-2"
                  }`}
                >
                  <div className="relative min-h-[280px] bg-navy sm:min-h-[360px]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                    <p className="absolute bottom-5 left-5 font-mono text-xs text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                      {service.eyebrow}
                    </p>
                    <h3 className="font-display mt-3 text-2xl font-bold text-navy sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-base font-medium leading-relaxed text-navy/80">
                      {service.summary}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                          Product Range
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {service.products.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-snug text-navy"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                          Typical Clients
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {service.vessels.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm leading-snug text-muted"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy/30" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
