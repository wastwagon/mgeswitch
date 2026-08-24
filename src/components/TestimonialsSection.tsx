import Link from "next/link";
import { Star } from "lucide-react";
import { GOOGLE_REVIEWS, TESTIMONIALS } from "@/lib/trust";

export function TestimonialsSection() {
  return (
    <section className="bg-light-blue-bg/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Client Confidence
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
            Trusted by operators who value response and precision
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
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
              + years of market presence · {GOOGLE_REVIEWS.totalReviews} active port points
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col border border-border bg-white p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-gold text-gold"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center bg-navy text-xs font-bold text-white">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{review.name}</p>
                  <p className="text-xs text-muted">
                    {review.location} · {review.date}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
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
