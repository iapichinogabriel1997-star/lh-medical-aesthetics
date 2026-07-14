import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const user = await verifyToken();
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, username: user });
}
