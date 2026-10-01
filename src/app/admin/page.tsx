"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ────────────────────────────────────────────
   TYPES
   ──────────────────────────────────────────── */

interface Booking {
  id: number;
  service_name: string;
  service_price: number;
  service_duration: number;
  date: string;
  time: string;
  end_time: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  note: string;
  status: string;
  created_at: string;
}

interface BlockedSlot {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  reason: string;
}

interface AvailRow {
  id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface DateAvailRow {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
}

interface ServiceRow {
  id: number;
  category: string;
  name: string;
  price: number;
  duration: number;
  detail: string;
  featured: number;
  display_order: number;
}

const joursFR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const joursCourtsFR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const moisFR = ["jan.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sep.", "oct.", "nov.", "déc."];
const moisCompletsFR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function getCalendarDays(year: number, month: number): Array<{ date: string; day: number; currentMonth: boolean }> {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Monday = 0, Sunday = 6 (European week)
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const days: Array<{ date: string; day: number; currentMonth: boolean }> = [];

  // Previous month padding
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d.toISOString().split("T")[0], day: d.getDate(), currentMonth: false });
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dt = new Date(year, month, d);
    days.push({ date: dt.toISOString().split("T")[0], day: d, currentMonth: true });
  }

  // Next month padding (fill to complete last week)
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({ date: d.toISOString().split("T")[0], day: d.getDate(), currentMonth: false });
    }
  }

  return days;
}

/* ────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────── */

