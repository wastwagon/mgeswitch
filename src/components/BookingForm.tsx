"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  Plane,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Loader2,
  CheckCircle2,
  Luggage,
  Minus,
  Plus,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Shield,
  MessageCircle,
  Banknote,
  Users,
  Receipt,
} from "lucide-react";
import { VehicleSelector } from "./VehicleCard";
import { WhatsAppButton } from "./WhatsAppButton";
import { AIRPORT_LOCATIONS, POPULAR_DESTINATIONS } from "@/lib/constants";
import { cn, formatCurrency, buildWhatsAppUrl } from "@/lib/utils";
import {
  openPaystackCheckout,
  isPaystackEnabled,
} from "@/lib/paystack-client";

const bookingFormSchema = z.object({
  type: z.enum(["PICKUP", "DROPOFF"]),
  vehicleId: z.string().min(1, "Select a vehicle"),
  pickupLocation: z.string().min(3, "Enter pickup location"),
  dropoffLocation: z.string().min(3, "Enter dropoff location"),
  pickupDate: z.string().min(1, "Select date and time"),
  flightNumber: z.string().optional(),
  passengerCount: z.number().int().min(1).max(14),
  luggageCount: z.number().int().min(0).max(20),
  customerName: z.string().min(2, "Enter your name"),
  customerEmail: z.string().email("Enter a valid email"),
  customerPhone: z.string().min(10, "Enter a valid phone number"),
  specialRequests: z.string().optional(),
  paymentMethod: z.enum(["CARD", "WHATSAPP", "CASH"]),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface PricingResult {
  quotedPrice: number;
  distanceKm: number;
}

const STEPS = [
  { id: 0, label: "Journey", desc: "Route & schedule" },
  { id: 1, label: "Vehicle", desc: "Select class" },
  { id: 2, label: "Details", desc: "Your information" },
  { id: 3, label: "Confirm", desc: "Pay & book" },
];

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    reference: string;
    price: number;
    paid?: boolean;
  } | null>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      type: "PICKUP",
      passengerCount: 1,
      luggageCount: 1,
      paymentMethod: "CARD",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const values = watch();
  const watched = watch([
    "type",
    "vehicleId",
    "pickupLocation",
    "dropoffLocation",
    "passengerCount",
  ]);

  useEffect(() => {
    const stored = sessionStorage.getItem("mgeswitch:prefill-destination");
    if (!stored) return;
    sessionStorage.removeItem("mgeswitch:prefill-destination");
    const type = watch("type");
    if (type === "PICKUP") {
      setValue("dropoffLocation", stored);
    } else {
      setValue("pickupLocation", stored);
    }
  }, [setValue, watch]);

  useEffect(() => {
    function onPrefill(e: Event) {
      const destination = (e as CustomEvent<string>).detail;
      if (values.type === "PICKUP") {
        setValue("dropoffLocation", destination);
      } else {
        setValue("pickupLocation", destination);
      }
    }
    window.addEventListener("mgeswitch:prefill-destination", onPrefill);
    return () =>
      window.removeEventListener("mgeswitch:prefill-destination", onPrefill);
  }, [values.type, setValue]);

  useEffect(() => {
    const [type, vehicleId, pickupLocation, dropoffLocation, passengerCount] =
      watched;
    if (!vehicleId || !pickupLocation || !dropoffLocation) {
      setPricing(null);
      return;
    }
    const timer = setTimeout(async () => {
      setPricingLoading(true);
      try {
        const res = await fetch("/api/pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            vehicleId,
            pickupLocation,
            dropoffLocation,
            passengerCount: Number(passengerCount) || 1,
          }),
        });
        if (res.ok) setPricing(await res.json());
      } finally {
        setPricingLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [watched]);

  function handleTypeChange(type: "PICKUP" | "DROPOFF") {
    setValue("type", type);
    const pickup = watch("pickupLocation");
    const dropoff = watch("dropoffLocation");
    if (type === "PICKUP" && !pickup.includes("Port")) {
      setValue("pickupLocation", AIRPORT_LOCATIONS[2]);
      if (!dropoff) setValue("dropoffLocation", POPULAR_DESTINATIONS[0]);
    } else if (type === "DROPOFF" && !dropoff.includes("Port")) {
      if (!pickup) setValue("pickupLocation", POPULAR_DESTINATIONS[0]);
      setValue("dropoffLocation", AIRPORT_LOCATIONS[2]);
    }
  }

  async function nextStep() {
    const fields: (keyof BookingFormData)[][] = [
      ["type", "pickupLocation", "dropoffLocation", "pickupDate", "passengerCount"],
      ["vehicleId"],
      ["customerName", "customerEmail", "customerPhone"],
      ["paymentMethod"],
    ];
    const valid = await trigger(fields[step]);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  }

  async function submitPaystackBooking(data: BookingFormData) {
    const res = await fetch("/api/payments/paystack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        pickupDate: new Date(data.pickupDate).toISOString(),
      }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error ?? "Payment setup failed");
    openPaystackCheckout({
      email: data.customerEmail,
      amountGhs: result.amount,
      reference: result.paystackReference,
      accessCode: result.accessCode,
      onSuccess: async (reference) => {
        try {
          const verify = await fetch(
            `/api/payments/paystack?reference=${encodeURIComponent(reference)}`
          );
          const verified = await verify.json();
          if (verified.paid) {
            setSuccess({
              reference: result.bookingReference,
              price: result.amount,
              paid: true,
            });
          } else {
            alert(
              "Payment could not be verified. If you were charged, contact us with reference " +
                result.bookingReference
            );
          }
        } catch {
          alert(
            "Payment verification failed. Contact us with reference " +
              result.bookingReference
          );
        } finally {
          setSubmitting(false);
        }
      },
      onClose: () => setSubmitting(false),
    });
  }

  async function submitStandardBooking(data: BookingFormData) {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        pickupDate: new Date(data.pickupDate).toISOString(),
        paymentMethod: data.paymentMethod === "CASH" ? "CASH" : "WHATSAPP",
      }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error ?? "Booking failed");
    setSuccess({
      reference: result.booking.reference,
      price: Number(result.booking.quotedPrice),
    });
  }

  async function onSubmit(data: BookingFormData) {
    setSubmitting(true);
    try {
      if (data.paymentMethod === "CARD") {
        if (!isPaystackEnabled()) {
          alert("Paystack not configured. Choose WhatsApp or Cash.");
          setSubmitting(false);
          return;
        }
        await submitPaystackBooking(data);
        return;
      }
      await submitStandardBooking(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      if (watch("paymentMethod") !== "CARD") setSubmitting(false);
    }
  }

  if (success) {
    const whatsappMessage = `Hello MGE-SWITCH! Reference ${success.reference}\nPrice: ${formatCurrency(success.price)}${success.paid ? " (PAID)" : ""}`;
    return (
      <div className="overflow-hidden border border-border bg-white shadow-xl">
        <div className="gradient-navy px-8 py-10 text-center text-white">
          <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
          <h3 className="font-display mt-4 text-2xl font-bold">
            {success.paid ? "Confirmed & Paid" : "Reservation Received"}
          </h3>
          <p className="mt-2 font-mono text-sm text-gold">{success.reference}</p>
        </div>
        <div className="px-8 py-8 text-center">
          <p className="font-display text-4xl font-bold text-gold">
            {formatCurrency(success.price)}
          </p>
          <p className="mt-4 text-sm text-muted">
            Confirmation sent to your email. Our team will contact you with the next update.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {!success.paid && (
              <WhatsAppButton message={whatsappMessage} label="Confirm on WhatsApp" />
            )}
            <Link
              href="/booking/status"
              className="inline-block py-3 text-sm font-semibold text-navy underline"
            >
              Track your booking
            </Link>
            <button
              type="button"
              onClick={() => { setSuccess(null); setStep(0); }}
              className="text-sm text-muted"
            >
              New reservation
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allDestinations = [...AIRPORT_LOCATIONS, ...POPULAR_DESTINATIONS];

  return (
    <div className="grid gap-0 lg:grid-cols-5 lg:gap-0">
      {/* Form panel */}
      <form
        id="booking-form"
        onSubmit={handleSubmit(onSubmit)}
        className="lg:col-span-3 lg:border-r lg:border-border"
      >
        {/* Step indicator */}
        <div className="border-b border-border bg-[#fafbfc] px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className={cn(
                    "flex flex-col items-center gap-1 transition",
                    i <= step ? "opacity-100" : "opacity-40"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center text-xs font-bold sm:h-8 sm:w-8",
                      i === step
                        ? "bg-gold text-white"
                        : i < step
                          ? "bg-navy text-white"
                          : "bg-border text-muted"
                    )}
                  >
                    {i < step ? "✓" : i + 1}
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-wider text-navy sm:text-[9px]">
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "mx-1 h-px flex-1",
                      i < step ? "bg-gold" : "bg-border"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-8 pb-book-bar sm:px-8 lg:pb-8">
          {/* Step 0: Journey */}
          {step === 0 && (
            <div className="space-y-7 animate-in fade-in">
              <StepHeader
                title="Plan your journey"
                subtitle="Where and when should we meet you?"
              />

              <div className="grid grid-cols-2 gap-px bg-border p-px">
                {(["PICKUP", "DROPOFF"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTypeChange(type)}
                    className={cn(
                      "flex flex-col items-center gap-1 py-5 transition",
                      values.type === type
                        ? "bg-navy text-white"
                        : "bg-white text-navy hover:bg-light-blue-bg"
                    )}
                  >
                    <Plane className={cn("h-5 w-5", values.type === type ? "text-gold" : "text-muted")} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {type === "PICKUP" ? "Port Supply Inbound" : "Port Supply Outbound"}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative space-y-4">
                <div className="absolute left-[19px] top-10 bottom-10 w-px bg-gold/40" />
                <Field label="Pickup location" icon={MapPin} error={errors.pickupLocation?.message}>
                  <input
                    {...register("pickupLocation")}
                    list="pickup-locations"
                    placeholder="Where should we collect you?"
                    autoComplete="street-address"
                    className={inputPremium}
                  />
                </Field>
                <Field label="Destination" icon={MapPin} error={errors.dropoffLocation?.message}>
                  <input
                    {...register("dropoffLocation")}
                    list="dropoff-locations"
                    placeholder="Where are you headed?"
                    autoComplete="address-line1"
                    className={inputPremium}
                  />
                </Field>
              </div>
              <datalist id="pickup-locations">
                {allDestinations.map((loc) => <option key={loc} value={loc} />)}
              </datalist>
              <datalist id="dropoff-locations">
                {allDestinations.map((loc) => <option key={loc} value={loc} />)}
              </datalist>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Pickup date & time" icon={Calendar} error={errors.pickupDate?.message}>
                  <input type="datetime-local" {...register("pickupDate")} className={inputPremium} />
                </Field>
                <Field label="Flight number" icon={Plane} optional hint="For flight tracking">
                  <input {...register("flightNumber")} placeholder="e.g. KQ509" className={inputPremium} />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Passengers" error={errors.passengerCount?.message}>
                  <select {...register("passengerCount", { valueAsNumber: true })} className={inputPremium}>
                    {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                    ))}
                  </select>
                </Field>
                <div>
                  <label className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/60">
                    <Luggage className="h-3.5 w-3.5 text-gold" /> Luggage pieces
                  </label>
                  <div className="flex h-[52px] items-center border border-navy/15 bg-[#fafbfc]">
                    <button type="button" onClick={() => setValue("luggageCount", Math.max(0, values.luggageCount - 1))} className="flex h-full w-12 items-center justify-center text-navy hover:bg-white">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex-1 text-center font-display text-xl font-bold text-navy">{values.luggageCount}</span>
                    <button type="button" onClick={() => setValue("luggageCount", Math.min(20, values.luggageCount + 1))} className="flex h-full w-12 items-center justify-center text-navy hover:bg-white">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Vehicle */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <StepHeader
                title="Choose your vehicle"
                subtitle="Select the class of travel that suits your journey"
              />
              <VehicleSelector
                selectedId={values.vehicleId ?? ""}
                onSelect={(id) => setValue("vehicleId", id, { shouldValidate: true })}
              />
              {errors.vehicleId && (
                <p className="text-xs text-red-500">{errors.vehicleId.message}</p>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <StepHeader
                title="Passenger details"
                subtitle="Who should we contact about this reservation?"
              />
              <div className="space-y-5">
                <Field label="Full name" icon={User} error={errors.customerName?.message}>
                  <input {...register("customerName")} placeholder="As on booking" autoComplete="name" className={inputPremium} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Mobile number" icon={Phone} error={errors.customerPhone?.message}>
                    <input {...register("customerPhone")} placeholder="0550000000" autoComplete="tel" inputMode="tel" className={inputPremium} />
                  </Field>
                  <Field label="Email address" icon={Mail} error={errors.customerEmail?.message}>
                    <input type="email" {...register("customerEmail")} autoComplete="email" inputMode="email" className={inputPremium} />
                  </Field>
                </div>
                <Field label="Special requests" optional hint="Child seat, extra stops, corporate billing">
                  <textarea
                    {...register("specialRequests")}
                    rows={3}
                    placeholder="Tell us anything we should know…"
                    className={cn(inputPremium, "resize-none")}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <StepHeader
                title="Secure your reservation"
                subtitle="Choose how you'd like to pay"
              />
              <div className="space-y-3">
                {[
                  { value: "CARD" as const, label: "Pay Online", sub: "Visa · Mastercard · Mobile Money", icon: CreditCard },
                  { value: "WHATSAPP" as const, label: "WhatsApp", sub: "Reserve now, confirm & pay via chat", icon: MessageCircle },
                  { value: "CASH" as const, label: "Pay on Attendance", sub: "Settle locally after port attendance", icon: Banknote },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-4 border-2 p-5 transition",
                      values.paymentMethod === method.value
                        ? "border-gold bg-gold/5 shadow-[0_0_0_1px_rgba(201,162,39,0.3)]"
                        : "border-border hover:border-navy/20"
                    )}
                  >
                    <input type="radio" {...register("paymentMethod")} value={method.value} className="sr-only" />
                    <div className={cn(
                      "flex h-11 w-11 items-center justify-center",
                      values.paymentMethod === method.value ? "bg-gold text-white" : "bg-navy/5 text-navy"
                    )}>
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{method.label}</p>
                      <p className="text-xs text-muted">{method.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex items-start gap-3 border border-border bg-light-blue-bg/50 p-4">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <p className="text-xs leading-relaxed text-muted">
                  Your quote is fixed and guaranteed. Free cancellation up to 48 hours before service.
                  All prices include port access, fuel, and service handling.
                </p>
              </div>
            </div>
          )}

          {/* Navigation — desktop only; mobile uses sticky bar */}
          <div className="mt-10 hidden items-center justify-between border-t border-border pt-6 lg:flex">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 bg-navy px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-navy-dark"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || !pricing}
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : values.paymentMethod === "CARD" ? (
                  "Pay & Confirm"
                ) : (
                  "Confirm Reservation"
                )}
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Sticky summary — desktop */}
      <aside className="gradient-navy hidden lg:col-span-2 lg:block lg:sticky lg:top-24 lg:self-start">
        <div className="flex h-full flex-col p-6 lg:p-8">
          <div className="border-b border-white/15 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-gold">
                <Receipt className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  Your Quote
                </p>
                <p className="mt-1 text-sm text-white">Live fixed fare estimate</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-1 divide-y divide-white/10">
            <SummaryRow
              icon={MapPin}
              label="From"
              value={values.pickupLocation}
              placeholder="Enter pickup location"
            />
            <SummaryRow
              icon={MapPin}
              label="To"
              value={values.dropoffLocation}
              placeholder="Enter destination"
            />
            <SummaryRow
              icon={Calendar}
              label="When"
              value={
                values.pickupDate
                  ? new Date(values.pickupDate).toLocaleString("en-GH", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : undefined
              }
              placeholder="Select date & time"
            />
            {values.flightNumber && (
              <SummaryRow icon={Plane} label="Flight" value={values.flightNumber} />
            )}
            <SummaryRow
              icon={Users}
              label="Guests"
              value={`${values.passengerCount} guest${values.passengerCount !== 1 ? "s" : ""} · ${values.luggageCount} bag${values.luggageCount !== 1 ? "s" : ""}`}
            />
          </div>

          <div className="mt-8 border border-gold/40 bg-white/[0.06] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              Fixed fare
            </p>
            {pricingLoading ? (
              <div className="mt-4 flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-gold" />
                <p className="text-sm text-white">Calculating your fare…</p>
              </div>
            ) : pricing ? (
              <>
                <p className="font-display mt-3 text-4xl font-bold text-white sm:text-5xl">
                  {formatCurrency(pricing.quotedPrice)}
                </p>
                <p className="mt-2 text-sm text-white/90">
                  ≈ {pricing.distanceKm} km · fuel, tolls & gratuity included
                </p>
              </>
            ) : (
              <div className="mt-4 border border-dashed border-white/30 bg-white/[0.04] px-4 py-5">
                <p className="text-sm font-semibold text-white">
                  Awaiting journey details
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  Add your route and vehicle to unlock an instant, guaranteed fixed fare.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["All inclusive", "No surge pricing", "Free 48h cancellation"].map((tag) => (
              <span
                key={tag}
                className="border border-white/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="text-sm font-medium text-white">Need assistance?</p>
            <a
              href={buildWhatsAppUrl("Hi, I'd like help with a booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp our concierge
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile sticky fare + action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3 px-4 py-3 safe-bottom">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="touch-target flex shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <span className="w-11 shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            {pricingLoading ? (
              <p className="text-sm text-muted">Calculating fare…</p>
            ) : pricing ? (
              <>
                <p className="font-display text-xl font-bold text-gold">
                  {formatCurrency(pricing.quotedPrice)}
                </p>
                <p className="truncate text-[10px] text-muted">
                  Fixed fare · all inclusive
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-navy">Your quote</p>
                <p className="text-[10px] text-muted">Add route & vehicle</p>
              </>
            )}
          </div>
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex min-h-[44px] shrink-0 items-center gap-2 bg-navy px-5 text-xs font-bold uppercase tracking-widest text-white active:scale-[0.98]"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              form="booking-form"
              disabled={submitting || !pricing}
              className="flex min-h-[44px] shrink-0 items-center gap-2 bg-gold px-5 text-xs font-bold uppercase tracking-widest text-white disabled:opacity-50 active:scale-[0.98]"
            >
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : values.paymentMethod === "CARD" ? (
                "Pay"
              ) : (
                "Confirm"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputPremium =
  "w-full border-0 border-b-2 border-navy/15 bg-transparent px-0 py-3.5 text-navy placeholder:text-muted/50 outline-none transition focus:border-gold focus:ring-0";

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-2">
      <h3 className="font-display text-2xl font-bold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  placeholder,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  placeholder?: string;
}) {
  const filled = Boolean(value?.trim());

  return (
    <div className="flex gap-3 py-4 first:pt-0 last:pb-0">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-gold/30 bg-gold/10">
        <Icon className="h-3.5 w-3.5 text-gold" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
          {label}
        </p>
        <p
          className={cn(
            "mt-1 text-sm leading-snug",
            filled ? "font-medium text-white" : "text-white/70 italic"
          )}
        >
          {filled ? value : placeholder}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  error,
  optional,
  hint,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/60">
        {Icon && <Icon className="h-3.5 w-3.5 text-gold" />}
        {label}
        {optional && <span className="normal-case text-muted/50">(optional)</span>}
      </label>
      {hint && <p className="mb-2 text-[11px] text-muted">{hint}</p>}
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
