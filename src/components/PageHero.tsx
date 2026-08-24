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
  minHeight = "min-h-[40vh] sm:min-h-[50vh]",
}: PageHeroProps) {
  return (
    <section className={`relative flex ${minHeight} items-end overflow-hidden`}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/35" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
