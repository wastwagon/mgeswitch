import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";

export async function BlogTeaser() {
  const posts = [...(await getBlogPosts())]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Maritime Insights
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
              Latest from our blog
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Articles on marine supply readiness, port support planning, crew
              welfare sourcing, and practical offshore logistics.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy transition hover:text-gold"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
