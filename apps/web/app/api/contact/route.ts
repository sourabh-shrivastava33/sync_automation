import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Basic rate-limit placeholder:
// TODO: Implement proper IP-based rate limiting (e.g., using Redis/Upstash) in production
// TODO: Implement CAPTCHA validation (e.g., Turnstile or reCAPTCHA) in production

const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = process.env.SMTP_PORT || "587";
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || process.env.FROM_EMAIL || "";

export async function POST(req: Request) {
  try {
    // 1. Parse request body
    const body = await req.json();
    const { name, email, leakSource, message } = body;

    // 2. Validate input
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 },
      );
    }

    if (!leakSource || typeof leakSource !== "string") {
      return NextResponse.json(
        { error: "Primary leakage area is required" },
        { status: 400 },
      );
    }

    // 3. Configure Nodemailer transport
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      console.error(
        "[Email System] Missing SMTP configuration in environment variables.",
      );
      return NextResponse.json(
        { error: "Internal Server Error: Email system misconfigured." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // 4. Construct the email in Executive Style
    const timestamp = new Date().toISOString();

    const mailOptions = {
      from: `Sync Automations <${SMTP_FROM}>`,
      to: "sourabhshrivastava3011@gmail.com",
      replyTo: email,
      subject: "New Revenue Audit Request — Sync Automations",
      text: `Name: ${name}
Work Email: ${email}
Primary Leakage Area: ${leakSource}

Additional Context:
${message ? message.trim() : "None provided."}

Submitted At:
${timestamp}`,
    };

    // 5. Send the email
    await transporter.sendMail(mailOptions);

    // 6. Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // Log safely server-side, do not leak stack traces to client
    console.error("[Email System] Failed to process audit request:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 },
    );
  }
}
