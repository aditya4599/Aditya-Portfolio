// ─────────────────────────────────────────────────────────────
// POST /api/contact — sends a "Say Hi" form submission to Aditya.
//
// Runs server-side only (a Vercel serverless function; the Vite dev
// server also mounts it locally, see vite.config.js). The Resend API
// key never reaches the browser.
//
// Environment variables (see .env.example):
//   RESEND_API_KEY      required — from https://resend.com/api-keys
//   CONTACT_TO_EMAIL    optional — defaults to adityamittal4599@gmail.com
//   CONTACT_FROM_EMAIL  optional — defaults to Resend's test sender,
//                       which can only deliver to the email address the
//                       Resend account was created with.
//
// The recipient is fixed on the server. Visitors can't choose it.
// ─────────────────────────────────────────────────────────────

const DEFAULT_TO = "adityamittal4599@gmail.com";
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";
const RESEND_URL = "https://api.resend.com/emails";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;
const MIN_FILL_MS = 3000; // faster than a human can fill the form → bot
const MAX_BODY_BYTES = 16 * 1024;

// Best-effort rate limit (per warm server instance): 5 messages / 10 min / IP.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > RATE_MAX;
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body; // Vercel pre-parses JSON
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error("too large"), { code: 413 });
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

// Strip control characters (keep newlines/tabs in the message).
const clean = (value, keepNewlines = false) =>
  String(value ?? "")
    .replace(keepNewlines ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "")
    .trim();

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function validateSubmission(body) {
  const email = clean(body.email);
  const message = clean(body.message, true).replace(/\r\n?/g, "\n");
  const fieldErrors = {};
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
  if (message.length < MESSAGE_MIN) fieldErrors.message = `Please write at least ${MESSAGE_MIN} characters.`;
  else if (message.length > MESSAGE_MAX) fieldErrors.message = `Please keep it under ${MESSAGE_MAX} characters.`;
  return { email, message, fieldErrors };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, error: "Method not allowed." });
  }

  let body;
  try {
    body = await readJson(req);
  } catch (err) {
    return send(res, err.code === 413 ? 413 : 400, { ok: false, error: "Invalid request." });
  }
  if (!body || typeof body !== "object") return send(res, 400, { ok: false, error: "Invalid request." });

  // Spam checks: silently "accept" bot submissions so bots learn nothing,
  // but never send them anywhere.
  const honeypot = clean(body.website);
  const elapsed = Number(body.elapsed);
  if (honeypot || (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS)) {
    return send(res, 200, { ok: true });
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return send(res, 429, { ok: false, error: "Too many messages in a short time. Please try again later." });
  }

  const { email, message, fieldErrors } = validateSubmission(body);
  if (Object.keys(fieldErrors).length) {
    return send(res, 400, { ok: false, error: "Please fix the highlighted fields.", fieldErrors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — cannot send email.");
    return send(res, 503, { ok: false, error: "The contact form isn’t available right now." });
  }

  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const preview = message.replace(/\s+/g, " ").slice(0, 60);

  const text = `New message from your portfolio "Say Hi" page\n\nFrom: ${email}\n\nMessage:\n${message}\n\n— Reply to this email to respond directly.`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#000">
  <p style="margin:0 0 12px">New message from your portfolio <strong>Say Hi</strong> page</p>
  <p style="margin:0 0 12px"><strong>From:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
  <p style="margin:0 0 6px"><strong>Message:</strong></p>
  <div style="white-space:pre-wrap;border-left:3px solid #000;padding:8px 12px;background:#FCF6F4">${escapeHtml(message)}</div>
  <p style="margin:16px 0 0;color:#555;font-size:13px">Reply to this email to respond directly.</p>
</div>`;

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${email}: ${preview}${message.length > 60 ? "…" : ""}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[contact] Resend error ${response.status}: ${detail.slice(0, 500)}`);
      return send(res, 502, { ok: false, error: "The message couldn’t be sent right now." });
    }

    const data = await response.json().catch(() => ({}));
    if (!data.id) {
      console.error("[contact] Resend response missing id", data);
      return send(res, 502, { ok: false, error: "The message couldn’t be sent right now." });
    }
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error("[contact] Network error contacting Resend:", err?.message);
    return send(res, 502, { ok: false, error: "The message couldn’t be sent right now." });
  }
}
