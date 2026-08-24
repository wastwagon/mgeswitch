#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="/opt/homebrew/opt/postgresql@14/bin:/opt/homebrew/bin:$PATH"

echo "=== MGE-SWITCH — local setup ==="

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

echo "Preparing Homebrew Postgres on :5432..."
if ! psql -h 127.0.0.1 -U mgeswitch -d mgeswitch -c "SELECT 1" >/dev/null 2>&1; then
  psql -h 127.0.0.1 -d postgres -c "CREATE ROLE mgeswitch LOGIN PASSWORD 'mgeswitch_dev' SUPERUSER;" 2>/dev/null || true
  psql -h 127.0.0.1 -d postgres -c "CREATE DATABASE mgeswitch OWNER mgeswitch;" 2>/dev/null || true
fi

if ! psql -h 127.0.0.1 -U mgeswitch -d mgeswitch -c "SELECT 1" >/dev/null 2>&1; then
  echo "ERROR: Could not connect to Postgres as mgeswitch on 127.0.0.1:5432"
  exit 1
fi
echo "Postgres ready."

if ! redis-cli -h 127.0.0.1 ping >/dev/null 2>&1; then
  echo "Starting Redis..."
  brew services start redis 2>/dev/null || redis-server --daemonize yes
fi
echo "Redis ready."

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install --legacy-peer-deps
fi

if lsof -nP -iTCP:3080 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Stopping existing process on port 3080..."
  kill $(lsof -tiTCP:3080 -sTCP:LISTEN) 2>/dev/null || true
  sleep 1
fi

echo "Generating Prisma client and applying migrations..."
npx prisma generate
npx prisma migrate deploy 2>/dev/null || npx prisma migrate dev --name init --skip-seed

echo "Seeding database..."
npm run db:seed

echo ""
echo "=== App starting at http://localhost:3080 ==="
echo "Admin: http://localhost:3080/login"
echo "Email: admin@mge-switch.com"
echo "Password: admin123"
echo ""
npm run dev
