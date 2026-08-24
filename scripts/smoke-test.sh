#!/bin/bash
# Pre-production smoke test for MGE-SWITCH
BASE="http://localhost:3080"
PASS=0
FAIL=0

check_page() {
  local path="$1"
  local expect="${2:-200}"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  if [ "$code" = "$expect" ]; then
    echo "✓ GET $path → $code"
    PASS=$((PASS + 1))
  else
    echo "✗ GET $path → $code (expected $expect)"
    FAIL=$((FAIL + 1))
  fi
}

check_api() {
  local method="$1"
  local path="$2"
  local data="$3"
  local expect="${4:-200}"
  local code
  if [ "$method" = "GET" ]; then
    code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$path")
  else
    code=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" -H "Content-Type: application/json" -d "$data" "$BASE$path")
  fi
  if [ "$code" = "$expect" ]; then
    echo "✓ $method $path → $code"
    PASS=$((PASS + 1))
  else
    echo "✗ $method $path → $code (expected $expect)"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== PAGE ROUTES ==="
PAGES=(
  "/"
  "/services"
  "/book"
  "/fleet"
  "/destinations"
  "/experience"
  "/how-it-works"
  "/faq"
  "/contact"
  "/about"
  "/corporate"
  "/corporate/brochure"
  "/blog"
  "/login"
  "/payment/callback"
  "/robots.txt"
  "/sitemap.xml"
  "/manifest.webmanifest"
)
for p in "${PAGES[@]}"; do check_page "$p"; done

echo ""
echo "=== ADMIN (expect redirect to login) ==="
check_page "/admin" "307"
check_page "/admin/cms" "307"

echo ""
echo "=== PUBLIC APIs ==="
check_api GET "/api/vehicles" "" 200

PRICING='{"type":"PICKUP","vehicleId":"executive-sedan","pickupLocation":"Tema Port, Ghana","dropoffLocation":"Takoradi Port, Ghana","passengerCount":2}'
check_api POST "/api/pricing" "$PRICING" 200

check_api GET "/api/bookings" "" 401

FUTURE=$(date -u -v+7d +"%Y-%m-%dT10:00:00.000Z" 2>/dev/null || date -u -d "+7 days" +"%Y-%m-%dT10:00:00.000Z")
BOOKING="{\"type\":\"PICKUP\",\"vehicleId\":\"executive-sedan\",\"pickupLocation\":\"Tema Port, Ghana\",\"dropoffLocation\":\"Takoradi Port, Ghana\",\"pickupDate\":\"$FUTURE\",\"flightNumber\":\"VOYAGE-001\",\"passengerCount\":2,\"luggageCount\":1,\"customerName\":\"Test User\",\"customerEmail\":\"test@example.com\",\"customerPhone\":\"0555207204\",\"paymentMethod\":\"WHATSAPP\"}"
BOOKING_RESP=$(curl -s -X POST -H "Content-Type: application/json" -d "$BOOKING" "$BASE/api/bookings")
BOOKING_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$BOOKING" "$BASE/api/bookings")
if [ "$BOOKING_CODE" = "201" ]; then
  echo "✓ POST /api/bookings → 201"
  PASS=$((PASS + 1))
  REF=$(echo "$BOOKING_RESP" | python3 -c "import sys,json; print(json.load(sys.stdin)['booking']['reference'])" 2>/dev/null)
  if [ -n "$REF" ]; then
    LOOKUP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/bookings/lookup?reference=$REF&email=test@example.com")
    if [ "$LOOKUP_CODE" = "200" ]; then
      echo "✓ GET /api/bookings/lookup → 200 (ref: $REF)"
      PASS=$((PASS + 1))
    else
      echo "✗ GET /api/bookings/lookup → $LOOKUP_CODE"
      FAIL=$((FAIL + 1))
    fi
  fi
else
  echo "✗ POST /api/bookings → $BOOKING_CODE"
  FAIL=$((FAIL + 1))
fi

check_api GET "/api/bookings/lookup?reference=INVALID&email=bad@test.com" "" 404

echo ""
echo "=== SEO / HEADERS ==="
HSTS=$(curl -sI "$BASE/" | grep -i "strict-transport" || true)
XFRAME=$(curl -sI "$BASE/" | grep -i "x-frame-options" || true)
[ -n "$XFRAME" ] && echo "✓ X-Frame-Options present" && PASS=$((PASS+1)) || echo "⚠ X-Frame-Options (dev may omit HSTS)"

echo ""
echo "=== SUMMARY ==="
echo "Passed: $PASS | Failed: $FAIL"
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
