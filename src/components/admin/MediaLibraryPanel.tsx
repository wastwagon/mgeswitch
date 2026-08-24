"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Copy,
  Loader2,
  Search,
  Trash2,
  Upload,
  Check,
  ImageIcon,
} from "lucide-react";
import type { MediaItem } from "@/components/admin/MediaPicker";

export function MediaLibraryPanel() {
  const router = useRouter();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (q = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/media${q ? `?q=${encodeURIComponent(q)}` : ""}`);
      setItems(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        await fetch("/api/media", { method: "POST", body: formData });
      }
      await load(query);
      router.refresh();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this file? It may break pages using it.")) return;
    setDeleting(id);
    try {
      await fetch(`/api/media/${id}`, { method: "DELETE" });
      await load(query);
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Media Library
          </h1>
          <p className="mt-1 text-sm text-muted">
            Upload and manage images used across the website, blog, and fleet
          </p>
        </div>
        <label className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 bg-gold px-5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-gold-light">
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Upload files
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load(query)}
          placeholder="Search by filename or alt text…"
          className="w-full border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-navy"
        />
      </div>

      <div className="border border-border bg-white p-4 shadow-sm sm:p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-light-blue" />
            <p className="mt-4 font-medium text-navy">No media uploaded yet</p>
            <p className="mt-1 text-sm text-muted">
              Drag and drop or click Upload to add images
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden border border-border bg-[#f8fafc]"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.url}
                    alt={item.alt ?? item.originalName}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
                <div className="space-y-2 p-3">
                  <p className="truncate text-xs font-medium text-navy">
                    {item.originalName}
                  </p>
                  <p className="truncate font-mono text-[10px] text-muted">{item.url}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => copyUrl(item.url)}
                      className="flex flex-1 items-center justify-center gap-1 border border-border py-2 text-[10px] font-semibold uppercase text-navy hover:border-gold"
                    >
                      {copied === item.url ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      Copy URL
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteItem(item.id)}
                      disabled={deleting === item.id}
                      className="flex min-w-[40px] items-center justify-center border border-red-200 py-2 text-red-600 hover:bg-red-50"
                      aria-label="Delete"
                    >
                      {deleting === item.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
