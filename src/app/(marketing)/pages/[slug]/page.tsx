import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedCmsPage } from "@/lib/cms";
import { CmsHtmlContent } from "@/components/CmsHtmlContent";
import { createMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedCmsPage(slug);
  if (!page) return {};

  return createMetadata({
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? page.excerpt ?? undefined,
    openGraph: page.featuredImageUrl
      ? {
          images: [
            {
              url: page.featuredImageUrl,
              alt: page.featuredImageAlt ?? page.title,
            },
          ],
        }
      : undefined,
  });
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPublishedCmsPage(slug);

  if (!page) notFound();

  return (
    <>
      {page.featuredImageUrl ? (
        <section className="relative flex min-h-[45vh] items-end overflow-hidden">
          <Image
            src={page.featuredImageUrl}
            alt={page.featuredImageAlt ?? page.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/30" />
          <div className="relative mx-auto w-full max-w-3xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Ulfborg Rebooth
            </p>
            <h1 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">
              {page.title}
            </h1>
            {page.excerpt && (
              <p className="mt-4 text-base leading-relaxed text-white/80">
                {page.excerpt}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="gradient-navy py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Ulfborg Rebooth
            </p>
            <h1 className="font-display mt-4 text-4xl font-bold text-white sm:text-5xl">
              {page.title}
            </h1>
            {page.excerpt && (
              <p className="mt-4 text-base leading-relaxed text-white/75">
                {page.excerpt}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <CmsHtmlContent html={page.content} />
          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-widest text-gold hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
