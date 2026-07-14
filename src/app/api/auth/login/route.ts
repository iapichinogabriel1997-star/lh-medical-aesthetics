import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Champs requis" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.execute({ sql: "SELECT * FROM admin WHERE username = ?", args: [username] });
    const admin = result.rows[0];

    if (!admin) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password_hash as string);
    if (!valid) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }

    const token = await createToken(admin.username as string);
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
