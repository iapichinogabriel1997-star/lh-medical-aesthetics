import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const db = await getDb();
  const result = await db.execute("SELECT * FROM availability ORDER BY day_of_week");
  return NextResponse.json(result.rows);
}

export async function PUT(req: NextRequest) {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { schedules } = await req.json();
  const db = await getDb();

  await db.execute("DELETE FROM availability");
  for (const s of schedules) {
    if (s.start_time && s.end_time) {
      await db.execute({ sql: "INSERT INTO availability (day_of_week, start_time, end_time) VALUES (?, ?, ?)", args: [s.day_of_week, s.start_time, s.end_time] });
    }
  }

  return NextResponse.json({ success: true });
}
