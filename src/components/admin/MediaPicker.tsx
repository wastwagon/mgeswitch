"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, ImageIcon, Loader2, Search, Upload, X } from "lucide-react";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { cn } from "@/lib/utils";

export interface MediaItem {
  id: string;
  url: string;
  originalName: string;
  alt: string | null;
  mimeType: string;
}

interface MediaPickerProps {
  value?: string | null;
  onSelect: (media: MediaItem) => void;
  label?: string;
}

export function MediaPicker({ value, onSelect, label = "Featured image" }: MediaPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-3">
        {value ? (
          <div className="relative h-24 w-36 overflow-hidden border border-border bg-[#f8fafc]">
            <Image src={value} alt="" fill className="object-cover" sizes="144px" />
          </div>
        ) : (
          <div className="flex h-24 w-36 items-center justify-center border border-dashed border-border bg-[#f8fafc] text-muted">
            <ImageIcon className="h-8 w-8 opacity-40" />
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-[44px] border border-border px-4 text-xs font-semibold uppercase tracking-widest text-navy hover:border-gold hover:text-gold"
        >
          {value ? "Change image" : "Select from library"}
        </button>
      </div>
      {open && (
        <MediaPickerModal
          selectedUrl={value}
          onClose={() => setOpen(false)}
          onSelect={(item) => {
            onSelect(item);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function MediaPickerModal({
  selectedUrl,
  onClose,
  onSelect,
}: {
  selectedUrl?: string | null;
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useScrollLock(true);

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
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/media", { method: "POST", body: formData });
      if (res.ok) {
        await load(query);
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-navy/60 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl safe-bottom sm:rounded-none">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-display text-lg font-bold text-navy">Media Library</h3>
          <button type="button" onClick={onClose} className="text-muted hover:text-navy">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 border-b border-border px-6 py-4">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load(query)}
              placeholder="Search files…"
              className="w-full border border-border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-navy"
            />
          </div>
          <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 bg-navy px-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-navy-dark">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : items.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">
              No media yet. Upload your first image.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item)}
                  className={cn(
                    "group relative aspect-square overflow-hidden border-2 bg-[#f8fafc] text-left transition",
                    selectedUrl === item.url
                      ? "border-gold"
                      : "border-transparent hover:border-navy/30"
                  )}
                >
                  <Image
                    src={item.url}
                    alt={item.alt ?? item.originalName}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  {selectedUrl === item.url && (
                    <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 truncate bg-navy/80 px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                    {item.originalName}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
