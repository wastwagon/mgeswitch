"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";
import { MediaPicker } from "@/components/admin/MediaPicker";

const SECTIONS: {
  title: string;
  description: string;
  fields: { key: keyof SiteSettings; label: string; type?: "textarea" | "text" }[];
}[] = [
  {
    title: "General",
    description: "Site identity shown across the website and emails.",
    fields: [
      { key: "site_name", label: "Site name" },
      { key: "site_tagline", label: "Tagline" },
    ],
  },
  {
    title: "Contact",
    description: "Customer-facing contact details.",
    fields: [
      { key: "contact_phone", label: "Phone" },
      { key: "contact_whatsapp", label: "WhatsApp number (international format)" },
      { key: "contact_email", label: "Email" },
      { key: "contact_address", label: "Address", type: "textarea" },
    ],
  },
  {
    title: "SEO",
    description: "Default metadata when pages do not specify their own.",
    fields: [
      {
        key: "seo_default_description",
        label: "Default meta description",
        type: "textarea",
      },
    ],
  },
  {
    title: "Social",
    description: "Optional social profile URLs.",
    fields: [
      { key: "social_facebook", label: "Facebook URL" },
      { key: "social_instagram", label: "Instagram URL" },
      { key: "social_linkedin", label: "LinkedIn URL" },
    ],
  },
  {
    title: "Operations",
    description: "Booking and site behaviour.",
    fields: [
      { key: "booking_min_notice_hours", label: "Minimum booking notice (hours)" },
      { key: "maintenance_mode", label: "Maintenance mode (true/false)" },
      {
        key: "maintenance_message",
        label: "Maintenance message shown to visitors",
        type: "textarea",
      },
    ],
  },
];

export function SettingsForm() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Save failed");
      const updated = await res.json();
      setSettings(updated);
      setMessage("Settings saved successfully.");
    } catch {
      setMessage("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  const fieldClass =
    "w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy";
  const labelClass =
    "mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted";

  return (
    <form onSubmit={handleSave} className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          Website Settings
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage contact details, SEO defaults, and operational preferences
        </p>
      </div>

      {message && (
        <p
          className={`px-4 py-3 text-sm ${
            message.includes("Failed")
              ? "border border-red-200 bg-red-50 text-red-700"
              : "border border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {message}
        </p>
      )}

      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="border border-border bg-white p-6 shadow-sm"
        >
          <h2 className="font-display text-lg font-bold text-navy">
            {section.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{section.description}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div
                key={field.key}
                className={field.type === "textarea" ? "sm:col-span-2" : ""}
              >
                <label className={labelClass}>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    value={settings[field.key]}
                    onChange={(e) =>
                      setSettings({ ...settings, [field.key]: e.target.value })
                    }
                    rows={3}
                    className={fieldClass}
                  />
                ) : (
                  <input
                    value={settings[field.key]}
                    onChange={(e) =>
                      setSettings({ ...settings, [field.key]: e.target.value })
                    }
                    className={fieldClass}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="border border-border bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-navy">Social sharing image</h2>
        <p className="mt-1 text-sm text-muted">
          Default Open Graph image for social previews (1200×630 recommended)
        </p>
        <div className="mt-6">
          <MediaPicker
            label="OG image"
            value={settings.seo_og_image || null}
            onSelect={(media) =>
              setSettings({ ...settings, seo_og_image: media.url })
            }
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={saving}
        className="flex min-h-[48px] items-center justify-center gap-2 bg-gold px-8 text-xs font-bold uppercase tracking-widest text-white disabled:opacity-50"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        Save Settings
      </button>
    </form>
  );
}
