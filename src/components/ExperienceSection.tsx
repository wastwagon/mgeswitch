import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

export function ExperienceSection() {
  return (
    <section id="experience" className="overflow-hidden bg-navy">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-[400px] lg:min-h-[600px]">
          <Image
            src={IMAGES.meetGreet}
            alt="Ship agency attendance during a commercial port call"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-navy/20 lg:bg-transparent" />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Port Attendance
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Prepared with care.
            <br />
            Attended with urgency.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75">
            Every call is shaped around operational readiness: clear formalities,
            crew and spares coordination, responsive communication, and a service
            approach built to protect vessel turnaround in Tema, Takoradi, and
            Lome.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Agency attendance organised around ETA/ETD",
              "Crew, spares, and husbandry sequenced as one plan",
              "Oil and gas upstream support through Takoradi and Tema",
              "Focused coverage in Tema, Takoradi, and Lome",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-white/85"
              >
                <span className="h-px w-6 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/experience"
            className="mt-10 inline-flex w-fit border border-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-gold transition hover:bg-gold hover:text-white"
          >
            View The Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
