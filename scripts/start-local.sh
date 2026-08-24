#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== MGE-SWITCH — local preview ==="

if ! docker info >/dev/null 2>&1; then
  echo "Opening Docker Desktop..."
  open -a Docker || true
  echo "Waiting for Docker engine..."
  for i in $(seq 1 60); do
    if docker info >/dev/null 2>&1; then
      echo "Docker is ready."
      break
    fi
    sleep 2
  done
fi

if ! docker info >/dev/null 2>&1; then
  echo "ERROR: Docker Desktop is not running. Open it, wait until it says Running, then re-run:"
  echo "  bash scripts/start-local.sh"
  exit 1
fi

echo "Starting Postgres + Redis..."
docker compose -f docker-compose.dev.yml up -d
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Preparing database..."
npx prisma generate
npx prisma migrate deploy 2>/dev/null || npx prisma migrate dev --name init
npm run db:seed

echo ""
echo "=== App starting at http://localhost:3080 ==="
echo "Admin: admin@mge-switch.com / admin123"
echo ""
npm run dev
