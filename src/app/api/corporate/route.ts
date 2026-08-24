import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail, getAdminEmail } from "@/lib/email";
import { getBrandConfig } from "@/lib/brand";
import {
  corporateEnquirySchema,
  generateCorporateReference,
  serviceTypeLabel,
  CORPORATE_HONEYPOT_FIELD,
} from "@/lib/corporate-enquiry";
import {
  getClientIp,
  rateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`corporate:enquiry:${ip}`, 5, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many enquiries. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rl, 5) }
    );
  }

  try {
    const body = await request.json();
    const honeypot = body[CORPORATE_HONEYPOT_FIELD];
    if (typeof honeypot === "string" && honeypot.trim()) {
      return NextResponse.json({
        success: true,
        reference: generateCorporateReference(),
      });
    }

    const { [CORPORATE_HONEYPOT_FIELD]: _, ...rest } = body;
    const data = corporateEnquirySchema.parse(rest);
    const brand = await getBrandConfig();
    const reference = generateCorporateReference();

    const enquiry = await prisma.corporateEnquiry.create({
      data: {
        reference,
        ...data,
      },
    });

    const serviceLabel = serviceTypeLabel(data.serviceType);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080";

    const html = `
      <h2>New Ship Agency Enquiry — ${reference}</h2>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Contact:</strong> ${data.contactName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Service:</strong> ${serviceLabel}</p>
      <p><strong>Requirements:</strong></p>
      <p>${data.message.replace(/\n/g, "<br/>")}</p>
      <a href="${appUrl}/admin/corporate"
         style="display:inline-block;margin-top:24px;background:#1B365D;color:#ffffff;padding:14px 24px;font-size:13px;font-weight:600;text-decoration:none;">
        Open Enquiry Inbox
      </a>
    `;

    try {
      await sendEmail({
        to: getAdminEmail(),
        subject: `Ship Agency Enquiry — ${data.company} (${reference})`,
        html,
      });

      await sendEmail({
        to: data.email,
        subject: `Enquiry Received | ${brand.name}`,
        html: `
          <p>Dear ${data.contactName},</p>
          <p>Thank you for contacting ${brand.name}. Our team will review your ship agency requirements and respond as quickly as possible.</p>
          <p>Your reference: <strong>${reference}</strong></p>
          <p>Kind regards,<br/>The ${brand.name} Operations Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Ship agency enquiry email failed:", emailError);
    }

    return NextResponse.json({ success: true, reference: enquiry.reference });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }
    console.error("Ship agency enquiry error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await prisma.corporateEnquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json(enquiries);
}
