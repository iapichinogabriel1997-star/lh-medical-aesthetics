import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// All schedule entries from the images (Oct, Nov, Dec 2026)
const scheduleEntries = [
  // Septembre 2026 (partial, from top of image)
  { date: "2026-09-28", start_time: "09:00", end_time: "18:00" },
  { date: "2026-09-29", start_time: "09:00", end_time: "18:00" },

  // Octobre 2026
  { date: "2026-10-01", start_time: "10:00", end_time: "18:00" },
  { date: "2026-10-02", start_time: "13:00", end_time: "17:00" },
  { date: "2026-10-03", start_time: "11:30", end_time: "17:00" },
  { date: "2026-10-06", start_time: "10:00", end_time: "18:00" },
  // 7/10: two ranges (11h30-14h puis 16h-17h)
  { date: "2026-10-07", start_time: "11:30", end_time: "14:00" },
  { date: "2026-10-07", start_time: "16:00", end_time: "17:00" },
  { date: "2026-10-18", start_time: "11:00", end_time: "18:00" },
  { date: "2026-10-19", start_time: "10:00", end_time: "18:00" },
  { date: "2026-10-20", start_time: "13:00", end_time: "18:00" },
  { date: "2026-10-21", start_time: "17:00", end_time: "18:00" },
  { date: "2026-10-24", start_time: "10:00", end_time: "18:00" },
  { date: "2026-10-25", start_time: "10:00", end_time: "18:00" },
  { date: "2026-10-27", start_time: "11:00", end_time: "17:00" },
  { date: "2026-10-30", start_time: "15:00", end_time: "18:00" },
  { date: "2026-10-31", start_time: "13:00", end_time: "18:00" },

  // Novembre 2026
  { date: "2026-11-02", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-03", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-05", start_time: "10:00", end_time: "16:00" },
  { date: "2026-11-06", start_time: "13:00", end_time: "18:00" },
  { date: "2026-11-09", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-10", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-14", start_time: "11:00", end_time: "18:00" },
  { date: "2026-11-15", start_time: "11:00", end_time: "18:00" },
  { date: "2026-11-19", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-20", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-21", start_time: "11:00", end_time: "18:00" },
  { date: "2026-11-22", start_time: "11:00", end_time: "18:00" },
  { date: "2026-11-23", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-26", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-27", start_time: "10:00", end_time: "18:00" },
  { date: "2026-11-30", start_time: "11:00", end_time: "18:00" },

  // Décembre 2026
  { date: "2026-12-01", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-02", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-05", start_time: "11:00", end_time: "18:00" },
  { date: "2026-12-06", start_time: "11:00", end_time: "18:00" },
  { date: "2026-12-07", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-12", start_time: "11:00", end_time: "18:00" },
  { date: "2026-12-13", start_time: "11:00", end_time: "16:00" },
  { date: "2026-12-14", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-15", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-16", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-17", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-22", start_time: "11:00", end_time: "18:00" },
  { date: "2026-12-23", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-28", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-29", start_time: "10:00", end_time: "18:00" },
  { date: "2026-12-30", start_time: "10:00", end_time: "18:00" },
];

export async function POST() {
  const db = await getDb();

  // Clear existing date_availability entries for these months
  await db.execute("DELETE FROM date_availability WHERE date LIKE '2026-09%'");
  await db.execute("DELETE FROM date_availability WHERE date LIKE '2026-10%'");
  await db.execute("DELETE FROM date_availability WHERE date LIKE '2026-11%'");
  await db.execute("DELETE FROM date_availability WHERE date LIKE '2026-12%'");

  // Insert all entries
  for (const entry of scheduleEntries) {
    await db.execute({
      sql: "INSERT INTO date_availability (date, start_time, end_time) VALUES (?, ?, ?)",
      args: [entry.date, entry.start_time, entry.end_time],
    });
  }

  return NextResponse.json({ success: true, count: scheduleEntries.length });
}
