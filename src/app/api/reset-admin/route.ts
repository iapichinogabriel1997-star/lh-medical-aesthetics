import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST() {
  const db = await getDb();
  const hash = bcrypt.hashSync("LHadmin2024", 10);

  // Delete existing admin and recreate
  await db.execute("DELETE FROM admin");
  await db.execute({
    sql: "INSERT INTO admin (username, password_hash) VALUES (?, ?)",
    args: ["lola", hash],
  });

  return NextResponse.json({ success: true, message: "Admin reset: lola / LHadmin2024" });
}
