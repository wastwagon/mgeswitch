import Image from "next/image";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  minHeight?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  minHeight = "min-h-[36vh] sm:min-h-[44vh]",
}: PageHeroProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        <div className="flex flex-col justify-end px-4 py-12 sm:px-6 sm:py-16 lg:col-span-5 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-xl text-4xl font-bold leading-[1.1] text-navy sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>
          )}
        </div>
        <div className={`relative ${minHeight} lg:col-span-7`}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      </div>
    </section>
  );
}
