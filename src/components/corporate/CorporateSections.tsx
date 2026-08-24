"use client";

import { useState } from "react";
import {
  Download,
  Eye,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { CORPORATE_HONEYPOT_FIELD } from "@/lib/corporate-enquiry";
import { CORPORATE_CONTENT } from "@/lib/content";

export function CorporateEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [reference, setReference] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/corporate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setReference(result.reference ?? "");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("idle");
      alert("Something went wrong. Please contact us on WhatsApp.");
    }
  }

  if (status === "success") {
    return (
      <div className="border-l-4 border-gold py-6 pl-6">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
        <h3 className="font-display mt-4 text-xl font-bold text-navy">
          Enquiry Received
        </h3>
        <p className="mt-2 text-sm text-muted">
          Our operations team has received your request and will respond as quickly as possible.
        </p>
        {reference && (
          <p className="mt-3 font-mono text-sm font-semibold text-navy">
            Reference: {reference}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      <input
        type="text"
        name={CORPORATE_HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
            Company / Vessel Operator
          </label>
          <input
            name="company"
            required
            className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
          />
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
            Contact Person
          </label>
          <input
            name="contactName"
            required
            className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
          />
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
            Phone
          </label>
          <input
            name="phone"
            required
            className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
          />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
          Service Required
        </label>
        <select
          name="serviceType"
          required
          className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
        >
          <option value="">Select a service</option>
          <option value="technical">Technical & Engine Stores</option>
          <option value="provisions">Provisions / Welfare Stores</option>
          <option value="regional-support">Regional Port Support</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
          Requirements
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Share vessel name, port, ETA, required items, delivery window, and any special operational notes…"
          className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 bg-navy py-4 text-xs font-bold uppercase tracking-widest text-white disabled:opacity-50"
      >
        {status === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Submit Enquiry"
        )}
      </button>
    </form>
  );
}

export function BrochureDownload() {
  const { brochure } = CORPORATE_CONTENT;

  function handleDownload() {
    window.open("/corporate/brochure?print=true", "_blank");
  }

  return (
    <div className="border border-border bg-white p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
        {brochure.title}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {brochure.description}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
        >
          <Download className="h-4 w-4" />
          {brochure.cta}
        </button>
        <a
          href="/corporate/brochure"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-navy px-6 py-4 text-xs font-bold uppercase tracking-widest text-navy transition hover:bg-navy hover:text-white"
        >
          <Eye className="h-4 w-4" />
          {brochure.preview}
        </a>
      </div>
      <p className="mt-4 text-xs text-muted">
        Opens in a new tab — use your browser&apos;s Print → Save as PDF option.
      </p>
    </div>
  );
}
