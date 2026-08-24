"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Loader2, X, Trash2, ExternalLink } from "lucide-react";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { MediaPicker } from "@/components/admin/MediaPicker";

interface CmsPage {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isPublished: boolean;
}

interface CmsEditorProps {
  mode: "create" | "edit";
  page?: CmsPage;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function CmsEditor({ mode, page }: CmsEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    slug: page?.slug ?? "",
    title: page?.title ?? "",
    excerpt: page?.excerpt ?? "",
    content: page?.content ?? "<p></p>",
    featuredImageUrl: page?.featuredImageUrl ?? "",
    featuredImageAlt: page?.featuredImageAlt ?? "",
    metaTitle: page?.metaTitle ?? "",
    metaDescription: page?.metaDescription ?? "",
    isPublished: page?.isPublished ?? true,
  });

  useScrollLock(open);

  function openEditor() {
    setError("");
    setForm({
      slug: page?.slug ?? "",
      title: page?.title ?? "",
      excerpt: page?.excerpt ?? "",
      content: page?.content ?? "<p></p>",
      featuredImageUrl: page?.featuredImageUrl ?? "",
      featuredImageAlt: page?.featuredImageAlt ?? "",
      metaTitle: page?.metaTitle ?? "",
      metaDescription: page?.metaDescription ?? "",
      isPublished: page?.isPublished ?? true,
    });
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cms", {
        method: page ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          page
            ? {
                id: page.id,
                slug: form.slug,
                title: form.title,
                excerpt: form.excerpt || null,
                content: form.content,
                featuredImageUrl: form.featuredImageUrl || null,
                featuredImageAlt: form.featuredImageAlt || null,
                metaTitle: form.metaTitle || null,
                metaDescription: form.metaDescription || null,
                isPublished: form.isPublished,
              }
            : {
                slug: form.slug,
                title: form.title,
                excerpt: form.excerpt || null,
                content: form.content,
                featuredImageUrl: form.featuredImageUrl || null,
                featuredImageAlt: form.featuredImageAlt || null,
                metaTitle: form.metaTitle || null,
                metaDescription: form.metaDescription || null,
                isPublished: form.isPublished,
              }
        ),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save page");
      }
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save page");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!page || !confirm(`Delete "${page.title}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      await fetch(`/api/cms?id=${page.id}`, { method: "DELETE" });
      setOpen(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={openEditor}
        className={
          mode === "create"
            ? "inline-flex min-h-[44px] items-center gap-2 bg-navy px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-navy-dark active:scale-[0.98]"
            : "flex min-h-[44px] min-w-[44px] items-center justify-center border border-border text-navy transition hover:border-gold hover:text-gold active:scale-[0.98]"
        }
      >
        {mode === "create" ? (
          <>
            <Plus className="h-4 w-4" /> New Page
          </>
        ) : (
          <Pencil className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/50 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl safe-bottom sm:max-h-[92vh] sm:rounded-none">
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-navy px-6 py-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              {mode === "create" ? "New Page" : "Edit Page"}
            </h3>
            {page?.isPublished && (
              <Link
                href={`/pages/${page.slug}`}
                target="_blank"
                className="mt-1 inline-flex items-center gap-1 text-xs text-gold hover:underline"
              >
                View live <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="touch-target flex items-center justify-center text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain p-6">
            {error && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Page Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      slug: mode === "create" && !f.slug ? slugify(title) : f.slug,
                    }));
                  }}
                  required
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                  URL Slug
                </label>
                <div className="flex items-center border border-border">
                  <span className="shrink-0 bg-[#f8fafc] px-3 py-3 text-xs text-muted">
                    /pages/
                  </span>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    required
                    placeholder="privacy-policy"
                    className="w-full px-3 py-3 font-mono text-sm outline-none focus:border-navy"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                Excerpt
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                placeholder="Short summary for listings and SEO"
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy"
              />
            </div>

            <MediaPicker
              value={form.featuredImageUrl || null}
              label="Featured image (optional hero banner)"
              onSelect={(media) =>
                setForm({
                  ...form,
                  featuredImageUrl: media.url,
                  featuredImageAlt: media.alt ?? form.title,
                })
              }
            />

            {form.featuredImageUrl && (
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Featured image alt text
                </label>
                <input
                  value={form.featuredImageAlt}
                  onChange={(e) =>
                    setForm({ ...form, featuredImageAlt: e.target.value })
                  }
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                Content
              </label>
              <RichTextEditor
                value={form.content}
                onChange={(content) => setForm({ ...form, content })}
              />
            </div>

            <div className="grid gap-5 border border-border bg-[#f8fafc] p-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                  SEO Title
                </label>
                <input
                  value={form.metaTitle}
                  onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  placeholder="Optional — defaults to page title"
                  className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-navy"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                  SEO Description
                </label>
                <textarea
                  value={form.metaDescription}
                  onChange={(e) =>
                    setForm({ ...form, metaDescription: e.target.value })
                  }
                  rows={2}
                  className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-navy"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm text-navy">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({ ...form, isPublished: e.target.checked })
                }
                className="h-4 w-4 accent-gold"
              />
              Publish immediately
            </label>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3 border-t border-border bg-white p-4 safe-bottom">
            {page && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex min-h-[48px] items-center justify-center gap-2 border border-red-200 px-4 text-xs font-semibold uppercase tracking-widest text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] flex-1 items-center justify-center border border-border text-xs font-semibold uppercase tracking-widest text-muted active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-gold text-xs font-bold uppercase tracking-widest text-white disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
