#!/bin/bash
cd /Users/OceanCyber/Downloads/mgeswitch
export PATH="/opt/homebrew/opt/postgresql@14/bin:/opt/homebrew/bin:$PATH"

echo "=== MGE-SWITCH local preview ==="

# Stop any broken previous Next process on 3080
if lsof -ti :3080 >/dev/null 2>&1; then
  echo "Stopping old process on port 3080..."
  kill $(lsof -ti :3080) 2>/dev/null || true
  sleep 1
fi

# Ensure Postgres role/db exist (Homebrew)
if ! psql -h 127.0.0.1 -U mgeswitch -d mgeswitch -c "SELECT 1" >/dev/null 2>&1; then
  echo "Preparing local Postgres database..."
  psql -h 127.0.0.1 -d postgres -c "CREATE ROLE mgeswitch LOGIN PASSWORD 'mgeswitch_dev' SUPERUSER;" 2>/dev/null || true
  psql -h 127.0.0.1 -d postgres -c "CREATE DATABASE mgeswitch OWNER mgeswitch;" 2>/dev/null || true
fi

# Ensure Redis responds
if ! redis-cli -h 127.0.0.1 ping >/dev/null 2>&1; then
  echo "Starting Redis..."
  brew services start redis 2>/dev/null || redis-server --daemonize yes
fi

# Env
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Point local env at Homebrew services (not Docker ports)
cat > .env <<'EOF'
DATABASE_URL="postgresql://mgeswitch:mgeswitch_dev@127.0.0.1:5432/mgeswitch?schema=public"
REDIS_URL="redis://127.0.0.1:6379"
AUTH_SECRET="mgeswitch-local-dev-secret-change-me"
AUTH_URL="http://localhost:3080"
NEXT_PUBLIC_APP_URL="http://localhost:3080"
NEXT_PUBLIC_WHATSAPP_NUMBER="233596092689"
NEXT_PUBLIC_PHONE="+233 596 092 689"
NEXT_PUBLIC_ADDRESS="Heavy Industrial Area Enclave, Tema, Ghana"
NEXT_PUBLIC_GOOGLE_REVIEW_URL=""
PAYSTACK_SECRET_KEY=""
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=""
RESEND_API_KEY=""
RESEND_SMTP_HOST="smtp.resend.com"
RESEND_SMTP_PORT="465"
EMAIL_FROM="MGE-SWITCH <onboarding@resend.dev>"
ADMIN_EMAIL="ops@mge-switch.com"
EOF

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Migrating + seeding..."
npx prisma generate
npx prisma migrate deploy
node scripts/seed-production.mjs

echo ""
echo "============================================"
echo "  Preview:  http://localhost:3080"
echo "  Admin:    http://localhost:3080/login"
echo "  Email:    admin@mge-switch.com"
echo "  Password: admin123"
echo "============================================"
echo ""

npm run dev
