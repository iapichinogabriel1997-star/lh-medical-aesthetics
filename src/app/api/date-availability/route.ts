import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const month = req.nextUrl.searchParams.get("month"); // "YYYY-MM"

  if (month) {
    const result = await db.execute({
      sql: "SELECT * FROM date_availability WHERE date LIKE ? ORDER BY date, start_time",
      args: [month + "%"],
    });
    return NextResponse.json(result.rows);
  }

  const result = await db.execute("SELECT * FROM date_availability ORDER BY date, start_time");
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const db = await getDb();

  // Support bulk insert: { entries: [{ date, start_time, end_time }, ...] }
  if (body.entries && Array.isArray(body.entries)) {
    for (const entry of body.entries) {
      if (entry.date && entry.start_time && entry.end_time) {
        await db.execute({
          sql: "INSERT INTO date_availability (date, start_time, end_time) VALUES (?, ?, ?)",
          args: [entry.date, entry.start_time, entry.end_time],
        });
      }
    }
    return NextResponse.json({ success: true, count: body.entries.length });
  }

  // Single insert
  const { date, start_time, end_time } = body;
  if (!date || !start_time || !end_time) {
    return NextResponse.json({ error: "date, start_time et end_time requis" }, { status: 400 });
  }

  await db.execute({
    sql: "INSERT INTO date_availability (date, start_time, end_time) VALUES (?, ?, ?)",
    args: [date, start_time, end_time],
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const db = await getDb();

  // Delete by id
  if (body.id) {
    await db.execute({ sql: "DELETE FROM date_availability WHERE id = ?", args: [body.id] });
    return NextResponse.json({ success: true });
  }

  // Delete all entries for a specific date
  if (body.date) {
    await db.execute({ sql: "DELETE FROM date_availability WHERE date = ?", args: [body.date] });
    return NextResponse.json({ success: true });
  }

  // Delete all entries for a month
  if (body.month) {
    await db.execute({ sql: "DELETE FROM date_availability WHERE date LIKE ?", args: [body.month + "%"] });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "id, date ou month requis" }, { status: 400 });
}
