"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { BRAND } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import "./brochure.css";

const CAPABILITIES = [
  {
    name: "Technical Ship Supply",
    image: IMAGES.fleet.sedan,
    capacity: "Premium supply support",
    description:
      "Engine-room consumables, deck items, tools, and technical products sourced with vessel specification in mind.",
  },
  {
    name: "Provisions & Welfare Stores",
    image: IMAGES.fleet.suv,
    capacity: "Crew-focused sourcing",
    description:
      "Food stores, toiletries, linens, and daily-use essentials selected to support hygiene, morale, and onboard comfort.",
  },
  {
    name: "Navigation, Safety & Specialty Items",
    image: IMAGES.fleet.van,
    capacity: "Operational readiness",
    description:
      "Nautical publications, mooring gear, lubricants, medical supplies, and safety items for demanding marine operations.",
  },
] as const;

export default function BrochurePage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") === "true") {
      setTimeout(() => window.print(), 800);
    }
  }, []);

  return (
    <div className="brochure">
      {/* Cover */}
      <section className="brochure-page brochure-cover">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          className="brochure-cover-image"
          priority
        />
        <div className="brochure-cover-overlay" />
        <div className="brochure-cover-content">
          <div className="brochure-logo">
            <Logo variant="light" />
          </div>
          <h1 className="brochure-cover-title">Marine Supply Capabilities</h1>
          <p className="brochure-cover-subtitle">
            Premium vessel support from Tema across West African ports
          </p>
          <p className="brochure-cover-meta">{BRAND.address} · {BRAND.phone}</p>
        </div>
      </section>

      {/* About */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">About Us</p>
        <h2 className="brochure-heading">A Ghanaian marine support partner with regional reach</h2>
        <p className="brochure-body">
          Ulfborg Rebooth is an indigenous Ghanaian marine and offshore supply
          company serving vessel operators with responsive coordination,
          quality-focused sourcing, and practical port support. Headquartered in
          Tema, we extend service across Takoradi, Lome, Cotonou, Apapa, and Monrovia.
        </p>
        <div className="brochure-stats">
          {[
            { v: "20+", l: "Years Exposure" },
            { v: "6", l: "Port Locations" },
            { v: "24/7", l: "Response Mindset" },
            { v: "100%", l: "Client Focus" },
          ].map((s) => (
            <div key={s.l} className="brochure-stat">
              <strong>{s.v}</strong>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">What We Supply</p>
        <h2 className="brochure-heading">Core service lines</h2>
        <div className="brochure-fleet">
          {CAPABILITIES.map((v) => (
            <div key={v.name} className="brochure-fleet-item">
              <div className="brochure-fleet-image">
                <Image src={v.image} alt={v.name} fill className="object-cover" />
              </div>
              <h3>{v.name}</h3>
              <p className="brochure-fleet-cap">{v.capacity}</p>
              <p className="brochure-body">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">Operational Scope</p>
        <h2 className="brochure-heading">Tailored for vessels and offshore teams</h2>
        <div className="brochure-services">
          {[
            {
              t: "Vessel Turnaround Support",
              d: "Urgent and planned sourcing coordinated around the realities of port windows, launch schedules, and onboard operational pressure.",
            },
            {
              t: "Crew Welfare & Safety",
              d: "Store selection shaped around comfort, hygiene, safety, and health so crews remain properly supported throughout the voyage.",
            },
            {
              t: "Regional Port Continuity",
              d: "A single partner with Ghana roots and West African reach, helping operators maintain a dependable standard across multiple calls.",
            },
          ].map((s) => (
            <div key={s.t} className="brochure-service">
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="brochure-page brochure-contact">
        <p className="brochure-eyebrow">Contact</p>
        <h2 className="brochure-heading">Begin the conversation</h2>
        <div className="brochure-contact-grid">
          <div>
            <strong>Phone</strong>
            <p>{BRAND.phone}</p>
          </div>
          <div>
            <strong>Email</strong>
            <p>{BRAND.email}</p>
          </div>
          <div>
            <strong>WhatsApp</strong>
            <p>+{BRAND.whatsapp}</p>
          </div>
          <div>
            <strong>Address</strong>
            <p>{BRAND.address}</p>
          </div>
        </div>
        <p className="brochure-footer-note">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          Marine supply · Offshore support · West African port coverage.
        </p>
      </section>

      <div className="brochure-print-bar no-print">
        <button type="button" onClick={() => window.print()} className="brochure-print-btn">
          Save as PDF / Print
        </button>
      </div>
    </div>
  );
}