export default function Admin() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState<"bookings" | "blocked" | "hours" | "planning" | "tarifs">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocked, setBlocked] = useState<BlockedSlot[]>([]);
  const [availability, setAvailability] = useState<AvailRow[]>([]);
  const [dateAvailability, setDateAvailability] = useState<DateAvailRow[]>([]);

  // Services / Tarifs
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [editedServices, setEditedServices] = useState<Record<number, { price: number; duration: number; name: string }>>({});
  const [savingTarifs, setSavingTarifs] = useState(false);
  const [tarifsSaved, setTarifsSaved] = useState(false);

  // Block form
  const [blockDate, setBlockDate] = useState("");
  const [blockStart, setBlockStart] = useState("09:00");
  const [blockEnd, setBlockEnd] = useState("18:00");
  const [blockReason, setBlockReason] = useState("");

  // Hours edit
  const [editHours, setEditHours] = useState<Array<{ day: number; start: string; end: string; open: boolean }>>([]);

  // Calendar planning
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editRanges, setEditRanges] = useState<Array<{ start: string; end: string }>>([{ start: "10:00", end: "18:00" }]);
  const [saving, setSaving] = useState(false);

  /* ─── Auth check ─── */
  useEffect(() => {
    fetch("/api/auth/check")
      .then((r) => {
        if (r.ok) setAuthenticated(true);
      })
      .finally(() => setChecking(false));
  }, []);

  /* ─── Data fetching ─── */
  const fetchBookings = useCallback(async () => {
    const res = await fetch("/api/bookings?mode=admin");
    if (res.ok) setBookings(await res.json());
  }, []);

  const fetchBlocked = useCallback(async () => {
    const res = await fetch("/api/blocked-slots");
    if (res.ok) setBlocked(await res.json());
  }, []);

  const fetchDateAvailability = useCallback(async (year?: number, month?: number) => {
    const y = year ?? calYear;
    const m = month ?? calMonth;
    const monthStr = `${y}-${String(m + 1).padStart(2, "0")}`;
    const res = await fetch(`/api/date-availability?month=${monthStr}`);
    if (res.ok) setDateAvailability(await res.json());
  }, [calYear, calMonth]);

  const fetchServices = useCallback(async () => {
    const res = await fetch("/api/services");
    if (res.ok) {
      const data: ServiceRow[] = await res.json();
      setServices(data);
      setEditedServices({});
    }
  }, []);

  const fetchAvailability = useCallback(async () => {
    const res = await fetch("/api/availability");
    if (res.ok) {
      const data: AvailRow[] = await res.json();
      setAvailability(data);
      const hours = [];
      for (let d = 0; d <= 6; d++) {
        const row = data.find((a) => a.day_of_week === d);
        hours.push({ day: d, start: row?.start_time || "09:00", end: row?.end_time || "18:00", open: !!row });
      }
      setEditHours(hours);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchBookings();
      fetchBlocked();
      fetchAvailability();
      fetchDateAvailability();
      fetchServices();
    }
  }, [authenticated, fetchBookings, fetchBlocked, fetchAvailability, fetchDateAvailability, fetchServices]);

  /* ─── Login ─── */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      setLoginError("Identifiants incorrects");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
  }

  /* ─── Actions ─── */
  async function cancelBooking(id: number) {
    if (!confirm("Annuler cette réservation ?")) return;
    await fetch("/api/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchBookings();
  }

  async function addBlock() {
    if (!blockDate || !blockStart || !blockEnd) return;
    await fetch("/api/blocked-slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: blockDate, start_time: blockStart, end_time: blockEnd, reason: blockReason }),
    });
    setBlockDate("");
    setBlockReason("");
    fetchBlocked();
  }

  async function removeBlock(id: number) {
    await fetch("/api/blocked-slots", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchBlocked();
  }

  async function saveDateAvail() {
    if (!selectedDate) return;
    const validRanges = editRanges.filter((r) => r.start && r.end && r.start < r.end);
    if (validRanges.length === 0) return;
    setSaving(true);
    // Remove existing entries for this date, then add all ranges
    await fetch("/api/date-availability", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate }),
    });
    await fetch("/api/date-availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entries: validRanges.map((r) => ({ date: selectedDate, start_time: r.start, end_time: r.end })),
      }),
    });
    await fetchDateAvailability();
    setSaving(false);
  }

  async function removeDateAvail(date: string) {
    await fetch("/api/date-availability", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date }),
    });
    await fetchDateAvailability();
  }

  function navigateMonth(dir: number) {
    let newMonth = calMonth + dir;
    let newYear = calYear;
    if (newMonth > 11) { newMonth = 0; newYear++; }
    if (newMonth < 0) { newMonth = 11; newYear--; }
    setCalMonth(newMonth);
    setCalYear(newYear);
    setSelectedDate(null);
    fetchDateAvailability(newYear, newMonth);
  }

  function selectCalendarDay(dateStr: string) {
    setSelectedDate(dateStr);
    const existing = dateAvailability.filter((d) => d.date === dateStr);
    if (existing.length > 0) {
      setEditRanges(existing.map((e) => ({ start: e.start_time, end: e.end_time })));
    } else {
      setEditRanges([{ start: "10:00", end: "18:00" }]);
    }
  }

  async function saveHours() {
    const schedules = editHours.filter((h) => h.open).map((h) => ({
      day_of_week: h.day,
      start_time: h.start,
      end_time: h.end,
    }));
    await fetch("/api/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedules }),
    });
    fetchAvailability();
    alert("Horaires enregistrés !");
  }

  async function saveTarifs() {
    const changes = Object.entries(editedServices).map(([id, vals]) => ({
      id: Number(id),
      price: vals.price,
      duration: vals.duration,
      name: vals.name,
    }));
    if (changes.length === 0) return;
    setSavingTarifs(true);
    setTarifsSaved(false);
    await fetch("/api/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ services: changes }),
    });
    await fetchServices();
    setSavingTarifs(false);
    setTarifsSaved(true);
    setTimeout(() => setTarifsSaved(false), 3000);
  }

  function getServiceValue(svc: ServiceRow, field: "price" | "duration" | "name") {
    if (editedServices[svc.id]) return editedServices[svc.id][field];
    return svc[field];
  }

  function updateServiceField(svc: ServiceRow, field: "price" | "duration" | "name", value: number | string) {
    setEditedServices((prev) => ({
      ...prev,
      [svc.id]: {
        price: prev[svc.id]?.price ?? svc.price,
        duration: prev[svc.id]?.duration ?? svc.duration,
        name: prev[svc.id]?.name ?? svc.name,
        [field]: value,
      },
    }));
  }

  function formatDateFR(dateStr: string) {
    const d = new Date(dateStr + "T00:00:00");
    return `${joursFR[d.getDay()]} ${d.getDate()} ${moisFR[d.getMonth()]} ${d.getFullYear()}`;
  }

  /* ─── Styles ─── */
  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: isMobile ? "0.6rem 0" : "0.8rem 1.5rem",
    fontSize: isMobile ? "0.65rem" : "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    background: active ? "#000" : "transparent",
    color: active ? "#fff" : "#666",
    border: active ? "none" : "1px solid #ddd",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
    ...(isMobile ? { flex: "1 1 45%", textAlign: "center" as const } : {}),
  });

  /* ═══════════════════════════════════════════
     LOGIN SCREEN
     ═══════════════════════════════════════════ */
  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#999" }}>Chargement...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f8f8" }}>
        <div style={{ width: "100%", maxWidth: "380px", padding: "3rem", background: "#fff", border: "1px solid #eee" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Image src="/images/logo.svg" alt="LH" width={40} height={40} style={{ margin: "0 auto 1rem" }} />
            <h1 style={{ fontSize: "1.2rem", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Administration
            </h1>
          </div>
          {loginError && (
            <div style={{ padding: "0.8rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#c0392b", marginBottom: "1rem", fontSize: "0.85rem", textAlign: "center" }}>
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Utilisateur</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", fontSize: "0.9rem", fontFamily: "inherit", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", fontSize: "0.9rem", fontFamily: "inherit", outline: "none" }} />
            </div>
            <button type="submit" style={{ padding: "0.9rem", background: "#000", color: "#fff", border: "none", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════
     DASHBOARD
     ═══════════════════════════════════════════ */
  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f8" }}>
      {/* Admin header */}
      <div style={{ background: "#000", color: "#fff", padding: isMobile ? "5rem 1rem 1rem" : "5.5rem 2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image src="/images/logo.svg" alt="LH" width={28} height={28} style={{ filter: "invert(1)" }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300 }}>
            Dashboard Admin
          </span>
        </div>
        <button onClick={handleLogout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0.5rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>
          Déconnexion
        </button>
      </div>

      {/* Tabs */}
      <div style={{ padding: isMobile ? "1rem" : "1.5rem 2rem", display: "flex", gap: isMobile ? "0.4rem" : "0.5rem", maxWidth: "1100px", margin: "0 auto", flexWrap: "wrap" }}>
        <button onClick={() => setTab("bookings")} style={tabStyle(tab === "bookings")}>Réservations</button>
        <button onClick={() => setTab("planning")} style={tabStyle(tab === "planning")}>Planning</button>
        <button onClick={() => setTab("blocked")} style={tabStyle(tab === "blocked")}>Blocages</button>
        <button onClick={() => setTab("hours")} style={tabStyle(tab === "hours")}>Horaires</button>
        <button onClick={() => setTab("tarifs")} style={tabStyle(tab === "tarifs")}>Tarifs</button>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 0.8rem 3rem" : "0 2rem 4rem", overflow: "hidden", boxSizing: "border-box" }}>

        {/* ═══════ TAB: Réservations ═══════ */}
        {tab === "bookings" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
              Réservations à venir ({bookings.filter((b) => b.status === "confirmed").length})
            </h2>
            {bookings.filter((b) => b.status === "confirmed").length === 0 ? (
              <div style={{ padding: "3rem", textAlign: "center", background: "#fff", border: "1px solid #eee", color: "#999" }}>
                Aucune réservation à venir.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {bookings.filter((b) => b.status === "confirmed").map((b) => (
                  <div key={b.id} style={{ background: "#fff", border: "1px solid #eee", padding: isMobile ? "1rem" : "1.5rem", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ flex: 1, minWidth: isMobile ? "0" : "200px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.5rem" }}>
                        <span style={{ fontSize: "1rem", fontWeight: 500 }}>{b.first_name} {b.last_name}</span>
                        <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", background: "#e8f5e9", color: "#2e7d32", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {b.status}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#666", marginBottom: "0.3rem" }}>
                        {formatDateFR(b.date)} · {b.time} - {b.end_time}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#888" }}>
                        {b.service_name} · {b.service_price}€ · {b.service_duration} min
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "0.3rem" }}>
                        {b.email} · {b.phone}
                      </div>
                      {b.note && <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.3rem", fontStyle: "italic" }}>Note: {b.note}</div>}
                    </div>
                    <button
                      onClick={() => cancelBooking(b.id)}
                      style={{ padding: "0.5rem 1rem", border: "1px solid #e74c3c", color: "#e74c3c", background: "#fff", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
                    >
                      Annuler
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════ TAB: Planning (Calendrier) ═══════ */}
        {tab === "planning" && (() => {
          const calDays = getCalendarDays(calYear, calMonth);
          const availByDate: Record<string, DateAvailRow[]> = {};
          dateAvailability.forEach((d) => {
            if (!availByDate[d.date]) availByDate[d.date] = [];
            availByDate[d.date].push(d);
          });
          const today = new Date().toISOString().split("T")[0];

          return (
            <div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                Planning
              </h2>
              <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "2rem" }}>
                Cliquez sur un jour pour définir les horaires. Les jours verts sont ouverts, les gris sont fermés.
              </p>

              {/* Month navigation */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", background: "#fff", border: "1px solid #eee", padding: isMobile ? "0.8rem" : "1rem 1.5rem" }}>
                <button
                  onClick={() => navigateMonth(-1)}
                  style={{ background: "none", border: "1px solid #ddd", padding: "0.5rem 1rem", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", color: "#666" }}
                >
                  &larr;
                </button>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.05em", margin: 0 }}>
                  {moisCompletsFR[calMonth]} {calYear}
                </h3>
                <button
                  onClick={() => navigateMonth(1)}
                  style={{ background: "none", border: "1px solid #ddd", padding: "0.5rem 1rem", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", color: "#666" }}
                >
                  &rarr;
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "1.5rem", flexWrap: "wrap" }}>
                {/* Calendar grid */}
                <div style={{ flex: "1 1 auto", width: "100%", background: "#fff", border: "1px solid #eee", padding: isMobile ? "0.5rem" : "1.5rem", overflow: "hidden", minWidth: 0, boxSizing: "border-box" }}>
                  {/* Day headers */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "2px", marginBottom: "2px" }}>
                    {joursCourtsFR.map((j) => (
                      <div key={j} style={{ textAlign: "center", padding: "0.5rem", fontSize: isMobile ? "0.6rem" : "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", fontWeight: 500, overflow: "hidden" }}>
                        {j}
                      </div>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "2px" }}>
                    {calDays.map((day) => {
                      const hasAvail = !!availByDate[day.date];
                      const isSelected = selectedDate === day.date;
                      const isToday = day.date === today;
                      const entries = availByDate[day.date] || [];

                      return (
                        <button
                          key={day.date}
                          onClick={() => day.currentMonth && selectCalendarDay(day.date)}
                          style={{
                            padding: isMobile ? "0.3rem 0.15rem" : "0.4rem 0.2rem",
                            minHeight: isMobile ? "44px" : "70px",
                            border: isSelected ? "2px solid #000" : "1px solid #f0f0f0",
                            background: !day.currentMonth ? "#fafafa" : hasAvail ? "#e8f5e9" : "#fff",
                            cursor: day.currentMonth ? "pointer" : "default",
                            fontFamily: "inherit",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: isMobile ? "2px" : "2px",
                            opacity: day.currentMonth ? 1 : 0.35,
                            position: "relative",
                            transition: "all 0.15s ease",
                            overflow: "hidden",
                            minWidth: 0,
                          }}
                        >
                          <span style={{
                            fontSize: isMobile ? "0.75rem" : "0.9rem",
                            fontWeight: isToday ? 700 : hasAvail ? 500 : 400,
                            color: hasAvail ? "#2e7d32" : day.currentMonth ? "#666" : "#ccc",
                            width: isMobile ? "24px" : "28px",
                            height: isMobile ? "24px" : "28px",
                            lineHeight: isMobile ? "24px" : "28px",
                            borderRadius: "50%",
                            background: isToday ? "#000" : "transparent",
                            ...(isToday ? { color: "#fff" } : {}),
                          }}>
                            {day.day}
                          </span>
                          {hasAvail && (
                            <span style={{ width: isMobile ? "6px" : "8px", height: isMobile ? "6px" : "8px", borderRadius: "50%", background: "#2e7d32" }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Day editor panel */}
                <div style={{ flex: isMobile ? "1 1 100%" : "0 0 300px", minWidth: isMobile ? "0" : "280px" }}>
                  {selectedDate ? (() => {
                    const hasAvail = !!availByDate[selectedDate];
                    return (
                      <div style={{ background: "#fff", border: "1px solid #eee", padding: "1.5rem", position: "sticky", top: "100px" }}>
                        <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>
                          Modifier le jour
                        </h3>
                        <p style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "1rem" }}>
                          {formatDateFR(selectedDate)}
                        </p>

                        <div style={{
                          padding: "0.6rem",
                          marginBottom: "1.5rem",
                          fontSize: "0.8rem",
                          textAlign: "center",
                          background: hasAvail ? "#e8f5e9" : "#f5f5f5",
                          color: hasAvail ? "#2e7d32" : "#999",
                          border: `1px solid ${hasAvail ? "#c8e6c9" : "#eee"}`,
                        }}>
                          {hasAvail ? `Ouvert (${availByDate[selectedDate].length} plage${availByDate[selectedDate].length > 1 ? "s" : ""})` : "Fermé"}
                        </div>

                        {/* Time ranges */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1rem" }}>
                          {editRanges.map((range, idx) => (
                            <div key={idx} style={{ padding: "0.8rem", background: "#fafafa", border: "1px solid #f0f0f0" }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>
                                  Plage {idx + 1}
                                </span>
                                {editRanges.length > 1 && (
                                  <button
                                    onClick={() => setEditRanges(editRanges.filter((_, i) => i !== idx))}
                                    style={{ background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: "0.75rem", fontFamily: "inherit", padding: "0 4px" }}
                                  >
                                    Supprimer
                                  </button>
                                )}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <input
                                  type="time"
                                  value={range.start}
                                  onChange={(e) => {
                                    const next = [...editRanges];
                                    next[idx] = { ...next[idx], start: e.target.value };
                                    setEditRanges(next);
                                  }}
                                  style={{ flex: 1, padding: "0.5rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.85rem" }}
                                />
                                <span style={{ color: "#ccc", fontSize: "0.8rem" }}>—</span>
                                <input
                                  type="time"
                                  value={range.end}
                                  onChange={(e) => {
                                    const next = [...editRanges];
                                    next[idx] = { ...next[idx], end: e.target.value };
                                    setEditRanges(next);
                                  }}
                                  style={{ flex: 1, padding: "0.5rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.85rem" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add range button */}
                        <button
                          onClick={() => setEditRanges([...editRanges, { start: "14:00", end: "18:00" }])}
                          style={{ width: "100%", padding: "0.5rem", background: "none", border: "1px dashed #ccc", color: "#888", fontSize: "0.75rem", cursor: "pointer", fontFamily: "inherit", marginBottom: "1.5rem" }}
                        >
                          + Ajouter une plage
                        </button>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                          <button
                            onClick={saveDateAvail}
                            disabled={saving}
                            style={{ padding: "0.7rem", background: "#000", color: "#fff", border: "none", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: saving ? "wait" : "pointer", fontFamily: "inherit", opacity: saving ? 0.6 : 1 }}
                          >
                            {saving ? "..." : hasAvail ? "Enregistrer" : "Ouvrir ce jour"}
                          </button>
                          {hasAvail && (
                            <button
                              onClick={() => removeDateAvail(selectedDate)}
                              style={{ padding: "0.7rem", background: "#fff", color: "#e74c3c", border: "1px solid #e74c3c", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
                            >
                              Fermer ce jour
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })() : (
                    <div style={{ background: "#fff", border: "1px solid #eee", padding: "2rem", textAlign: "center", color: "#999" }}>
                      <p style={{ fontSize: "0.85rem" }}>Sélectionnez un jour dans le calendrier pour modifier ses horaires.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Info notice */}
              <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", background: "#fffde7", border: "1px solid #fff9c4", fontSize: "0.85rem", color: "#666" }}>
                Si un mois contient au moins une date planifiée, les horaires hebdomadaires ne s&apos;appliqueront pas pour ce mois — seuls les jours définis ici seront ouverts.
              </div>
            </div>
          );
        })()}

        {/* ═══════ TAB: Blocages ═══════ */}
        {tab === "blocked" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
              Bloquer des créneaux
            </h2>
            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Bloquez des plages horaires pour les rendre indisponibles à la réservation (congés, pause, etc.).
            </p>

            {/* Add block form */}
            <div style={{ background: "#fff", border: "1px solid #eee", padding: isMobile ? "1rem" : "1.5rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                Nouveau blocage
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.3rem" }}>Date</label>
                  <input type="date" value={blockDate} onChange={(e) => setBlockDate(e.target.value)} style={{ width: "100%", padding: "0.7rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.9rem" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.3rem" }}>De</label>
                  <input type="time" value={blockStart} onChange={(e) => setBlockStart(e.target.value)} style={{ width: "100%", padding: "0.7rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.9rem" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.3rem" }}>À</label>
                  <input type="time" value={blockEnd} onChange={(e) => setBlockEnd(e.target.value)} style={{ width: "100%", padding: "0.7rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.9rem" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "0.3rem" }}>Raison (optionnel)</label>
                  <input type="text" value={blockReason} onChange={(e) => setBlockReason(e.target.value)} placeholder="Ex: Pause déjeuner" style={{ width: "100%", padding: "0.7rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.9rem" }} />
                </div>
              </div>
              <button
                onClick={addBlock}
                style={{ padding: "0.7rem 2rem", background: "#000", color: "#fff", border: "none", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", ...(isMobile ? { width: "100%" } : {}) }}
              >
                Bloquer ce créneau
              </button>
            </div>

            {/* Existing blocks */}
            <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
              Blocages actifs
            </h3>
            {blocked.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", background: "#fff", border: "1px solid #eee", color: "#999" }}>
                Aucun blocage en cours.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {blocked.map((b) => (
                  <div key={b.id} style={{ background: "#fff", border: "1px solid #eee", padding: isMobile ? "0.8rem" : "1rem 1.5rem", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: isMobile ? "0.6rem" : "0" }}>
                    <div>
                      <span style={{ fontWeight: 500, fontSize: isMobile ? "0.85rem" : "inherit" }}>{formatDateFR(b.date)}</span>
                      <span style={{ color: "#888", marginLeft: isMobile ? "0.5rem" : "1rem", fontSize: isMobile ? "0.8rem" : "inherit" }}>{b.start_time} - {b.end_time}</span>
                      {b.reason && <span style={{ color: "#aaa", marginLeft: isMobile ? "0" : "1rem", fontStyle: "italic", fontSize: isMobile ? "0.8rem" : "inherit", ...(isMobile ? { display: "block", marginTop: "0.2rem" } : {}) }}>{b.reason}</span>}
                    </div>
                    <button
                      onClick={() => removeBlock(b.id)}
                      style={{ padding: "0.4rem 0.8rem", border: "1px solid #ddd", background: "#fff", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit", color: "#e74c3c" }}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════ TAB: Horaires ═══════ */}
        {tab === "hours" && (
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
              Horaires d&apos;ouverture
            </h2>
            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Définissez les jours et heures où les clients peuvent réserver.
            </p>

            <div style={{ background: "#fff", border: "1px solid #eee", padding: isMobile ? "1rem" : "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {editHours.map((h, idx) => (
                  <div key={h.day} style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "0.6rem" : "1rem", padding: "0.8rem 0", borderBottom: idx < 6 ? "1px solid #f0f0f0" : "none", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "space-between" : "flex-start" }}>
                      <label style={{ width: isMobile ? "auto" : "100px", fontSize: "0.9rem", fontWeight: h.open ? 500 : 400, color: h.open ? "#000" : "#ccc" }}>
                        {joursFR[h.day]}
                      </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={h.open}
                        onChange={(e) => {
                          const next = [...editHours];
                          next[idx] = { ...next[idx], open: e.target.checked };
                          setEditHours(next);
                        }}
                        style={{ width: "18px", height: "18px", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "0.8rem", color: "#888" }}>{h.open ? "Ouvert" : "Fermé"}</span>
                    </label>
                    </div>
                    {h.open && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", ...(isMobile ? { width: "100%" } : {}) }}>
                        <input
                          type="time"
                          value={h.start}
                          onChange={(e) => {
                            const next = [...editHours];
                            next[idx] = { ...next[idx], start: e.target.value };
                            setEditHours(next);
                          }}
                          style={{ padding: "0.5rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.85rem", ...(isMobile ? { flex: 1 } : {}) }}
                        />
                        <span style={{ color: "#ccc" }}>—</span>
                        <input
                          type="time"
                          value={h.end}
                          onChange={(e) => {
                            const next = [...editHours];
                            next[idx] = { ...next[idx], end: e.target.value };
                            setEditHours(next);
                          }}
                          style={{ padding: "0.5rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.85rem", ...(isMobile ? { flex: 1 } : {}) }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={saveHours}
                style={{ marginTop: "1.5rem", padding: "0.8rem 2.5rem", background: "#000", color: "#fff", border: "none", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
              >
                Enregistrer les horaires
              </button>
            </div>
          </div>
        )}

        {/* ═══════ TAB: Tarifs ═══════ */}
        {tab === "tarifs" && (() => {
          const categoryOrder = ["Zones individuelles", "Visage & Nuque", "Forfaits Laser", "Cryolipolyse", "Radiofréquence", "Lipocavitation", "Forfaits combinés"];
          const grouped: Record<string, ServiceRow[]> = {};
          services.forEach((s) => {
            if (!grouped[s.category]) grouped[s.category] = [];
            grouped[s.category].push(s);
          });
          const hasChanges = Object.keys(editedServices).length > 0;

          return (
            <div>
              <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", marginBottom: "1.5rem", flexDirection: isMobile ? "column" : "row", gap: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "0.3rem" }}>
                    Tarifs &amp; Durées
                  </h2>
                  <p style={{ color: "#888", fontSize: "0.9rem", margin: 0 }}>
                    Modifiez les prix et durées des prestations. Les changements seront visibles sur le site et la page de réservation.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexShrink: 0 }}>
                  {tarifsSaved && (
                    <span style={{ fontSize: "0.8rem", color: "#2e7d32" }}>Enregistré !</span>
                  )}
                  <button
                    onClick={saveTarifs}
                    disabled={!hasChanges || savingTarifs}
                    style={{
                      padding: "0.7rem 2rem",
                      background: hasChanges ? "#000" : "#ccc",
                      color: "#fff",
                      border: "none",
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: hasChanges && !savingTarifs ? "pointer" : "default",
                      fontFamily: "inherit",
                      opacity: savingTarifs ? 0.6 : 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {savingTarifs ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </div>
              </div>

              {categoryOrder.map((cat) => {
                const items = grouped[cat];
                if (!items || items.length === 0) return null;
                return (
                  <div key={cat} style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem", paddingBottom: "0.5rem", borderBottom: "1px solid #eee" }}>
                      {cat}
                    </h3>
                    <div style={{ background: "#fff", border: "1px solid #eee" }}>
                      {/* Header row - desktop only */}
                      {!isMobile && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: "1rem", padding: "0.6rem 1.2rem", borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
                          <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>Prestation</span>
                          <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", textAlign: "center" }}>Prix (€)</span>
                          <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", textAlign: "center" }}>Durée (min)</span>
                        </div>
                      )}
                      {items.map((svc, idx) => {
                        const price = getServiceValue(svc, "price");
                        const duration = getServiceValue(svc, "duration");
                        const isEdited = !!editedServices[svc.id];
                        return (
                          <div
                            key={svc.id}
                            style={{
                              display: isMobile ? "flex" : "grid",
                              gridTemplateColumns: isMobile ? undefined : "1fr 120px 120px",
                              flexDirection: isMobile ? "column" : undefined,
                              gap: isMobile ? "0.5rem" : "1rem",
                              padding: isMobile ? "1rem" : "0.8rem 1.2rem",
                              borderBottom: idx < items.length - 1 ? "1px solid #f0f0f0" : "none",
                              alignItems: isMobile ? "stretch" : "center",
                              background: isEdited ? "#fffde7" : "transparent",
                              transition: "background 0.2s ease",
                            }}
                          >
                            <div>
                              <input
                                type="text"
                                value={getServiceValue(svc, "name")}
                                onChange={(e) => updateServiceField(svc, "name", e.target.value)}
                                style={{
                                  width: "100%",
                                  padding: "0.3rem 0.4rem",
                                  border: "1px solid #eee",
                                  fontSize: "0.9rem",
                                  fontFamily: "inherit",
                                  outline: "none",
                                  background: "transparent",
                                }}
                              />
                              {svc.detail && (
                                <span style={{ fontSize: "0.75rem", color: "#aaa", display: "block", marginTop: "0.15rem" }}>{svc.detail}</span>
                              )}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "1rem" : "0", justifyContent: isMobile ? "flex-start" : "center" }}>
                              {isMobile && <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", width: "70px" }}>Prix (€)</span>}
                              <input
                                type="number"
                                min={0}
                                value={price}
                                onChange={(e) => updateServiceField(svc, "price", Number(e.target.value))}
                                style={{
                                  width: isMobile ? "80px" : "80px",
                                  padding: "0.4rem 0.5rem",
                                  border: "1px solid #ddd",
                                  fontSize: "0.9rem",
                                  fontFamily: "inherit",
                                  textAlign: "center",
                                  outline: "none",
                                }}
                              />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "1rem" : "0", justifyContent: isMobile ? "flex-start" : "center" }}>
                              {isMobile && <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", width: "70px" }}>Durée (min)</span>}
                              <input
                                type="number"
                                min={5}
                                step={5}
                                value={duration}
                                onChange={(e) => updateServiceField(svc, "duration", Number(e.target.value))}
                                style={{
                                  width: isMobile ? "80px" : "80px",
                                  padding: "0.4rem 0.5rem",
                                  border: "1px solid #ddd",
                                  fontSize: "0.9rem",
                                  fontFamily: "inherit",
                                  textAlign: "center",
                                  outline: "none",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {hasChanges && (
                <div style={{ position: "sticky", bottom: 0, padding: "1rem", background: "#fff", borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end", gap: "1rem", boxShadow: "0 -4px 20px rgba(0,0,0,0.05)" }}>
                  <button
                    onClick={() => setEditedServices({})}
                    style={{ padding: "0.7rem 1.5rem", background: "#fff", color: "#666", border: "1px solid #ddd", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={saveTarifs}
                    disabled={savingTarifs}
                    style={{ padding: "0.7rem 2rem", background: "#000", color: "#fff", border: "none", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: savingTarifs ? "wait" : "pointer", fontFamily: "inherit", opacity: savingTarifs ? 0.6 : 1 }}
                  >
                    {savingTarifs ? "Enregistrement..." : "Enregistrer les modifications"}
                  </button>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
