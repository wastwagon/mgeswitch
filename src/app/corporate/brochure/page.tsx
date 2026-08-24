"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { BRAND } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import "./brochure.css";

const CAPABILITIES = [
  {
    name: "Ship Agency & Husbandry",
    image: IMAGES.fleet.sedan,
    capacity: "Port-call representation",
    description:
      "ETA/ETD, port stay, documentation, visas, travel, accommodation, surveys, and P&I coordination.",
  },
  {
    name: "Crew Change & Spares",
    image: IMAGES.fleet.suv,
    capacity: "Joiners, leavers, and parts",
    description:
      "Crew rotations plus clearing and onboard delivery of ship spares, including supply-boat arrangements.",
  },
  {
    name: "Protective Agency",
    image: IMAGES.fleet.van,
    capacity: "Owner-focused attendance",
    description:
      "Independent protective representation that prioritises security and efficient vessel turnaround.",
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
          <h1 className="brochure-cover-title">Ship Agency Capabilities</h1>
          <p className="brochure-cover-subtitle">
            Ghanaian-registered ship agency, husbandry, and oil & gas upstream
            support — Tema, Takoradi, and Lome as West Africa’s key transit hub
          </p>
          <p className="brochure-cover-meta">{BRAND.address} · {BRAND.phone}</p>
        </div>
      </section>

      {/* About */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">About Us</p>
        <h2 className="brochure-heading">A Ghanaian ship agency with focused port coverage</h2>
        <p className="brochure-body">
          MGE-SWITCH is a Ghanaian-registered ship agency, husbandry, and oil
          and gas upstream services provider. Ground operations cover Tema and
          Takoradi — Ghana’s two principal ports — with allied coverage at Lome,
          West Africa’s key transit hub. We handle every aspect of the vessel
          port call: arrivals, port operations, husbandry, and departure.
        </p>
        <div className="brochure-stats">
          {[
            { v: "3", l: "Ports Covered" },
            { v: "24/7", l: "Operations Mindset" },
            { v: "100%", l: "Client Focus" },
            { v: "All", l: "Vessel Types" },
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
        <p className="brochure-eyebrow">What We Handle</p>
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

      {/* Energy corridor */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">Energy Corridor</p>
        <h2 className="brochure-heading">Oil & gas upstream, plus Lome as the transit hub</h2>
        <p className="brochure-body">
          Alongside conventional agency and husbandry, we support oil and gas
          upstream traffic through Takoradi and Tema — OSVs, tankers, and
          campaign vessels — with allied coverage at Lome, West Africa’s key
          transit hub. Owners keep one Ghanaian-registered desk across the
          corridor.
        </p>
        <div className="brochure-services">
          {[
            {
              t: "Takoradi",
              d: "Western energy and project hub — agency, crew rotations, stores, and protective attendance for offshore-related calls.",
            },
            {
              t: "Tema",
              d: "Eastern commercial gateway — liner, tanker, project, and energy-related port calls with full husbandry cover.",
            },
            {
              t: "Lome",
              d: "Regional transit and transhipment option, coordinated from the same operations channel as Ghana.",
            },
          ].map((s) => (
            <div key={s.t} className="brochure-service">
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="brochure-page">
        <p className="brochure-eyebrow">Operational Scope</p>
        <h2 className="brochure-heading">Built around real port calls</h2>
        <div className="brochure-services">
          {[
            {
              t: "Agency & Husbandry",
              d: "Documentation, port stay, visas, travel, hotels, surveys, and P&I coordination sequenced around ETA/ETD.",
            },
            {
              t: "Crew Change & Spares",
              d: "Joiners and leavers handled with immigration and logistics, plus clearing and onboard delivery of ship spares.",
            },
            {
              t: "Protective Attendance",
              d: "Owner-focused representation that keeps turnaround secure, efficient, and independently reported.",
            },
            {
              t: "Oil & Gas Upstream",
              d: "Ground support for OSVs, tankers, and campaign traffic through Takoradi and Tema, with Lome as the regional transit option.",
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
          Ship agency · Husbandry · Oil & gas upstream · Tema · Takoradi · Lome.
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
