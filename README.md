# MGE-SWITCH

Ship agency and allied services website for **Tema & Takoradi (Ghana)** and **Lome (Togo)**.

**Focus:** ship agency & husbandry, ship spares, crew change, protective agency

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Prisma + PostgreSQL + Redis
- NextAuth admin and enquiry flows

## Local start

Homebrew Postgres on `:5432` and Redis on `:6379` are the default (this avoids a port clash with other Docker stacks).

```bash
cd /Users/OceanCyber/Downloads/mge-switch
bash scripts/start-local.sh
```

The script creates the `mgeswitch` Postgres role/database if needed, migrates, seeds, and starts the app at **http://localhost:3080**.

Admin login: `admin@mge-switch.com` / `admin123`

Manual equivalent:

```bash
cp .env.example .env   # if you do not already have .env
npm install --legacy-peer-deps
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Phone and WhatsApp values are placeholders (`+233 000 000 000`) until real contacts are provided.

## Optional Docker databases

`docker-compose.dev.yml` can run Postgres/Redis on host ports **5438 / 6391**. Those ports are already used by another local stack on this machine, so the Homebrew path above is preferred.
