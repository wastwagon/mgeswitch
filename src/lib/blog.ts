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
    slug: "why-precise-port-agency-protects-vessel-turnaround",
    title: "Why Precise Port Agency Protects Vessel Turnaround",
    excerpt:
      "Effective agency is measured by how calmly ETA/ETD, formalities, and husbandry stay aligned when the call window tightens.",
    category: "Operations",
    publishedAt: "2026-08-15",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Port calls compress many moving parts into a short operational window. Documentation, husbandry, crew movements, and spare-part deliveries all compete for the same hours alongside.",
          "A precise agency partner reduces uncertainty. Clear acknowledgement, accurate formalities, and proactive communication keep turnaround disciplined rather than reactive.",
        ],
      },
      {
        heading: "What strong agency attendance looks like",
        bullets: [
          "Early confirmation of ETA/ETD and port requirements",
          "Legal documentation prepared before the vessel is alongside",
          "Husbandry needs sequenced around the operational plan",
          "One accountable contact who updates owners and operators promptly",
        ],
      },
      {
        heading: "Why owners remember the process",
        paragraphs: [
          "Operators remember the agencies that remove friction. When formalities move cleanly and logistics stay coordinated, the agency becomes part of the solution — not another variable to manage.",
        ],
      },
    ],
  },
  {
    slug: "crew-change-essentials-in-tema-takoradi-and-lome",
    title: "Crew Change Essentials in Tema, Takoradi, and Lome",
    excerpt:
      "Successful crew changes depend on visas, travel, accommodation, and embarkation timing working as one process — not separate errands.",
    category: "Crew Change",
    publishedAt: "2026-08-12",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Crew rotations fail when logistics are treated as afterthoughts. Joiners and leavers need immigration clarity, reliable transport, hotel readiness, and a controlled gangway plan.",
        ],
      },
      {
        heading: "What good crew-change support includes",
        bullets: [
          "Visa and immigration coordination",
          "Air ticketing aligned to the vessel window",
          "Hotel and local transfer arrangements",
          "Embarkation and disembarkation attendance",
        ],
      },
      {
        heading: "Regional reality",
        paragraphs: [
          "In Tema, Takoradi, and Lome, timing and local knowledge matter. An agency that anticipates port-side bottlenecks protects both crew welfare and sailing schedules.",
        ],
      },
    ],
  },
  {
    slug: "protective-agency-when-owners-need-independent-cover",
    title: "Protective Agency: When Owners Need Independent Cover",
    excerpt:
      "Protective agency prioritises security and efficiency — giving owners independent attendance when turnaround stakes are high.",
    category: "Protective Agency",
    publishedAt: "2026-08-09",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Protective agency is not a duplicate paperwork exercise. It is independent representation focused on safeguarding owners' interests while vessel operations proceed.",
        ],
      },
      {
        heading: "Where protective attendance adds value",
        bullets: [
          "Monitoring turnaround progress against the agreed plan",
          "Escalating delays or risks early",
          "Providing clear reporting to owners and managers",
          "Keeping security and efficiency in view throughout the call",
        ],
      },
      {
        heading: "Appointing with clarity",
        paragraphs: [
          "Share vessel particulars, port, ETA/ETD, and the protective scope required. A focused brief lets the attending team protect the call without adding noise.",
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
  contentHtml?: string | null;
  sections?: unknown;
};

function mapDbPost(post: DbBlogPost): Omit<BlogPost, "image" | "imageAlt"> {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt.toISOString().slice(0, 10),
    readTime: post.readTime,
    sections: Array.isArray(post.sections)
      ? (post.sections as BlogSection[])
      : [],
    contentHtml: post.contentHtml,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    if (posts.length > 0) {
      return withImages(posts.map(mapDbPost));
    }
  } catch {
    // fall through to static posts
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
    if (post) {
      return withImages([mapDbPost(post)])[0] ?? null;
    }
  } catch {
    // fall through
  }
  const found = RAW_BLOG_POSTS.find((p) => p.slug === slug);
  return found ? withImages([found])[0] : null;
}
