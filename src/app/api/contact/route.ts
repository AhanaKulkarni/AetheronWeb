import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { INQUIRY_TOPICS, type InquiryTopic } from "@/config/company";

interface ContactPayload {
  fullName?: unknown;
  workEmail?: unknown;
  company?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown; // Honeypot field
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidTopic(topic: string): topic is InquiryTopic {
  return (INQUIRY_TOPICS as readonly string[]).includes(topic);
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }

  // Silently accept honeypot submissions without dispatching notifications
  if (sanitizeText(body.website).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const fullName = sanitizeText(body.fullName);
  const workEmail = sanitizeText(body.workEmail);
  const company = sanitizeText(body.company);
  const topic = sanitizeText(body.topic);
  const message = sanitizeText(body.message);

  const fieldErrors: Record<string, string> = {};

  if (fullName.length < 2 || fullName.length > 120) {
    fieldErrors.fullName = "Please enter your full name (2–120 characters).";
  }

  if (!EMAIL_REGEX.test(workEmail) || workEmail.length > 180) {
    fieldErrors.workEmail = "Please enter a valid work email address.";
  }

  if (company.length > 160) {
    fieldErrors.company = "Company or organisation name is too long.";
  }

  if (!isValidTopic(topic)) {
    fieldErrors.topic = "Please select a valid discussion topic.";
  }

  if (message.length < 10 || message.length > 4000) {
    fieldErrors.message =
      "Please share a brief message (at least 10 characters).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const submittedAt = new Date().toISOString();
  const subject = `[Aetheron.AI Inquiry] ${topic} — ${fullName}`;
  const plainText = [
    `New corporate inquiry submitted on Aetheron.AI website`,
    ``,
    `Full Name: ${fullName}`,
    `Work Email: ${workEmail}`,
    `Company / Organisation: ${company || "Not specified"}`,
    `Topic: ${topic}`,
    `Submitted At: ${submittedAt}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #101C32; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E5EAF1; border-radius: 12px; background: #FAFBFD;">
      <p style="font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #315EAB; margin: 0 0 8px;">Aetheron.AI Technologies Private Limited</p>
      <h2 style="font-size: 20px; font-weight: 600; color: #142A49; margin: 0 0 20px;">New Corporate Inquiry</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #536176; width: 170px;">Full Name</td><td style="padding: 8px 0; font-weight: 500;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding: 8px 0; color: #536176;">Work Email</td><td style="padding: 8px 0; font-weight: 500;">${escapeHtml(workEmail)}</td></tr>
        <tr><td style="padding: 8px 0; color: #536176;">Company / Organisation</td><td style="padding: 8px 0; font-weight: 500;">${escapeHtml(company || "Not specified")}</td></tr>
        <tr><td style="padding: 8px 0; color: #536176;">Discussion Topic</td><td style="padding: 8px 0; font-weight: 500;">${escapeHtml(topic)}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #FFFFFF; border: 1px solid #E5EAF1; border-radius: 8px;">
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #536176; margin: 0 0 8px;">Message</p>
        <p style="font-size: 14.5px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;

  const toEmail =
    process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_COMPANY_EMAIL || "";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Aetheron.AI <onboarding@resend.dev>";

  // Transport 1: Resend API
  if (process.env.RESEND_API_KEY && toEmail && !toEmail.startsWith("[INSERT")) {
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: workEmail,
          subject,
          text: plainText,
          html: htmlBody,
        }),
      });

      if (!resendRes.ok) {
        const errorDetail = await resendRes.text();
        console.error("Resend inquiry delivery failed:", errorDetail);
        return NextResponse.json(
          {
            ok: false,
            error:
              "We were unable to deliver your inquiry at the moment. Please try again shortly or reach us via our official email address.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Thank you. Your inquiry has been received by our team.",
      });
    } catch (error) {
      console.error("Resend transport error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "A network error occurred while sending your inquiry. Please try again.",
        },
        { status: 502 }
      );
    }
  }

  // Transport 2: SMTP via Nodemailer
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    toEmail &&
    !toEmail.startsWith("[INSERT")
  ) {
    try {
      const port = Number(process.env.SMTP_PORT || 587);
      const secure =
        process.env.SMTP_SECURE === "true" || port === 465;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
        to: toEmail,
        replyTo: workEmail,
        subject,
        text: plainText,
        html: htmlBody,
      });

      return NextResponse.json({
        ok: true,
        message: "Thank you. Your inquiry has been received by our team.",
      });
    } catch (error) {
      console.error("SMTP inquiry delivery error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not dispatch your inquiry through the mail server. Please try again later.",
        },
        { status: 502 }
      );
    }
  }

  // Transport 3: Webhook integration
  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      const webhookRes = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          workEmail,
          company: company || null,
          topic,
          message,
          submittedAt,
        }),
      });

      if (!webhookRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Inquiry forwarding failed at the destination endpoint. Please try again shortly.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        message: "Thank you. Your inquiry has been received by our team.",
      });
    } catch (error) {
      console.error("Webhook inquiry delivery error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to reach the inquiry delivery service. Please try again later.",
        },
        { status: 502 }
      );
    }
  }

  // No server email/webhook transport configured yet — be transparent and never silently discard
  return NextResponse.json(
    {
      ok: false,
      code: "EMAIL_SERVICE_NOT_CONFIGURED",
      error:
        "The inquiry backend is active, but no email delivery service has been configured yet. Before launch, set RESEND_API_KEY (or SMTP_* credentials) and CONTACT_TO_EMAIL in your environment variables.",
    },
    { status: 503 }
  );
}
