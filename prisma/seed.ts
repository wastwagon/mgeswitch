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
    where: { email: "admin@ulfborgrebooth.com" },
    update: {},
    create: {
      email: "admin@ulfborgrebooth.com",
      name: "Admin",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "+233 596 092 689",
    },
  });
  console.log("Admin user:", admin.email);

  const vehicles = [
    {
      id: "executive-sedan",
      name: "Technical Stores",
      description:
        "Engine-room consumables, tools, and vessel-ready technical products sourced with specification in mind.",
      imageUrl: "/images/ulfborg-lubricants.svg",
      capacity: 3,
      basePrice: 150,
      pricePerKm: 8,
      sortOrder: 1,
    },
    {
      id: "premium-suv",
      name: "Safety & Welfare",
      description:
        "Safety equipment, crew welfare items, and day-to-day support products for comfortable, compliant operations.",
      imageUrl: "/images/ulfborg-safety.svg",
      capacity: 5,
      basePrice: 220,
      pricePerKm: 10,
      sortOrder: 2,
    },
    {
      id: "luxury-van",
      name: "Navigation & Publications",
      description:
        "Nautical publications, charts, and specialty navigation support for bridge teams and vessel operators.",
      imageUrl: "/images/ulfborg-nautical.svg",
      capacity: 10,
      basePrice: 350,
      pricePerKm: 12,
      sortOrder: 3,
    },
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: vehicle.id },
      update: {},
      create: vehicle,
    });
  }
  console.log("Vehicles seeded");

  const cmsPages = [
    {
      slug: "about",
      title: "About Ulfborg Rebooth",
      excerpt: "A Ghanaian marine and offshore supply partner with West African reach.",
      content:
        "<h2>Our mission</h2><p>Ulfborg Rebooth delivers premium marine and offshore support through dependable sourcing, responsive coordination, and vessel-focused service across West African ports.</p><h2>Headquarters</h2><p>We are headquartered at the Heavy Industrial Area Enclave, Tema, Ghana.</p>",
      metaTitle: "About Ulfborg Rebooth",
      metaDescription:
        "Learn about Ulfborg Rebooth and our marine supply support network across West Africa.",
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      excerpt: "How Ulfborg Rebooth collects, uses, and protects your personal data.",
      content:
        "<h2>Information we collect</h2><p>When you submit an enquiry or contact our team, we collect your name, email, phone number, company details, and request information necessary to respond effectively.</p><h2>How we use your data</h2><ul><li>To review and respond to enquiries</li><li>To coordinate service delivery and support</li><li>To improve our operational communication</li></ul><h2>Data retention</h2><p>Enquiry records are retained for operational and legal purposes. You may request deletion of non-essential data by contacting us.</p>",
      metaTitle: "Privacy Policy | Ulfborg Rebooth",
      metaDescription: "Privacy policy for Ulfborg Rebooth marine supply enquiries.",
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      excerpt: "Terms and conditions for Ulfborg Rebooth enquiries and service delivery.",
      content:
        "<h2>Enquiries and Supply</h2><p>All service requests are subject to product availability, vessel timing, and confirmed delivery details. Quotations and commitments are based on the final agreed scope.</p><h2>Changes</h2><p>Amendments to timing, specification, or quantities may affect availability and pricing. We encourage clients to communicate updates promptly.</p><h2>Safety and Compliance</h2><p>We reserve the right to decline requests that conflict with operational safety, compliance requirements, or lawful trade practice.</p>",
      metaTitle: "Terms of Service | Ulfborg Rebooth",
      metaDescription: "Terms and conditions for Ulfborg Rebooth marine supply services.",
    },
  ];

  for (const page of cmsPages) {
    await prisma.cmsPage.upsert({
      where: { slug: page.slug },
      update: {},
      create: { ...page, isPublished: true },
    });
  }
  console.log("CMS pages seeded");

  for (const post of RAW_BLOG_POSTS) {
    const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: new Date(post.publishedAt),
        readTime: post.readTime,
        imageUrl: image,
        imageAlt,
        sections: post.sections,
        isPublished: true,
      },
    });
  }
  console.log("Blog posts seeded");

  for (const [key, value] of Object.entries({
    site_name: "Ulfborg Rebooth",
    site_tagline: "Premium Marine & Offshore Supply Solutions",
    contact_phone: "+233 596 092 689",
    contact_whatsapp: "233596092689",
    contact_email: "team.tema@ulfborgrebooth.com",
    contact_address: "Heavy Industrial Area Enclave, Tema, Ghana",
    seo_default_description:
      "Ulfborg Rebooth is a Ghanaian marine and offshore supply firm supporting vessels with provisions, technical stores, lubricants, nautical publications, and responsive West African port coverage.",
    seo_og_image: "/images/ulfborg-og.svg",
    maintenance_mode: "false",
  })) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log("Site settings seeded");

  console.log("Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
