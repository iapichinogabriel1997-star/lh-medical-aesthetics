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
  await db.execute(`CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS bookings (
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
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_of_week INTEGER NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS blocked_slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    reason TEXT DEFAULT ''
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS date_availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    duration INTEGER NOT NULL,
    detail TEXT DEFAULT '',
    featured INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0
  )`);

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

  // Seed services
  const svcCheck = await db.execute("SELECT COUNT(*) as count FROM services");
  if (Number(svcCheck.rows[0].count) === 0) {
    const services: Array<[string, string, number, number, string, number, number]> = [
      // Zones individuelles (laser)
      ["Zones individuelles", "Aisselles", 40, 15, "", 0, 1],
      ["Zones individuelles", "Pieds", 20, 10, "", 0, 2],
      ["Zones individuelles", "Mains (Doigts)", 20, 10, "", 0, 3],
      ["Zones individuelles", "Sillon inter-fessier", 35, 15, "", 0, 4],
      ["Zones individuelles", "Maillot simple échancré", 35, 20, "", 0, 5],
      ["Zones individuelles", "Maillot intégral", 50, 25, "", 0, 6],
      ["Zones individuelles", "Cuisses", 45, 25, "", 0, 7],
      ["Zones individuelles", "Demi-jambes / Genoux", 50, 25, "", 0, 8],
      ["Zones individuelles", "Jambes complètes", 70, 40, "", 0, 9],
      ["Zones individuelles", "Demi-bras", 35, 15, "", 0, 10],
      ["Zones individuelles", "Bras complet (sans aisselles)", 50, 25, "", 0, 11],
      ["Zones individuelles", "Dos", 90, 40, "", 0, 12],
      ["Zones individuelles", "Ligne abdominale", 20, 10, "", 0, 13],
      // Visage & Nuque (laser)
      ["Visage & Nuque", "Nuque", 35, 15, "", 0, 1],
      ["Visage & Nuque", "Lèvre supérieure", 25, 10, "", 0, 2],
      ["Visage & Nuque", "Barbe", 50, 25, "", 0, 3],
      ["Visage & Nuque", "Duvet", 30, 15, "", 0, 4],
      // Forfaits Laser
      ["Forfaits Laser", "Forfait 1 — Bikini, Sif, Aisselles", 90, 45, "Bikini, Sif, Aisselles", 0, 1],
      ["Forfaits Laser", "Forfait 2 — Bikini, Sif, Aisselles, Demi-jambes", 130, 60, "Bikini, Sif, Aisselles, Demi-jambes", 0, 2],
      ["Forfaits Laser", "Forfait 3 — Bikini, Sif, Ligne abdo, Aisselles, Jambes", 150, 75, "Bikini, Sif, Ligne abdominale, Aisselles, Jambes complètes", 0, 3],
      ["Forfaits Laser", "Forfait 4 — Tout le corps", 180, 90, "Tout le corps", 1, 4],
      // Cryolipolyse
      ["Cryolipolyse", "Cryolipolyse — 1 zone", 150, 60, "", 0, 1],
      ["Cryolipolyse", "Cryolipolyse — 2 zones", 250, 90, "", 0, 2],
      ["Cryolipolyse", "Cryolipolyse — 3 zones", 350, 120, "", 0, 3],
      // Radiofréquence
      ["Radiofréquence", "Radiofréquence — Visage", 80, 30, "", 0, 1],
      ["Radiofréquence", "Radiofréquence — Corps (1 zone)", 90, 40, "", 0, 2],
      ["Radiofréquence", "Radiofréquence — Corps (2 zones)", 150, 60, "", 0, 3],
      // Lipocavitation
      ["Lipocavitation", "Lipocavitation — 1 zone", 80, 30, "", 0, 1],
      ["Lipocavitation", "Lipocavitation — 2 zones", 140, 50, "", 0, 2],
      // Forfaits Cryo / RF / Lipo
      ["Forfaits combinés", "Forfait Cryo + RF (1 zone)", 200, 90, "Cryolipolyse + Radiofréquence (1 zone)", 0, 1],
      ["Forfaits combinés", "Forfait Cryo + RF + Lipo (1 zone)", 250, 120, "Cryolipolyse + Radiofréquence + Lipocavitation (1 zone)", 1, 2],
    ];
    for (const [cat, name, price, duration, detail, featured, order] of services) {
      await db.execute({
        sql: "INSERT INTO services (category, name, price, duration, detail, featured, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [cat, name, price, duration, detail, featured, order],
      });
    }
  }
}

export default db;
