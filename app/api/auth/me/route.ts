import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession();
  return NextResponse.json({ ok: true, session });
}
