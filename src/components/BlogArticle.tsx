import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";
import { CmsHtmlContent } from "@/components/CmsHtmlContent";

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogArticle({ post, relatedPosts }: BlogArticleProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-36">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-white/70">
            <Link href="/" className="transition hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition hover:text-gold">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/90">{post.category}</span>
          </nav>

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            {post.category}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <article className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-navy/90 sm:text-xl">
                {post.excerpt}
              </p>

              {/* Mobile inline CTA — visible before long scroll */}
              <div className="mt-8 border border-gold/30 bg-light-blue-bg/50 p-5 lg:hidden">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                  Need supply support?
                </p>
                <p className="font-display mt-2 text-lg font-bold text-navy">
                  Send your vessel requirements
                </p>
                <Link
                  href="/corporate"
                  className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 bg-gold text-xs font-bold uppercase tracking-widest text-white active:scale-[0.98]"
                >
                  Start an enquiry
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-12 h-px bg-border" />

              <div className="mt-12 space-y-10">
                {post.contentHtml ? (
                  <CmsHtmlContent html={post.contentHtml} />
                ) : (
                  post.sections.map((section, i) => (
                    <div key={i}>
                      {section.heading && (
                        <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                          {section.heading}
                        </h2>
                      )}
                      {section.paragraphs?.map((p) => (
                        <p
                          key={p.slice(0, 48)}
                          className="mt-4 text-base leading-relaxed text-muted sm:text-[17px] sm:leading-8"
                        >
                          {p}
                        </p>
                      ))}
                      {section.bullets && (
                        <ul className="mt-5 space-y-3">
                          {section.bullets.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-base leading-relaxed text-muted"
                            >
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-gold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-16 overflow-hidden border border-border bg-light-blue-bg/40">
                <div className="grid sm:grid-cols-2">
                  <div className="relative hidden min-h-[200px] sm:block">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-navy/30" />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-10">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                      Work with confidence
                    </p>
                    <h2 className="font-display mt-3 text-2xl font-bold text-navy">
                      Ready to discuss your next requirement?
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      Ship agency, crew change, spares delivery, protective
                      attendance, and responsive port-side coordination
                    </p>
                    <Link
                      href="/corporate"
                      className="mt-6 inline-flex w-fit items-center gap-2 bg-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
                    >
                      Start an enquiry
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-8">
                <div className="border border-border bg-navy p-8 text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                    MGE-SWITCH
                  </p>
                  <h3 className="font-display mt-3 text-xl font-bold">
                    Premium ship agency support
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    Responsive port attendance across agency, crew change, spares,
                    and protective requirements.
                  </p>
                  <Link
                    href="/corporate"
                    className="mt-6 block bg-gold py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
                  >
                    Send enquiry
                  </Link>
                  <Link
                    href="/contact"
                    className="mt-3 block border border-white/20 py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition hover:border-gold hover:text-gold"
                  >
                    Contact us
                  </Link>
                </div>

                {relatedPosts.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                      Related guides
                    </p>
                    <ul className="mt-4 divide-y divide-border border border-border">
                      {relatedPosts.map((related) => (
                        <li key={related.slug}>
                          <Link
                            href={`/blog/${related.slug}`}
                            className="group block p-4 transition hover:bg-light-blue-bg/50"
                          >
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                              {related.category}
                            </p>
                            <p className="font-display mt-1 text-sm font-bold leading-snug text-navy group-hover:text-gold">
                              {related.title}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy transition hover:text-gold"
                >
                  ← All articles
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-light-blue-bg/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  Keep reading
                </p>
                <h2 className="font-display mt-3 text-2xl font-bold text-navy sm:text-3xl">
                  More travel guides
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy transition hover:text-gold"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
