"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Calculator } from "lucide-react";
import { AIRPORT_LOCATIONS, POPULAR_DESTINATIONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface Vehicle {
  id: string;
  name: string;
  basePrice: number;
}

export interface AdminBookingFormData {
  id?: string;
  reference?: string;
  type: "PICKUP" | "DROPOFF";
  vehicleId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  flightNumber: string;
  passengerCount: number;
  luggageCount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests: string;
  paymentMethod: "CASH" | "MOBILE_MONEY" | "CARD" | "WHATSAPP";
  status: string;
  paymentStatus: string;
  quotedPrice?: number;
  distanceKm?: number;
  adminNotes: string;
}

interface AdminBookingFormProps {
  mode: "create" | "edit";
  initial?: AdminBookingFormData;
  vehicles: Vehicle[];
}

function toLocalInputValue(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function AdminBookingForm({ mode, initial, vehicles }: AdminBookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [error, setError] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [overridePrice, setOverridePrice] = useState(
    initial?.quotedPrice ? String(initial.quotedPrice) : ""
  );

  const [form, setForm] = useState({
    type: initial?.type ?? ("PICKUP" as const),
    vehicleId: initial?.vehicleId ?? vehicles[0]?.id ?? "",
    pickupLocation: initial?.pickupLocation ?? AIRPORT_LOCATIONS[2],
    dropoffLocation: initial?.dropoffLocation ?? POPULAR_DESTINATIONS[0],
    pickupDate: initial?.pickupDate
      ? toLocalInputValue(initial.pickupDate)
      : "",
    flightNumber: initial?.flightNumber ?? "",
    passengerCount: initial?.passengerCount ?? 1,
    luggageCount: initial?.luggageCount ?? 1,
    customerName: initial?.customerName ?? "",
    customerEmail: initial?.customerEmail ?? "",
    customerPhone: initial?.customerPhone ?? "",
    specialRequests: initial?.specialRequests ?? "",
    paymentMethod: initial?.paymentMethod ?? ("WHATSAPP" as const),
    status: initial?.status ?? (mode === "create" ? "CONFIRMED" : "PENDING"),
    paymentStatus: initial?.paymentStatus ?? "PENDING",
    adminNotes: initial?.adminNotes ?? "",
    sendNotification: mode === "create",
  });

  useEffect(() => {
    if (!form.vehicleId || !form.pickupLocation || !form.dropoffLocation) return;

    const controller = new AbortController();
    setPricingLoading(true);

    fetch("/api/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleId: form.vehicleId,
        pickupLocation: form.pickupLocation,
        dropoffLocation: form.dropoffLocation,
        passengerCount: form.passengerCount,
        type: form.type,
      }),
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.quotedPrice) setCalculatedPrice(data.quotedPrice);
      })
      .catch(() => {})
      .finally(() => setPricingLoading(false));

    return () => controller.abort();
  }, [
    form.vehicleId,
    form.pickupLocation,
    form.dropoffLocation,
    form.passengerCount,
    form.type,
  ]);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const pickupIso = new Date(form.pickupDate).toISOString();
    const quotedPrice = overridePrice
      ? parseFloat(overridePrice)
      : calculatedPrice ?? undefined;

    try {
      const { sendNotification, ...rest } = form;
      const payload = {
        ...rest,
        pickupDate: pickupIso,
        flightNumber: form.flightNumber || undefined,
        specialRequests: form.specialRequests || undefined,
        adminNotes: form.adminNotes || undefined,
        quotedPrice,
        ...(mode === "create" ? { sendNotification } : {}),
      };

      const res = await fetch(
        mode === "create" ? "/api/bookings" : `/api/bookings/${initial!.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to save booking");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save booking");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy";
  const labelClass =
    "mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to requests
          </Link>
          <h1 className="font-display mt-3 text-2xl font-bold text-navy sm:text-3xl">
            {mode === "create" ? "New Request" : `Edit ${initial?.reference}`}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {mode === "create"
              ? "Create a ship agency enquiry for phone, walk-in, or corporate clients"
              : "Update request details, status, and internal notes"}
          </p>
        </div>
        {calculatedPrice !== null && (
          <div className="border border-gold/30 bg-gold/5 px-5 py-4 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Calculated fare
            </p>
            <p className="font-display text-2xl font-bold text-gold">
              {pricingLoading ? "…" : formatCurrency(calculatedPrice)}
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <section className="border border-border bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-navy">Request details</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Request type</label>
            <select
              value={form.type}
              onChange={(e) =>
                updateField("type", e.target.value as "PICKUP" | "DROPOFF")
              }
              className={fieldClass}
            >
              <option value="PICKUP">Port Supply Inbound</option>
              <option value="DROPOFF">Port Supply Outbound</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Vehicle</label>
            <select
              value={form.vehicleId}
              onChange={(e) => updateField("vehicleId", e.target.value)}
              required
              className={fieldClass}
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} — from {formatCurrency(v.basePrice)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>From location</label>
            <input
              list="pickup-locations"
              value={form.pickupLocation}
              onChange={(e) => updateField("pickupLocation", e.target.value)}
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>To location</label>
            <input
              list="dropoff-locations"
              value={form.dropoffLocation}
              onChange={(e) => updateField("dropoffLocation", e.target.value)}
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Service date & time</label>
            <input
              type="datetime-local"
              value={form.pickupDate}
              onChange={(e) => updateField("pickupDate", e.target.value)}
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Vessel / voyage reference</label>
            <input
              value={form.flightNumber}
              onChange={(e) => updateField("flightNumber", e.target.value)}
              placeholder="Optional — e.g. IMO / voyage no."
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Crew / recipients</label>
            <input
              type="number"
              min={1}
              max={14}
              value={form.passengerCount}
              onChange={(e) =>
                updateField("passengerCount", Number(e.target.value))
              }
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cargo units</label>
            <input
              type="number"
              min={0}
              max={20}
              value={form.luggageCount}
              onChange={(e) =>
                updateField("luggageCount", Number(e.target.value))
              }
              className={fieldClass}
            />
          </div>
        </div>
        <datalist id="pickup-locations">
          {[...AIRPORT_LOCATIONS, ...POPULAR_DESTINATIONS].map((loc) => (
            <option key={loc} value={loc} />
          ))}
        </datalist>
        <datalist id="dropoff-locations">
          {[...AIRPORT_LOCATIONS, ...POPULAR_DESTINATIONS].map((loc) => (
            <option key={loc} value={loc} />
          ))}
        </datalist>
      </section>

      <section className="border border-border bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-navy">Customer</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Full name</label>
            <input
              value={form.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={form.customerEmail}
              onChange={(e) => updateField("customerEmail", e.target.value)}
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              value={form.customerPhone}
              onChange={(e) => updateField("customerPhone", e.target.value)}
              required
              className={fieldClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Special requests</label>
            <textarea
              value={form.specialRequests}
              onChange={(e) => updateField("specialRequests", e.target.value)}
              rows={3}
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      <section className="border border-border bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-navy">
          Status & payment
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={labelClass}>Request status</label>
            <select
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              className={fieldClass}
            >
              {[
                "PENDING",
                "CONFIRMED",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED",
              ].map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Payment status</label>
            <select
              value={form.paymentStatus}
              onChange={(e) => updateField("paymentStatus", e.target.value)}
              className={fieldClass}
            >
              {["PENDING", "PAID", "FAILED", "REFUNDED"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Payment method</label>
            <select
              value={form.paymentMethod}
              onChange={(e) =>
                updateField(
                  "paymentMethod",
                  e.target.value as typeof form.paymentMethod
                )
              }
              className={fieldClass}
            >
              {["WHATSAPP", "CARD", "CASH", "MOBILE_MONEY"].map((m) => (
                <option key={m} value={m}>
                  {m.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              <Calculator className="mr-1 inline h-3 w-3" />
              Quote override (GHS)
            </label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={overridePrice}
              onChange={(e) => setOverridePrice(e.target.value)}
              placeholder={
                calculatedPrice !== null
                  ? String(calculatedPrice)
                  : "Uses calculated fare"
              }
              className={fieldClass}
            />
          </div>
        </div>
        <div className="mt-5">
          <label className={labelClass}>Admin notes (internal only)</label>
          <textarea
            value={form.adminNotes}
            onChange={(e) => updateField("adminNotes", e.target.value)}
            rows={3}
              placeholder="Fulfilment handling, vessel notes, payment notes…"
            className={fieldClass}
          />
        </div>
        {mode === "create" && (
          <label className="mt-5 flex items-center gap-3 text-sm text-navy">
            <input
              type="checkbox"
              checked={form.sendNotification}
              onChange={(e) => updateField("sendNotification", e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            Send confirmation email to requester
          </label>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin"
          className="flex min-h-[48px] flex-1 items-center justify-center border border-border bg-white text-xs font-semibold uppercase tracking-widest text-muted sm:flex-none sm:px-8"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-gold px-8 text-xs font-bold uppercase tracking-widest text-white disabled:opacity-50 sm:flex-none"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Request" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
