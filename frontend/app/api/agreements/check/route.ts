import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const res = await fetch(
    `http://127.0.0.1:8000//agreements/check/?type=${type}`,
    { credentials: "include" }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
