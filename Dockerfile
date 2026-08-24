FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps --ignore-scripts

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ARG NEXT_PUBLIC_PHONE
ARG NEXT_PUBLIC_ADDRESS
ARG NEXT_PUBLIC_GOOGLE_REVIEW_URL
ARG NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="postgresql://ulfborg:build@localhost:5432/ulfborg?schema=public"
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER
ENV NEXT_PUBLIC_PHONE=$NEXT_PUBLIC_PHONE
ENV NEXT_PUBLIC_ADDRESS=$NEXT_PUBLIC_ADDRESS
ENV NEXT_PUBLIC_GOOGLE_REVIEW_URL=$NEXT_PUBLIC_GOOGLE_REVIEW_URL
ENV NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=$NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p public/uploads \
  && chown -R nextjs:nodejs public/uploads

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts/seed-production.mjs ./scripts/seed-production.mjs
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh

# Prisma CLI + seed runtime deps for migrate deploy and db seed on container start
RUN npm install --omit=dev \
  prisma@7.9.1 \
  dotenv \
  bcryptjs \
  @prisma/adapter-pg \
  @prisma/driver-adapter-utils \
  pg \
  postgres-array \
  --legacy-peer-deps --ignore-scripts \
  && chown -R nextjs:nodejs /app/node_modules \
  && chmod +x ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000
ENTRYPOINT ["./docker-entrypoint.sh"]
