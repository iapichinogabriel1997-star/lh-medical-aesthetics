import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

let initialized = false;

export async function getDb() {
  if (!initialized) {
    await initDb();
    initialized = true;
  }
  return db;
}

async function initDb() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_name TEXT NOT NULL,
      service_price INTEGER NOT NULL,
      service_duration INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      note TEXT DEFAULT '',
      status TEXT DEFAULT 'confirmed',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS availability (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_of_week INTEGER NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS blocked_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      reason TEXT DEFAULT ''
    );
  `);

  // Seed admin
  const adminCheck = await db.execute("SELECT COUNT(*) as count FROM admin");
  if (Number(adminCheck.rows[0].count) === 0) {
    const hash = bcrypt.hashSync("LHadmin2024", 10);
    await db.execute({ sql: "INSERT INTO admin (username, password_hash) VALUES (?, ?)", args: ["lola", hash] });
  }

  // Seed availability (Lun-Sam 9h-18h)
  const availCheck = await db.execute("SELECT COUNT(*) as count FROM availability");
  if (Number(availCheck.rows[0].count) === 0) {
    for (let day = 1; day <= 6; day++) {
      await db.execute({ sql: "INSERT INTO availability (day_of_week, start_time, end_time) VALUES (?, ?, ?)", args: [day, "09:00", "18:00"] });
    }
  }
}

export default db;
