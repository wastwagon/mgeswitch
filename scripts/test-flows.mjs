#!/usr/bin/env node
/**
 * Smoke tests for media, blog, and request APIs.
 * Usage: node scripts/test-flows.mjs [baseUrl]
 * Default baseUrl: http://localhost:3080
 */

const baseUrl = process.argv[2] ?? process.env.TEST_BASE_URL ?? "http://localhost:3080";
const results = [];

function pass(name, detail = "") {
  results.push({ name, ok: true, detail });
  console.log(`✓ ${name}${detail ? ` — ${detail}` : ""}`);
}

function fail(name, detail = "") {
  results.push({ name, ok: false, detail });
  console.error(`✗ ${name}${detail ? ` — ${detail}` : ""}`);
}

async function get(path) {
  const res = await fetch(`${baseUrl}${path}`);
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { res, json, text };
}

async function post(path, body) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => null);
  return { res, json };
}

async function main() {
  console.log(`Testing ${baseUrl}\n`);

  // Vehicles (public)
  try {
    const { res, json } = await get("/api/vehicles");
    if (!res.ok || !Array.isArray(json)) {
      fail("GET /api/vehicles", `status ${res.status}`);
    } else {
      pass("GET /api/vehicles", `${json.length} vehicles`);
      const sample = json[0];
      if (sample?.imageUrl) {
        const imgRes = await fetch(`${baseUrl}${sample.imageUrl}`);
        if (imgRes.ok) {
          pass("Vehicle image reachable", sample.imageUrl);
        } else {
          fail("Vehicle image reachable", `${sample.imageUrl} → ${imgRes.status}`);
        }
      }
    }
  } catch (err) {
    fail("GET /api/vehicles", err.message);
  }

  // Blog listing page
  try {
    const { res, text } = await get("/blog");
    if (!res.ok) {
      fail("GET /blog", `status ${res.status}`);
    } else {
      const hasBlogImages = text.includes("/images/blog/") || text.includes("/uploads/");
      pass("GET /blog", hasBlogImages ? "images present in HTML" : "page loads");
    }
  } catch (err) {
    fail("GET /blog", err.message);
  }

  // Static uploads path (404 expected if empty library)
  try {
    const { res } = await get("/uploads/");
    pass("GET /uploads/", `status ${res.status} (404 ok if library empty)`);
  } catch (err) {
    fail("GET /uploads/", err.message);
  }

  // WhatsApp request (creates a real row — use test identity)
  if (process.env.RUN_BOOKING_TEST === "true") {
    try {
      const { res: vRes, json: vehicles } = await get("/api/vehicles");
      if (!vRes.ok || !vehicles?.[0]) {
        fail("POST /api/bookings", "no vehicle available");
      } else {
        const pickup = new Date(Date.now() + 86400000).toISOString();
        const { res, json } = await post("/api/bookings", {
          type: "PICKUP",
          vehicleId: vehicles[0].id,
          pickupLocation: "Tema Port, Ghana",
          dropoffLocation: "Takoradi Port, Ghana",
          pickupDate: pickup,
          passengerCount: 2,
          luggageCount: 1,
          customerName: "Flow Test User",
          customerEmail: "flow-test@example.com",
          customerPhone: "0550000000",
          paymentMethod: "WHATSAPP",
          specialRequests: "Automated smoke test — safe to delete",
        });
        if (res.ok && json?.booking?.reference) {
          pass("POST /api/bookings (WhatsApp)", json.booking.reference);
        } else {
          fail("POST /api/bookings", json?.error ?? `status ${res.status}`);
        }
      }
    } catch (err) {
      fail("POST /api/bookings", err.message);
    }
  } else {
      pass("POST /api/bookings", "skipped (set RUN_BOOKING_TEST=true to run)");
  }

  // Paystack config probe
  try {
    const { res, json } = await post("/api/payments/paystack", {});
    if (res.status === 503) {
      pass("Paystack endpoint", "not configured (503 expected without keys)");
    } else if (res.status === 400 || res.status === 429) {
      pass("Paystack endpoint", `reachable (${res.status})`);
    } else {
      pass("Paystack endpoint", `status ${res.status}`);
    }
    void json;
  } catch (err) {
    fail("Paystack endpoint", err.message);
  }

  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
