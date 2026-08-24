"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Loader2, X, Trash2, ExternalLink } from "lucide-react";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import type { BlogSection } from "@/lib/blog";

interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string | null;
  imageAlt: string | null;
  imageMediaId: string | null;
  sections: BlogSection[];
  contentHtml: string | null;
  isPublished: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
}

interface BlogEditorProps {
  mode: "create" | "edit";
  post?: BlogPostRow;
}

const CATEGORIES = [
  "Ship Agency",
  "Crew Change",
  "Protective Agency",
  "Port Operations",
  "Husbandry",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function emptySection(): BlogSection {
  return { heading: "", paragraphs: [""], bullets: [] };
}

function toLocalDatetime(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function BlogEditor({ mode, post }: BlogEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState<"structured" | "rich">(
    post?.contentHtml ? "rich" : "structured"
  );
  const [form, setForm] = useState({
    slug: post?.slug ?? "",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    category: post?.category ?? CATEGORIES[0],
    publishedAt: post?.publishedAt
      ? toLocalDatetime(post.publishedAt)
      : toLocalDatetime(new Date().toISOString()),
    readTime: post?.readTime ?? "5 min read",
    imageUrl: post?.imageUrl ?? "",
    imageAlt: post?.imageAlt ?? "",
    imageMediaId: post?.imageMediaId ?? "",
    sections: post?.sections?.length ? post.sections : [emptySection()],
    contentHtml: post?.contentHtml ?? "",
    isPublished: post?.isPublished ?? true,
    metaTitle: post?.metaTitle ?? "",
    metaDescription: post?.metaDescription ?? "",
  });

  useScrollLock(open);

  function openEditor() {
    setError("");
    setEditMode(post?.contentHtml ? "rich" : "structured");
    setForm({
      slug: post?.slug ?? "",
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      category: post?.category ?? CATEGORIES[0],
      publishedAt: post?.publishedAt
        ? toLocalDatetime(post.publishedAt)
        : toLocalDatetime(new Date().toISOString()),
      readTime: post?.readTime ?? "5 min read",
      imageUrl: post?.imageUrl ?? "",
      imageAlt: post?.imageAlt ?? "",
      imageMediaId: post?.imageMediaId ?? "",
      sections: post?.sections?.length ? post.sections : [emptySection()],
      contentHtml: post?.contentHtml ?? "",
      isPublished: post?.isPublished ?? true,
      metaTitle: post?.metaTitle ?? "",
      metaDescription: post?.metaDescription ?? "",
    });
    setOpen(true);
  }

  function updateSection(index: number, patch: Partial<BlogSection>) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const sections =
        editMode === "rich"
          ? [{ paragraphs: [form.excerpt] }]
          : form.sections.map((s) => ({
              ...(s.heading ? { heading: s.heading } : {}),
              paragraphs: s.paragraphs?.filter(Boolean),
              bullets: s.bullets?.filter(Boolean),
            }));

      const payload = {
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt,
        category: form.category,
        publishedAt: new Date(form.publishedAt).toISOString(),
        readTime: form.readTime,
        imageUrl: form.imageUrl || null,
        imageAlt: form.imageAlt || null,
        imageMediaId: form.imageMediaId || null,
        sections,
        contentHtml: editMode === "rich" ? form.contentHtml || null : null,
        isPublished: form.isPublished,
        metaTitle: form.metaTitle || null,
        metaDescription: form.metaDescription || null,
      };

      const res = await fetch("/api/blog", {
        method: post ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post ? { id: post.id, ...payload } : payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save post");
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!post || !confirm(`Delete "${post.title}"?`)) return;
    setLoading(true);
    await fetch(`/api/blog?id=${post.id}`, { method: "DELETE" });
    setOpen(false);
    router.refresh();
    setLoading(false);
  }

  const fieldClass =
    "w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy";
  const labelClass =
    "mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted";

  if (!open) {
    return (
      <button
        type="button"
        onClick={openEditor}
        className={
          mode === "create"
            ? "inline-flex min-h-[44px] items-center gap-2 bg-navy px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white"
            : "flex min-h-[44px] min-w-[44px] items-center justify-center border border-border text-navy hover:border-gold hover:text-gold"
        }
      >
        {mode === "create" ? (
          <>
            <Plus className="h-4 w-4" /> New Post
          </>
        ) : (
          <Pencil className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/50 backdrop-blur-sm sm:items-start sm:p-4 sm:pt-8">
      <div className="flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl safe-bottom sm:max-h-[90vh] sm:rounded-none">
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-navy px-6 py-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              {mode === "create" ? "New Blog Post" : "Edit Blog Post"}
            </h3>
            {post?.isPublished && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="mt-1 inline-flex items-center gap-1 text-xs text-gold hover:underline"
              >
                View live <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
          <button type="button" onClick={() => setOpen(false)} className="text-white/70">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            {error && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      slug:
                        mode === "create" && !f.slug ? slugify(title) : f.slug,
                    }));
                  }}
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  required
                  className={`${fieldClass} font-mono`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                required
                rows={2}
                className={fieldClass}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={fieldClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Publish date</label>
                <input
                  type="datetime-local"
                  value={form.publishedAt}
                  onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Read time</label>
                <input
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                  className={fieldClass}
                />
              </div>
            </div>

            <MediaPicker
              value={form.imageUrl}
              onSelect={(media) =>
                setForm({
                  ...form,
                  imageUrl: media.url,
                  imageAlt: media.alt ?? form.title,
                  imageMediaId: media.id,
                })
              }
            />

            <div>
              <label className={labelClass}>Image alt text</label>
              <input
                value={form.imageAlt}
                onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                className={fieldClass}
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className={labelClass}>Article body</p>
                <div className="flex border border-border">
                  <button
                    type="button"
                    onClick={() => setEditMode("structured")}
                    className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-wider ${
                      editMode === "structured"
                        ? "bg-navy text-white"
                        : "bg-white text-muted"
                    }`}
                  >
                    Structured
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode("rich")}
                    className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-wider ${
                      editMode === "rich"
                        ? "bg-navy text-white"
                        : "bg-white text-muted"
                    }`}
                  >
                    Rich text
                  </button>
                </div>
              </div>

              {editMode === "rich" ? (
                <RichTextEditor
                  value={form.contentHtml || "<p></p>"}
                  onChange={(contentHtml) => setForm({ ...form, contentHtml })}
                  placeholder="Write your article with headings, lists, links…"
                />
              ) : (
                <>
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          sections: [...form.sections, emptySection()],
                        })
                      }
                      className="text-xs font-semibold uppercase tracking-widest text-gold"
                    >
                      + Add section
                    </button>
                  </div>
                  {form.sections.map((section, index) => (
                <div key={index} className="space-y-3 border border-border bg-[#f8fafc] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-navy">
                      Section {index + 1}
                    </span>
                    {form.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            sections: form.sections.filter((_, i) => i !== index),
                          })
                        }
                        className="text-xs text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    value={section.heading ?? ""}
                    onChange={(e) => updateSection(index, { heading: e.target.value })}
                    placeholder="Section heading (optional)"
                    className={fieldClass}
                  />
                  <textarea
                    value={(section.paragraphs ?? []).join("\n\n")}
                    onChange={(e) =>
                      updateSection(index, {
                        paragraphs: e.target.value.split("\n\n").filter(Boolean),
                      })
                    }
                    rows={4}
                    placeholder="Paragraphs — separate with a blank line"
                    className={fieldClass}
                  />
                  <textarea
                    value={(section.bullets ?? []).join("\n")}
                    onChange={(e) =>
                      updateSection(index, {
                        bullets: e.target.value.split("\n").filter(Boolean),
                      })
                    }
                    rows={3}
                    placeholder="Bullet points — one per line"
                    className={fieldClass}
                  />
                </div>
              ))}
                </>
              )}
            </div>

            <label className="flex items-center gap-3 text-sm text-navy">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="h-4 w-4 accent-gold"
              />
              Publish immediately
            </label>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3 border-t border-border p-4 safe-bottom">
            {post && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex min-h-[48px] items-center gap-2 border border-red-200 px-4 text-xs font-semibold uppercase text-red-600"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="min-h-[48px] flex-1 border border-border text-xs font-semibold uppercase text-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-gold text-xs font-bold uppercase text-white disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
