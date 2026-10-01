import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const db = await getDb();
  const result = await db.execute("SELECT * FROM services ORDER BY category, display_order");
  return NextResponse.json(result.rows);
}

export async function PUT(req: NextRequest) {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { services } = await req.json();
  if (!Array.isArray(services)) {
    return NextResponse.json({ error: "Format invalide" }, { status: 400 });
  }

  const db = await getDb();
  for (const svc of services) {
    if (!svc.id || svc.price == null || svc.duration == null) continue;
    if (svc.name != null) {
      await db.execute({
        sql: "UPDATE services SET price = ?, duration = ?, name = ? WHERE id = ?",
        args: [Number(svc.price), Number(svc.duration), String(svc.name), svc.id],
      });
    } else {
      await db.execute({
        sql: "UPDATE services SET price = ?, duration = ? WHERE id = ?",
        args: [Number(svc.price), Number(svc.duration), svc.id],
      });
    }
  }

  return NextResponse.json({ ok: true });
}
