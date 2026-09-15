import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const github = String(form.get("github") || "").trim();
  const college = String(form.get("college") || "").trim();
  const domain = String(form.get("domain") || "").trim();
  const stack = String(form.get("stack") || "").trim();
  const availability = String(form.get("availability") || "").trim();
  const captcha = form.get("captcha");

  if (!captcha) {
    return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
  }

  // Verify captcha with Google
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
  const captchaRes = await fetch(verifyUrl, { method: "POST" }).then((r) => r.json());

  if (!captchaRes.success)
    return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });

  // Basic input validation
  if (!email.includes("@") || !github) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  // TODO:
  // 1. Store into Supabase DB
  // 2. Trigger first test email
  // 3. Trigger pipeline workflow

  return NextResponse.json({ success: true });
}
