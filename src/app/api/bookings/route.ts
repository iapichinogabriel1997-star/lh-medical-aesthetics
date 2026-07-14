import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { sendBookingEmailToOwner, sendBookingConfirmationToClient } from "@/lib/email";

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(m: number): string {
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode");
  const db = await getDb();

  if (mode === "admin") {
    const user = await verifyToken();
    if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    const result = await db.execute("SELECT * FROM bookings WHERE date >= date('now') ORDER BY date, time");
    return NextResponse.json(result.rows);
  }

  const date = req.nextUrl.searchParams.get("date");
  const duration = parseInt(req.nextUrl.searchParams.get("duration") || "30");

  if (!date) return NextResponse.json({ error: "Date requise" }, { status: 400 });

  const d = new Date(date + "T00:00:00");
  const dow = d.getDay();

  const availResult = await db.execute({ sql: "SELECT * FROM availability WHERE day_of_week = ?", args: [dow] });
  const avail = availResult.rows[0];

  if (!avail) return NextResponse.json([]);

  const openMin = timeToMinutes(avail.start_time as string);
  const closeMin = timeToMinutes(avail.end_time as string);

  const bookingsResult = await db.execute({ sql: "SELECT time, end_time FROM bookings WHERE date = ? AND status = 'confirmed'", args: [date] });
  const bookings = bookingsResult.rows;

  const blockedResult = await db.execute({ sql: "SELECT start_time, end_time FROM blocked_slots WHERE date = ?", args: [date] });
  const blocked = blockedResult.rows;

  const slots: string[] = [];
  for (let m = openMin; m + duration <= closeMin; m += 15) {
    const slotStart = m;
    const slotEnd = m + duration;

    const conflictBooking = bookings.some((b) => {
      const bStart = timeToMinutes(b.time as string);
      const bEnd = timeToMinutes(b.end_time as string);
      return slotStart < bEnd && slotEnd > bStart;
    });

    const conflictBlocked = blocked.some((b) => {
      const bStart = timeToMinutes(b.start_time as string);
      const bEnd = timeToMinutes(b.end_time as string);
      return slotStart < bEnd && slotEnd > bStart;
    });

    if (!conflictBooking && !conflictBlocked) {
      slots.push(minutesToTime(slotStart));
    }
  }

  return NextResponse.json(slots);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { services, date, time, firstName, lastName, email, phone, note } = body;

  if (!services?.length || !date || !time || !firstName || !lastName || !email || !phone) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const totalDuration = services.reduce((s: number, sv: { duration: number }) => s + sv.duration, 0);
  const endTime = minutesToTime(timeToMinutes(time) + totalDuration);

  const db = await getDb();

  const existing = await db.execute({ sql: "SELECT COUNT(*) as count FROM bookings WHERE date = ? AND status = 'confirmed' AND time < ? AND end_time > ?", args: [date, endTime, time] });
  if (Number(existing.rows[0].count) > 0) {
    return NextResponse.json({ error: "Ce créneau vient d'être réservé par quelqu'un d'autre. Veuillez en choisir un autre." }, { status: 409 });
  }

  const blockedConflict = await db.execute({ sql: "SELECT COUNT(*) as count FROM blocked_slots WHERE date = ? AND start_time < ? AND end_time > ?", args: [date, endTime, time] });
  if (Number(blockedConflict.rows[0].count) > 0) {
    return NextResponse.json({ error: "Ce créneau n'est plus disponible." }, { status: 409 });
  }

  let currentTime = time;
  for (const sv of services) {
    const svEnd = minutesToTime(timeToMinutes(currentTime) + sv.duration);
    await db.execute({
      sql: "INSERT INTO bookings (service_name, service_price, service_duration, date, time, end_time, first_name, last_name, email, phone, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [sv.name, sv.price, sv.duration, date, currentTime, svEnd, firstName, lastName, email, phone, note || ""],
    });
    currentTime = svEnd;
  }

  // Envoi des emails
  const totalPrice = services.reduce((s: number, sv: { price: number }) => s + sv.price, 0);
  const bookingDetails = {
    firstName,
    lastName,
    email,
    phone,
    date,
    time,
    endTime,
    services,
    total: totalPrice,
    note,
  };

  try {
    await Promise.all([
      sendBookingEmailToOwner(bookingDetails),
      sendBookingConfirmationToClient(bookingDetails),
    ]);
  } catch (emailError) {
    console.error("Erreur envoi email:", emailError);
    // On ne bloque pas la réservation si l'email échoue
  }

  return NextResponse.json({ success: true, message: "Réservation confirmée" });
}

export async function DELETE(req: NextRequest) {
  const user = await verifyToken();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  const db = await getDb();
  await db.execute({ sql: "UPDATE bookings SET status = 'cancelled' WHERE id = ?", args: [id] });
  return NextResponse.json({ success: true });
}
