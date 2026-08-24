import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  priority?: boolean;
}

export function BlogCard({
  post,
  variant = "default",
  priority = false,
}: BlogCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgba(27,54,93,0.12)] transition duration-500 hover:shadow-[0_30px_70px_-20px_rgba(27,54,93,0.22)]",
        isFeatured ? "flex-col lg:flex-row" : "flex-col",
        isCompact && "shadow-[0_12px_40px_-16px_rgba(27,54,93,0.1)]"
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-navy",
          isFeatured
            ? "aspect-[16/10] lg:aspect-auto lg:w-[52%] lg:min-h-[380px]"
            : isCompact
              ? "aspect-[16/11]"
              : "aspect-[16/10]"
        )}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority={priority}
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes={
            isFeatured
              ? "(max-width: 1024px) 100vw, 52vw"
              : "(max-width: 1024px) 100vw, 33vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
        <span className="absolute left-4 top-4 bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
          {post.category}
        </span>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col border-t-2 border-gold",
          isFeatured ? "p-6 sm:p-8 lg:justify-center lg:p-10 lg:pl-12" : "p-6 sm:p-8",
          isCompact && "p-5 sm:p-6"
        )}
      >
        <time className="text-xs text-muted">
          {new Date(post.publishedAt).toLocaleDateString("en-GH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" · "}
          {post.readTime}
        </time>

        <h2
          className={cn(
            "font-display mt-3 font-bold leading-snug text-navy transition group-hover:text-gold",
            isFeatured
              ? "text-2xl sm:text-3xl lg:text-4xl"
              : isCompact
                ? "text-lg"
                : "text-xl"
          )}
        >
          {post.title}
        </h2>

        <p
          className={cn(
            "mt-3 flex-1 leading-relaxed text-muted",
            isCompact ? "text-sm line-clamp-2" : "text-sm"
          )}
        >
          {post.excerpt}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy transition group-hover:text-gold">
          Read article
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
