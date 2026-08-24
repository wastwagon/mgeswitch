# MGE-SWITCH

Ship agency & allied services website — design system and stack forked from a prior Next.js marketing platform, rebranded for **MGE-SWITCH**.

**Coverage:** Tema & Takoradi (Ghana), Lome (Togo)  
**Focus:** Ship agency & husbandry, ship spares, crew change, protective agency

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Prisma + PostgreSQL + Redis
- NextAuth admin, enquiry flows, Coolify-ready Docker Compose

## Local start (quick)

```bash
cd /Users/OceanCyber/Downloads/mge-switch
cp .env.example .env
npm install --legacy-peer-deps
# Point DATABASE_URL / REDIS_URL at local Postgres + Redis, then:
npx prisma generate
npx prisma migrate deploy   # or migrate dev
npm run db:seed
npm run dev
```

Open http://localhost:3080

## What was prepared

- New folder separate from MGE-SWITCH (`/Users/OceanCyber/Downloads/mge-switch`)
- Core brand copy, nav, hero, about, services, trust, metadata updated for MGE-SWITCH
- Env / Coolify templates reset to placeholder domain & contacts

## Still yours to finish in a new chat

- Real phone, WhatsApp, email, legal address, domain
- Replace leftover MGE-SWITCH image filenames / gallery media / blog posts
- Admin seed credentials & production Coolify deploy
- Visual identity (logo/icons still use inherited SVG assets)

## Sibling project

The original MGE-SWITCH project remains intact at:

`/Users/OceanCyber/Downloads/mgeswitch`
