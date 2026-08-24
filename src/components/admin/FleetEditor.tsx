"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Loader2, X, Trash2 } from "lucide-react";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { formatCurrency } from "@/lib/utils";

interface VehicleRow {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  capacity: number;
  basePrice: number;
  pricePerKm: number;
  isActive: boolean;
  sortOrder: number;
}

interface FleetEditorProps {
  mode: "create" | "edit";
  vehicle?: VehicleRow;
}

function slugifyId(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function FleetEditor({ mode, vehicle }: FleetEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    id: vehicle?.id ?? "",
    name: vehicle?.name ?? "",
    description: vehicle?.description ?? "",
    imageUrl: vehicle?.imageUrl ?? "",
    capacity: vehicle?.capacity ?? 3,
    basePrice: vehicle?.basePrice ?? 150,
    pricePerKm: vehicle?.pricePerKm ?? 8,
    isActive: vehicle?.isActive ?? true,
    sortOrder: vehicle?.sortOrder ?? 0,
  });

  useScrollLock(open);

  function openEditor() {
    setError("");
    setForm({
      id: vehicle?.id ?? "",
      name: vehicle?.name ?? "",
      description: vehicle?.description ?? "",
      imageUrl: vehicle?.imageUrl ?? "",
      capacity: vehicle?.capacity ?? 3,
      basePrice: vehicle?.basePrice ?? 150,
      pricePerKm: vehicle?.pricePerKm ?? 8,
      isActive: vehicle?.isActive ?? true,
      sortOrder: vehicle?.sortOrder ?? 0,
    });
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        description: form.description || null,
        imageUrl: form.imageUrl || null,
      };

      const res = await fetch("/api/vehicles", {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "create"
            ? payload
            : (() => {
                const { id: _id, ...rest } = payload;
                return { id: vehicle!.id, ...rest };
              })()
        ),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save vehicle");
      }

      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save vehicle");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!vehicle || !confirm(`Remove ${vehicle.name}?`)) return;
    setLoading(true);
    await fetch(`/api/vehicles?id=${vehicle.id}`, { method: "DELETE" });
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
            <Plus className="h-4 w-4" /> Add Vehicle
          </>
        ) : (
          <Pencil className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/50 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl safe-bottom sm:rounded-none">
        <div className="flex items-center justify-between border-b border-border bg-navy px-6 py-4">
          <h3 className="font-display text-lg font-bold text-white">
            {mode === "create" ? "Add Vehicle" : "Edit Vehicle"}
          </h3>
          <button type="button" onClick={() => setOpen(false)} className="text-white/70">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto p-6">
          {error && (
            <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {mode === "create" && (
            <div>
              <label className={labelClass}>Vehicle ID</label>
              <input
                value={form.id}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((f) => ({
                    ...f,
                    id: name,
                    name: f.name || name.replace(/-/g, " "),
                  }));
                }}
                required
                placeholder="executive-sedan"
                className={`${fieldClass} font-mono`}
              />
            </div>
          )}

          <div>
            <label className={labelClass}>Name</label>
            <input
              value={form.name}
              onChange={(e) => {
                const name = e.target.value;
                setForm((f) => ({
                  ...f,
                  name,
                  id: mode === "create" && !f.id ? slugifyId(name) : f.id,
                }));
              }}
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className={fieldClass}
            />
          </div>

          <MediaPicker
            value={form.imageUrl}
            label="Vehicle image"
            onSelect={(media) => setForm({ ...form, imageUrl: media.url })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Capacity</label>
              <input
                type="number"
                min={1}
                max={20}
                value={form.capacity}
                onChange={(e) =>
                  setForm({ ...form, capacity: Number(e.target.value) })
                }
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>Sort order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: Number(e.target.value) })
                }
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>Base price (GHS)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.basePrice}
                onChange={(e) =>
                  setForm({ ...form, basePrice: Number(e.target.value) })
                }
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass}>Price per km (GHS)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.pricePerKm}
                onChange={(e) =>
                  setForm({ ...form, pricePerKm: Number(e.target.value) })
                }
                className={fieldClass}
              />
            </div>
          </div>

          <p className="text-xs text-muted">
            Sample fare from base: {formatCurrency(form.basePrice)}
          </p>

          <label className="flex items-center gap-3 text-sm text-navy">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="h-4 w-4 accent-gold"
            />
            Active on website
          </label>

          <div className="flex flex-wrap gap-3 border-t border-border pt-4">
            {vehicle && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 border border-red-200 px-4 py-3 text-xs font-semibold uppercase text-red-600"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 border border-border py-3 text-xs font-semibold uppercase text-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 bg-gold py-3 text-xs font-bold uppercase text-white disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function FleetVehicleCard({ vehicle }: { vehicle: VehicleRow }) {
  return (
    <div className="flex flex-col border border-border bg-white shadow-sm sm:flex-row">
      <div className="relative aspect-[16/10] shrink-0 bg-navy sm:w-48">
        {vehicle.imageUrl ? (
          <Image
            src={vehicle.imageUrl}
            alt={vehicle.name}
            fill
            className="object-cover"
            sizes="192px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/40">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold text-navy">{vehicle.name}</h3>
            {!vehicle.isActive && (
              <span className="border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-600">
                Inactive
              </span>
            )}
          </div>
          <p className="mt-1 font-mono text-xs text-muted">{vehicle.id}</p>
          {vehicle.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted">{vehicle.description}</p>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-xl font-bold text-gold">
              {formatCurrency(vehicle.basePrice)}
            </p>
            <p className="text-xs text-muted">
              + {formatCurrency(vehicle.pricePerKm)}/km · {vehicle.capacity} passengers
            </p>
          </div>
          <FleetEditor
            mode="edit"
            vehicle={vehicle}
          />
        </div>
      </div>
    </div>
  );
}
