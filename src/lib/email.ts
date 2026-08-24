import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.RESEND_SMTP_HOST ?? "smtp.resend.com",
      port: Number(process.env.RESEND_SMTP_PORT ?? 465),
      secure: Number(process.env.RESEND_SMTP_PORT ?? 465) === 465,
      auth: {
        user: "resend",
        pass: apiKey,
      },
    });
  }

  return transporter;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getEmailFrom(): string {
  return (
    process.env.EMAIL_FROM ??
    "Ulfborg Rebooth <onboarding@resend.dev>"
  );
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL ?? "team.tema@ulfborgrebooth.com";
}

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  const transport = getTransporter();
  if (!transport) {
    console.warn("Email not sent: RESEND_API_KEY is not configured");
    return false;
  }

  try {
    await transport.sendMail({
      from: getEmailFrom(),
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });
    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    return false;
  }
}
