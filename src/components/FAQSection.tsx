"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FAQSection({ showHeader = true }: { showHeader?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-light-blue-bg/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          {showHeader ? (
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                FAQ
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold text-navy sm:text-4xl">
                Questions before you enquire
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Practical answers about our marine supply scope, vessel support
                categories, and West African port coverage.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "233596092689"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-semibold text-navy underline underline-offset-4"
              >
                Still have questions? WhatsApp us →
              </a>
            </div>
          ) : (
            <div className="lg:col-span-2">
              <p className="text-sm leading-relaxed text-muted">
                Can&apos;t find what you&apos;re looking for? Our operations team
                is available on WhatsApp for vessel supply and port-support
                questions.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "233596092689"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-navy underline underline-offset-4"
              >
                WhatsApp us →
              </a>
            </div>
          )}

          <div className="lg:col-span-3">
            <ul className="divide-y divide-border border border-border bg-white">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex min-h-[52px] w-full items-start justify-between gap-4 px-6 py-5 text-left active:bg-light-blue-bg/30"
                    >
                      <span className="font-semibold text-navy">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-0.5 h-5 w-5 shrink-0 text-gold transition",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-l-2 border-gold px-6 pb-5 pl-8 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
