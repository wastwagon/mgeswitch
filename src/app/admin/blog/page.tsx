import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FileText, ExternalLink } from "lucide-react";
import { BlogEditor } from "@/components/admin/BlogEditor";
import type { BlogSection } from "@/lib/blog";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Blog
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage marine operations insights and supply guides — published at /blog/[slug]
          </p>
        </div>
        <BlogEditor mode="create" />
      </div>

      <div className="border border-border bg-white shadow-sm">
        {posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FileText className="mx-auto h-12 w-12 text-light-blue" />
            <p className="mt-4 font-medium text-navy">No blog posts yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-display font-bold text-navy">{post.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">/blog/{post.slug}</p>
                  <p className="mt-1 text-xs text-gold">{post.category}</p>
                  <p className="mt-2 line-clamp-2 text-xs text-muted">{post.excerpt}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {post.isPublished && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center border border-border text-navy hover:border-gold hover:text-gold"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  <span
                    className={`border px-2.5 py-1 text-[10px] font-semibold uppercase ${
                      post.isPublished
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  >
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                  <BlogEditor
                    mode="edit"
                    post={{
                      id: post.id,
                      slug: post.slug,
                      title: post.title,
                      excerpt: post.excerpt,
                      category: post.category,
                      publishedAt: post.publishedAt.toISOString(),
                      readTime: post.readTime,
                      imageUrl: post.imageUrl,
                      imageAlt: post.imageAlt,
                      imageMediaId: post.imageMediaId,
                      sections: post.sections as BlogSection[],
                      contentHtml: post.contentHtml,
                      isPublished: post.isPublished,
                      metaTitle: post.metaTitle,
                      metaDescription: post.metaDescription,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
