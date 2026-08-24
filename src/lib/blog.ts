import { getBlogImageMeta } from "@/lib/blog-images";
import { prisma } from "@/lib/prisma";

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  contentHtml?: string | null;
}

function withImages<T extends Omit<BlogPost, "image" | "imageAlt">>(
  posts: readonly T[]
): BlogPost[] {
  return posts.map((post) => {
    const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
    return { ...post, image, imageAlt, sections: [...(post.sections ?? [])] };
  });
}

export const RAW_BLOG_POSTS = [
  {
    slug: "how-fast-vessel-supply-support-protects-turnaround",
    title: "How Fast Vessel Supply Support Protects Turnaround Time",
    excerpt:
      "A premium supply partner is measured not only by what it can source, but by how quickly it can coordinate the right response when schedules tighten.",
    category: "Operations",
    publishedAt: "2026-08-15",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Turnaround pressure is one of the defining realities of port operations. A delay in technical stores, welfare items, or urgent consumables can quickly affect the wider call plan and create avoidable operational strain.",
          "That is why vessel support should be approached as an execution discipline, not just a shopping exercise. Speed matters, but so do clarity, packaging, and reliable communication.",
        ],
      },
      {
        heading: "What strong turnaround support looks like",
        bullets: [
          "Rapid acknowledgement of the requirement",
          "Clear confirmation of product specification and availability",
          "Delivery planning aligned to the vessel's operational window",
          "A single point of contact who communicates proactively",
        ],
      },
      {
        heading: "Why responsiveness builds trust",
        paragraphs: [
          "Operators remember suppliers who reduce uncertainty. When a team responds early, confirms details accurately, and keeps execution calm, the supplier becomes part of the operational solution rather than another variable to manage.",
        ],
      },
    ],
  },
  {
    slug: "what-good-marine-provisioning-looks-like-in-west-africa",
    title: "What Good Marine Provisioning Looks Like in West Africa",
    excerpt:
      "High-quality provisioning is about more than quantity. It requires product care, consistency, and practical understanding of crew expectations onboard.",
    category: "Provisions",
    publishedAt: "2026-08-12",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Provisioning shapes morale as much as readiness. Fresh produce, frozen foods, dry goods, beverages, bakery items, and day-to-day essentials all contribute to a voyage that feels properly supported.",
        ],
      },
      {
        heading: "The difference between supply and premium supply",
        bullets: [
          "Attention to freshness and sourcing quality",
          "Careful product handling and practical packaging",
          "Awareness of dietary, cultural, and operational preferences",
          "Delivery arranged to suit the vessel's working rhythm",
        ],
      },
      {
        heading: "Why crew welfare matters",
        paragraphs: [
          "A vessel that is well supplied is easier to operate. Comfort items, toiletries, welfare consumables, and reliable food quality all help maintain onboard standards and reduce avoidable friction during long rotations.",
        ],
      },
    ],
  },
  {
    slug: "nautical-publications-and-why-bridge-teams-cannot-compromise",
    title: "Nautical Publications and Why Bridge Teams Cannot Compromise",
    excerpt:
      "Current charts and approved navigation publications remain central to safe planning and regulatory confidence, especially for teams moving across multiple routes.",
    category: "Navigation",
    publishedAt: "2026-08-09",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Bridge teams depend on current information. Whether the requirement is AVCS, ADP, or AENP access, publication readiness is a core operational need rather than an optional extra.",
        ],
      },
      {
        heading: "Why up-to-date references matter",
        bullets: [
          "Better voyage planning confidence",
          "Improved compliance readiness",
          "Reduced risk of outdated reference use",
          "Smoother preparation ahead of inspections and route changes",
        ],
      },
      {
        heading: "The supplier's role",
        paragraphs: [
          "A capable marine supplier should understand that navigation materials need the same urgency and attention as technical or welfare items. Reliable access and correct fulfilment are part of the premium service standard clients expect.",
        ],
      },
    ],
  },
  {
    slug: "choosing-lubricants-and-consumables-for-harsh-marine-environments",
    title: "Choosing Lubricants and Consumables for Harsh Marine Environments",
    excerpt:
      "Marine-grade oils, greases, and associated consumables play a quiet but critical role in sustaining machinery performance at sea.",
    category: "Technical Supply",
    publishedAt: "2026-08-05",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Harsh operating environments place constant demands on engines, hydraulics, compressors, and mechanical systems. The wrong lubricant choice can increase wear, shorten service life, and undermine reliability over time.",
        ],
      },
      {
        heading: "Categories that often require careful attention",
        bullets: [
          "Engine oils",
          "Hydraulic oils",
          "Transmission oils",
          "Brake fluids",
          "Compressor oils",
          "Marine greases",
        ],
      },
      {
        heading: "Why specification matters",
        paragraphs: [
          "Technical supply is strongest when the supplier respects vessel specification rather than improvising substitutions. Product suitability, documentation, and consistency are what turn a supply relationship into an operational asset.",
        ],
      },
    ],
  },
] satisfies Omit<BlogPost, "image" | "imageAlt">[];

type DbBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: Date;
  readTime: string;
  sections: unknown;
  contentHtml: string | null;
  isPublished?: boolean;
};

function mapDbPost(post: DbBlogPost): BlogPost {
  const { image, imageAlt } = getBlogImageMeta(post.slug, post.title);
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt.toISOString(),
    readTime: post.readTime,
    image,
    imageAlt,
    sections: Array.isArray(post.sections) ? (post.sections as BlogSection[]) : [],
    contentHtml: post.contentHtml,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
    if (dbPosts.length > 0) return dbPosts.map(mapDbPost);
  } catch {
    // Fall back to static content when the database is unavailable.
  }
  return withImages(RAW_BLOG_POSTS);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (post?.isPublished) return mapDbPost(post);
  } catch {
    // Ignore DB errors and use the static fallback.
  }
  const fallback = RAW_BLOG_POSTS.find((post) => post.slug === slug);
  return fallback ? withImages([fallback])[0] : null;
}

export async function getRelatedPosts(slug: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return posts.slice(0, 3);

  return posts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0;
      const bScore = b.category === current.category ? 1 : 0;
      if (aScore !== bScore) return bScore - aScore;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 3);
}
