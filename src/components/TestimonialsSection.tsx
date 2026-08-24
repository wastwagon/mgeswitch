import Link from "next/link";
import { Star } from "lucide-react";
import { GOOGLE_REVIEWS, TESTIMONIALS } from "@/lib/trust";

export function TestimonialsSection() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Client Confidence
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
              Trusted by operators who value response and precision
            </h2>
          </div>
          <div className="flex items-center gap-2 lg:col-span-5 lg:col-start-8">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-gold text-gold"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="font-display text-xl font-bold text-navy">
              {GOOGLE_REVIEWS.rating}
            </span>
            <span className="text-sm text-muted">
              {GOOGLE_REVIEWS.totalReviews} active port points
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {featured && (
            <article className="border border-border bg-white p-8 sm:p-10 lg:col-span-7">
              <div className="flex gap-0.5">
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="font-display mt-6 text-2xl leading-snug text-navy sm:text-3xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center bg-navy text-xs font-bold text-white">
                  {featured.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{featured.name}</p>
                  <p className="text-xs text-muted">
                    {featured.location} · {featured.date}
                  </p>
                </div>
              </div>
            </article>
          )}

          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((review) => (
              <article key={review.id} className="border border-border bg-white p-6">
                <p className="text-sm leading-relaxed text-muted">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-navy">{review.name}</p>
                <p className="text-xs text-muted">
                  {review.location} · {review.date}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/corporate"
            className="inline-block border border-navy px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-navy transition hover:bg-navy hover:text-white"
          >
            Discuss your vessel needs
          </Link>
        </div>
      </div>
    </section>
  );
}
