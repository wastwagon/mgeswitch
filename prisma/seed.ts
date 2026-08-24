import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { RAW_BLOG_POSTS } from "../src/lib/blog";
import { getBlogImageMeta } from "../src/lib/blog-images";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mge-switch.com" },
    update: { phone: "+233 000 000 000" },
    create: {
      email: "admin@mge-switch.com",
      name: "Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "+233 000 000 000",
    },
  });
  console.log("Admin user:", admin.email);

  const vehicles = [
    {
      id: "executive-sedan",
      name: "Ship Agency & Husbandry",
      description:
        "ETA/ETD, port stay, documentation, and local representation for owners, charterers, and operators.",
      imageUrl: "/images/services/ship-agency.png",
      capacity: 3,
      basePrice: 150,
      pricePerKm: 8,
      sortOrder: 1,
    },
    {
      id: "premium-suv",
      name: "Crew Change",
      description:
        "Visas, embarkation and disembarkation, air ticketing, hotels, and gangway logistics.",
      imageUrl: "/images/services/crew-change.png",
      capacity: 5,
      basePrice: 220,
      pricePerKm: 10,
      sortOrder: 2,
    },
    {
      id: "luxury-van",
      name: "Protective Agency & Spares",
      description:
        "Owner-focused protective attendance plus clearing and onboard delivery of ship spares.",
      imageUrl: "/images/services/protective-agency.png",
      capacity: 10,
      basePrice: 350,
      pricePerKm: 12,
      sortOrder: 3,
    },
  ];

  for (const vehicle of vehicles) {
    const { id, ...data } = vehicle;
    await prisma.vehicle.upsert({
      where: { id },
      update: data,
      create: vehicle,
    });
  }
  console.log("Vehicles seeded");

  const cmsPages = [
    {
      slug: "about",
      title: "About MGE-SWITCH",
      excerpt:
        "A Ghanaian-registered ship agency, husbandry, and oil and gas upstream partner covering Tema, Takoradi, and Lome.",
      content:
        "<h2>Our mission</h2><p>MGE-SWITCH is a Ghanaian-registered ship agency, husbandry, and oil and gas upstream services provider. We handle every aspect of the port call — arrivals, port operations, husbandry, crew, spares, surveys, and departure — so owners and operators keep one accountable local desk.</p><h2>Coverage</h2><p>Ground operations cover Tema and Takoradi, Ghana’s two principal ports, with allied coverage at Lome, West Africa’s key transit hub.</p>",
      metaTitle: "About MGE-SWITCH",
      metaDescription:
        "Learn about MGE-SWITCH — Ghanaian-registered ship agency, husbandry, and oil and gas upstream support in Tema, Takoradi, and Lome.",
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      excerpt: "How MGE-SWITCH collects, uses, and protects your personal data.",
      content:
        "<h2>Information we collect</h2><p>When you submit an enquiry or contact our team, we collect your name, email, phone number, company details, and request information necessary to respond effectively.</p><h2>How we use your data</h2><ul><li>To review and respond to enquiries</li><li>To coordinate service delivery and support</li><li>To improve our operational communication</li></ul><h2>Data retention</h2><p>Enquiry records are retained for operational and legal purposes. You may request deletion of non-essential data by contacting us.</p>",
      metaTitle: "Privacy Policy | MGE-SWITCH",
      metaDescription: "Privacy policy for MGE-SWITCH ship agency enquiries.",
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      excerpt: "Terms and conditions for MGE-SWITCH enquiries and service delivery.",
      content:
        "<h2>Enquiries and Appointments</h2><p>All service requests are subject to vessel timing, port conditions, and confirmed operational details. Quotations and commitments are based on the final agreed scope.</p><h2>Changes</h2><p>Amendments to timing or scope may affect availability. We encourage clients to communicate updates promptly.</p><h2>Safety and Compliance</h2><p>We reserve the right to decline requests that conflict with operational safety, compliance requirements, or lawful trade practice.</p>",
      metaTitle: "Terms of Service | MGE-SWITCH",
      metaDescription: "Terms and conditions for MGE-SWITCH ship agency services.",
    },
  ];

  for (const page of cmsPages) {
    await prisma.cmsPage.upsert({
      where: { slug: page.slug },
      update: page,
      create: { ...page, isPublished: true },
    });
  }
  console.log("CMS pages seeded");

  for (const post of RAW_BLOG_POSTS) {
    const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
    const data = {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      publishedAt: new Date(post.publishedAt),
      readTime: post.readTime,
      imageUrl: image,
      imageAlt,
      sections: post.sections,
      isPublished: true,
    };
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: data,
      create: { slug: post.slug, ...data },
    });
  }
  console.log("Blog posts seeded");

  for (const [key, value] of Object.entries({
    site_name: "MGE-SWITCH",
    site_tagline: "Ship Agency, Husbandry & Oil & Gas Upstream",
    contact_phone: "+233 000 000 000",
    contact_whatsapp: "233000000000",
    contact_email: "ops@mge-switch.com",
    contact_address: "Tema & Takoradi Ports, Ghana · Lome, Togo",
    seo_default_description:
      "MGE-SWITCH is a Ghanaian-registered ship agency, husbandry, and oil and gas upstream services provider. Ground operations cover Tema and Takoradi — Ghana’s two principal ports — with allied coverage at Lome, West Africa’s key transit hub.",
    seo_og_image: "/images/mge-switch-og.svg",
    maintenance_mode: "false",
  })) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log("Site settings seeded");

  console.log("Seed complete!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
