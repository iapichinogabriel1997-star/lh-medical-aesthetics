import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const date = req.nextUrl.searchParams.get("date");
  if (date) {
    const result = await db.execute({ sql: "SELECT * FROM blocked_slots WHERE date = ?", args: [date] });
    return NextResponse.json(result.rows);
  }
  const result = await db.execute("SELECT * FROM blocked_slots WHERE date >= date('now') ORDER BY date, start_time");
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { date, start_time, end_time, reason } = await req.json();
  if (!date || !start_time || !end_time) {
    return NextResponse.json({ error: "Champs requis" }, { status: 400 });
  }

  const db = await getDb();
  await db.execute({ sql: "INSERT INTO blocked_slots (date, start_time, end_time, reason) VALUES (?, ?, ?, ?)", args: [date, start_time, end_time, reason || ""] });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  const db = await getDb();
  await db.execute({ sql: "DELETE FROM blocked_slots WHERE id = ?", args: [id] });
  return NextResponse.json({ success: true });
}
