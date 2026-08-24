import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { FLEET_IMAGE_MAP } from "@/lib/images";
import { formatCurrency } from "@/lib/utils";

export async function FleetShowcase({ showHeader = true }: { showHeader?: boolean }) {
  const vehicles = await prisma.vehicle.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <section id="fleet" className="bg-light-blue-bg/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {showHeader && (
          <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Supply Categories
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
                Browse key operational lines
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted">
              A visual way to highlight core service groups and premium
              operational support areas when needed elsewhere in the site.
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {vehicles.map((vehicle, index) => {
            const imageUrl =
              vehicle.imageUrl ??
              FLEET_IMAGE_MAP[vehicle.id] ??
              FLEET_IMAGE_MAP["executive-sedan"];

            return (
              <article
                key={vehicle.id}
                className="group overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgba(27,54,93,0.15)] transition hover:shadow-[0_30px_70px_-20px_rgba(27,54,93,0.25)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                  <Image
                    src={imageUrl}
                    alt={vehicle.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 bg-navy/80 px-3 py-1 font-mono text-xs text-gold backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="border-t-2 border-gold p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-navy">
                    {vehicle.name}
                  </h3>
                  {vehicle.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {vehicle.description}
                    </p>
                  )}
                  <div className="mt-6 flex items-end justify-between border-t border-border pt-6">
                    <p className="text-xs text-muted">
                      Up to {vehicle.capacity} guests · A/C · Chauffeur included
                    </p>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-muted">
                        From
                      </p>
                      <p className="font-display text-2xl font-bold text-gold">
                        {formatCurrency(Number(vehicle.basePrice))}
                      </p>
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
