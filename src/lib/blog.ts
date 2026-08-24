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
  {
    slug: "anatomy-of-a-full-port-call-in-ghana",
    title: "The Anatomy of a Full Port Call in Ghana",
    excerpt:
      "A Ghanaian-registered agency desk should cover arrivals, port operations, husbandry, and departure — not only inward papers.",
    category: "Operations",
    publishedAt: "2026-08-20",
    readTime: "6 min read",
    sections: [
      {
        paragraphs: [
          "Owners often appoint an agent for clearance and then discover the rest of the call is still unmanaged. Arrivals, berth windows, crew, stores, surveys, and outward formalities all compete for the same hours alongside.",
          "MGE-SWITCH is built around the full port call. We handle arrivals, port operations, husbandry, and departure so owners, charterers, and operators keep one accountable desk in Tema and Takoradi, with allied cover at Lome.",
        ],
      },
      {
        heading: "What “every aspect of the call” actually includes",
        bullets: [
          "Notice of arrival, inward clearance, and first-line attendance",
          "Stay management with authorities, cargo, and husbandry sequenced together",
          "Crew, spares, surveys, travel, and welfare treated as part of the operational plan",
          "Outward formalities and a clean handover when the vessel sails",
        ],
      },
      {
        heading: "Why the Ghana corridor needs a ground desk",
        paragraphs: [
          "Tema is Ghana’s eastern commercial gateway. Takoradi is the western energy and project hub. Lome is West Africa’s key transit port. Traffic that moves across this corridor needs local representation that already understands each port’s rhythm — not a last-minute introduction.",
        ],
      },
    ],
  },
  {
    slug: "oil-and-gas-upstream-support-from-tema-and-takoradi",
    title: "Oil & Gas Upstream Support from Tema and Takoradi",
    excerpt:
      "Ghana’s energy corridor needs agency and husbandry that can attend OSVs, tankers, and campaign traffic — not only conventional liner calls.",
    category: "Oil & Gas",
    publishedAt: "2026-08-18",
    readTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "Alongside conventional ship agency, MGE-SWITCH supports oil and gas upstream traffic through Ghana’s two principal ports. Takoradi sits at the centre of offshore logistics. Tema remains a commercial and campaign gateway. Lome is available when the region’s transit hub is the right call.",
        ],
      },
      {
        heading: "What upstream-related attendance looks like",
        bullets: [
          "Agency for OSVs, tankers, and project vessels",
          "Crew rotations timed to offshore windows",
          "Stores and spares coordinated around campaign plans",
          "Protective attendance when owners need independent cover",
        ],
      },
      {
        heading: "One desk across the energy corridor",
        paragraphs: [
          "Campaign traffic rarely stays in a single port. A Ghanaian-registered partner with ground operations in Tema and Takoradi, plus allied coverage at Lome, keeps nominations, husbandry, and reporting on one channel instead of three unconnected introductions.",
        ],
      },
    ],
  },
  {
    slug: "lome-west-africa-transit-hub-for-vessel-operators",
    title: "Why Lome Matters as West Africa’s Transit Hub",
    excerpt:
      "Lome is more than a neighbouring port. For operators moving through the Ghana–Togo corridor, it is the region’s key transit option — best served from the same desk as Tema and Takoradi.",
    category: "Ports",
    publishedAt: "2026-08-16",
    readTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "West African itineraries often include a transit or transhipment call at Lome. Treating that call as a separate relationship creates friction: new contacts, delayed papers, and no continuity with the Ghana programme.",
        ],
      },
      {
        heading: "What allied coverage at Lome provides",
        bullets: [
          "Ship agency attendance for transit and commercial calls",
          "Protective representation when owners require independent cover",
          "Documentation and turnaround support aligned with the Ghana desk",
          "Continuity for vessels that also call Tema or Takoradi",
        ],
      },
      {
        heading: "Nominate once, cover the corridor",
        paragraphs: [
          "MGE-SWITCH’s ground operations are in Tema and Takoradi. Allied coverage at Lome means owners can nominate one Ghanaian-registered agency for Ghana’s two principal ports and West Africa’s key transit hub — arrivals through departure, on a single accountable channel.",
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
      const fromDb = withImages(posts.map(mapDbPost));
      const dbSlugs = new Set(fromDb.map((p) => p.slug));
      const extras = withImages(
        RAW_BLOG_POSTS.filter((p) => !dbSlugs.has(p.slug))
      );
      return [...fromDb, ...extras].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
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

export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}
