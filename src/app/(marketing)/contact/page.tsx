import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getBrandConfig } from "@/lib/brand";
import { createMetadata } from "@/lib/metadata";
import { buildWhatsAppUrl } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

const offices = [
  {
    name: "Tema Port — Ghana",
    address: "Exact address coming soon",
    email: "ops@mge-switch.com",
    phone: "+233 000 000 000",
  },
  {
    name: "Takoradi Port — Ghana",
    address: "Exact address coming soon",
    email: "ops.takoradi@mge-switch.com",
    phone: "+233 000 000 000",
  },
  {
    name: "Lome Port — Togo",
    address: "Exact address coming soon",
    email: "ops.lome@mge-switch.com",
    phone: "+233 000 000 000",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandConfig();
  return createMetadata({
    title: "Contact",
    description: `Contact ${brand.name} for ship agency, husbandry, crew change, and protective agency support in Tema, Takoradi, and Lome.`,
    openGraph: {
      title: `Contact Us | ${brand.name}`,
      description: `Call ${brand.phone} or WhatsApp our team for vessel agency and port-call appointments.`,
      images: [{ url: IMAGES.og, width: 1200, height: 630, alt: `Contact ${brand.name}` }],
    },
  });
}

export default async function ContactPage() {
  const brand = await getBrandConfig();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with a ship agency team that understands urgency"
        description="Reach MGE-SWITCH for appointments in Tema, Takoradi, and Lome — agency, husbandry, crew change, spares, and protective cover."
        image={IMAGES.meetGreet}
        imageAlt={`Contact ${brand.name}`}
        minHeight="min-h-[42vh]"
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Get in touch
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-navy">
              Direct access to our operations network
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Whether you need urgent technical stores, fresh provisions,
              nautical publications, lubricants, ropes, or welfare items, our
              team responds with practical guidance and clear communication.
            </p>

            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Headquarters
                  </p>
                  <p className="mt-1 font-medium text-navy">{brand.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Phone
                  </p>
                  <a
                    href={`tel:${brand.phone}`}
                    className="mt-1 block font-medium text-navy hover:text-gold"
                  >
                    {brand.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-1 block font-medium text-navy hover:text-gold"
                  >
                    {brand.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    WhatsApp
                  </p>
                  <a
                    href={buildWhatsAppUrl(
                      "Hello MGE-SWITCH, I would like to discuss a vessel supply requirement.",
                      brand.whatsapp
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-medium text-navy hover:text-gold"
                  >
                    Chat with operations
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="border border-border bg-light-blue-bg/40 p-8 sm:p-10">
            <h3 className="font-display text-xl font-bold text-navy">
              Regional office points
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Use the branch details below when your request relates to a
              specific port call. Where numbers are still incomplete, the Tema
              office can coordinate the first response centrally.
            </p>
            <div className="mt-8 space-y-5">
              {offices.map((office) => (
                <div key={office.name} className="border border-border bg-white p-5">
                  <p className="text-sm font-semibold text-navy">{office.name}</p>
                  <p className="mt-2 text-sm text-muted">{office.address}</p>
                  <a href={`mailto:${office.email}`} className="mt-3 block text-sm text-navy hover:text-gold">
                    {office.email}
                  </a>
                  <p className="mt-1 text-sm text-muted">{office.phone}</p>
                </div>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/corporate"
                  className="inline-flex items-center justify-center bg-gold px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-gold-light hover:text-white"
                >
                  Send a formal enquiry
                </Link>
                <WhatsAppButton label="Message on WhatsApp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
