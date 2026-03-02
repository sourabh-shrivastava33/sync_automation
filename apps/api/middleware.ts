import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiting based on IP
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 50; // max requests
const WINDOW_MS = 60 * 1000; // 1 minute

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const response = NextResponse.next();

  // Security Headers
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  // CORS (Allow Frontend Only)
  const origin = request.headers.get("origin") || "";
  const allowedOrigin =
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL || "https://sync-automations-web.vercel.app"
      : "http://localhost:3000";

  if (origin === allowedOrigin || !origin) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      origin || allowedOrigin,
    );
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
  }

  // Handle preflight
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { headers: response.headers });
  }

  // Rate Limiting
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
  } else {
    const rateLimitData = rateLimitMap.get(ip)!;
    if (now - rateLimitData.lastReset > WINDOW_MS) {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    } else {
      rateLimitData.count += 1;
      if (rateLimitData.count > RATE_LIMIT) {
        return new NextResponse("Too Many Requests", {
          status: 429,
          headers: response.headers,
        });
      }
    }
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
