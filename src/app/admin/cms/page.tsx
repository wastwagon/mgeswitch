import { prisma } from "@/lib/prisma";
import { FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import { CmsEditor } from "@/components/admin/CmsEditor";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function AdminCmsPage() {
  const pages = await prisma.cmsPage.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Content Management
          </h1>
          <p className="mt-1 text-sm text-muted">
            Professional pages with rich editing — Terms, Privacy, policies, and more
          </p>
        </div>
        <CmsEditor mode="create" />
      </div>

      <div className="border border-border bg-white shadow-sm">
        {pages.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FileText className="mx-auto h-12 w-12 text-light-blue" />
            <p className="mt-4 font-medium text-navy">No pages yet</p>
            <p className="mt-1 text-sm text-muted">
              Create your first CMS page — it will be live at /pages/your-slug
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {pages.map((page) => (
              <li
                key={page.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-display font-bold text-navy">{page.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">/pages/{page.slug}</p>
                  <p className="mt-2 line-clamp-2 text-xs text-muted">
                    {page.excerpt ?? stripHtml(page.content).slice(0, 140)}…
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {page.isPublished && (
                    <Link
                      href={`/pages/${page.slug}`}
                      target="_blank"
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center border border-border text-navy hover:border-gold hover:text-gold"
                      aria-label="View page"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  <span
                    className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      page.isPublished
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  >
                    {page.isPublished ? "Published" : "Draft"}
                  </span>
                  <CmsEditor
                    mode="edit"
                    page={{
                      id: page.id,
                      slug: page.slug,
                      title: page.title,
                      excerpt: page.excerpt,
                      content: page.content,
                      featuredImageUrl: page.featuredImageUrl,
                      featuredImageAlt: page.featuredImageAlt,
                      metaTitle: page.metaTitle,
                      metaDescription: page.metaDescription,
                      isPublished: page.isPublished,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-l-4 border-gold bg-white p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
          Tip
        </p>
        <p className="mt-2 text-sm text-muted">
          CMS pages publish at <strong className="text-navy">/pages/[slug]</strong>.
          Use the rich editor for headings, lists, links, and formatted policies.
          Marketing pages like About and Corporate remain design-controlled in code.
        </p>
      </div>
    </div>
  );
}
