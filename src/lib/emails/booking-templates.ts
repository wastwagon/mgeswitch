import { BRAND } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";

export interface BookingEmailData {
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date | string;
  flightNumber?: string | null;
  passengerCount: number;
  luggageCount: number;
  quotedPrice: number | string;
  paymentMethod: string;
  paymentStatus: string;
  vehicleName: string;
  specialRequests?: string | null;
}

function layout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${BRAND.name}</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:#1B365D;padding:28px 32px;">
              <p style="margin:0;color:#C9A227;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;">${BRAND.name}</p>
              <p style="margin:6px 0 0;color:#ffffff;font-size:14px;opacity:0.85;">${BRAND.tagline}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background:#E8F4FC;padding:20px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px;font-size:12px;color:#64748b;">
                ${BRAND.address} · ${BRAND.phone}
              </p>
              <p style="margin:0;font-size:12px;color:#64748b;">
                WhatsApp: +${BRAND.whatsapp} · ${BRAND.email}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function bookingDetailsTable(data: BookingEmailData): string {
  const rows = [
    ["Reference", data.reference],
    ["Request Type", data.type === "PICKUP" ? "Port Supply Inbound" : "Port Supply Outbound"],
    ["Vehicle", data.vehicleName],
    ["Pickup", data.pickupLocation],
    ["Drop-off", data.dropoffLocation],
    ["Date & Time", formatDate(data.pickupDate)],
    ["Passengers", String(data.passengerCount)],
    ["Bags", String(data.luggageCount)],
    ["Price", formatCurrency(Number(data.quotedPrice))],
    ["Payment", `${data.paymentMethod.replace("_", " ")} — ${data.paymentStatus}`],
  ];

  if (data.flightNumber) {
    rows.splice(6, 0, ["Flight", data.flightNumber]);
  }

  return rows
    .map(
      ([label, value]) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#64748b;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#1B365D;font-weight:500;">${value}</td>
    </tr>`
    )
    .join("");
}

export function customerBookingConfirmationHtml(
  data: BookingEmailData,
  paid: boolean
): string {
  const headline = paid
    ? "Your supply request is confirmed"
    : "We've received your request";

  const intro = paid
    ? `Hi ${data.customerName}, thank you — your payment was successful and your request is confirmed.`
    : `Hi ${data.customerName}, thank you for choosing ${BRAND.name}. We've received your request and will confirm shortly.`;

  return layout(`
    <h1 style="margin:0 0 8px;font-size:22px;color:#1B365D;">${headline}</h1>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#64748b;">${intro}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${bookingDetailsTable(data)}
    </table>

    ${
      data.specialRequests
        ? `<p style="margin:0 0 16px;padding:12px 16px;background:#E8F4FC;font-size:13px;color:#1B365D;"><strong>Special requests:</strong> ${data.specialRequests}</p>`
        : ""
    }

    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#64748b;">
      Our operations team will contact you on <strong>${data.customerPhone}</strong> with the next update.
      For changes, reply to this email or WhatsApp us at +${BRAND.whatsapp}.
    </p>

    <a href="https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi, I have booking ${data.reference}`)}"
       style="display:inline-block;background:#C9A227;color:#1B365D;padding:14px 24px;font-size:13px;font-weight:700;text-decoration:none;text-transform:uppercase;letter-spacing:0.05em;">
      Contact on WhatsApp
    </a>
  `);
}

export function adminNewBookingHtml(data: BookingEmailData): string {
  return layout(`
    <h1 style="margin:0 0 8px;font-size:22px;color:#1B365D;">New Supply Request Alert</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#64748b;">
      A new ship agency enquiry has been submitted via the website.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${bookingDetailsTable(data)}
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:12px;color:#64748b;">Customer</td>
        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px;color:#1B365D;">${data.customerName}<br/><span style="font-size:12px;color:#64748b;">${data.customerEmail} · ${data.customerPhone}</span></td>
      </tr>
    </table>

    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080"}/admin"
       style="display:inline-block;background:#1B365D;color:#ffffff;padding:14px 24px;font-size:13px;font-weight:600;text-decoration:none;">
      Open Admin Dashboard
    </a>
  `);
}

export function customerBookingConfirmationText(
  data: BookingEmailData,
  paid: boolean
): string {
  return `${paid ? "Request Confirmed" : "Request Received"} — ${data.reference}

Hi ${data.customerName},

${paid ? "Your payment was successful." : "We have received your request."}

Request Type: ${data.type === "PICKUP" ? "Port Supply Inbound" : "Port Supply Outbound"}
Vehicle: ${data.vehicleName}
Route: ${data.pickupLocation} → ${data.dropoffLocation}
Date: ${formatDate(data.pickupDate)}
Passengers: ${data.passengerCount} · Bags: ${data.luggageCount}
Price: ${formatCurrency(Number(data.quotedPrice))}
Payment: ${data.paymentMethod} — ${data.paymentStatus}

${BRAND.name} · ${BRAND.phone} · WhatsApp +${BRAND.whatsapp}`;
}
