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

const joursFR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const moisFR = ["jan.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sep.", "oct.", "nov.", "déc."];

/* ────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────── */

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState<"bookings" | "blocked" | "hours">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocked, setBlocked] = useState<BlockedSlot[]>([]);
  const [availability, setAvailability] = useState<AvailRow[]>([]);

  // Block form
  const [blockDate, setBlockDate] = useState("");
  const [blockStart, setBlockStart] = useState("09:00");
  const [blockEnd, setBlockEnd] = useState("18:00");
  const [blockReason, setBlockReason] = useState("");

  // Hours edit
  const [editHours, setEditHours] = useState<Array<{ day: number; start: string; end: string; open: boolean }>>([]);

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
    }
  }, [authenticated, fetchBookings, fetchBlocked, fetchAvailability]);

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

  function formatDateFR(dateStr: string) {
    const d = new Date(dateStr + "T00:00:00");
    return `${joursFR[d.getDay()]} ${d.getDate()} ${moisFR[d.getMonth()]} ${d.getFullYear()}`;
  }

  /* ─── Styles ─── */
  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "0.8rem 1.5rem",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    background: active ? "#000" : "transparent",
    color: active ? "#fff" : "#666",
    border: active ? "none" : "1px solid #ddd",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
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
      <div style={{ background: "#000", color: "#fff", padding: "5.5rem 2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "100%" }}>
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
      <div style={{ padding: "1.5rem 2rem", display: "flex", gap: "0.5rem", maxWidth: "1100px", margin: "0 auto", flexWrap: "wrap" }}>
        <button onClick={() => setTab("bookings")} style={tabStyle(tab === "bookings")}>Réservations</button>
        <button onClick={() => setTab("blocked")} style={tabStyle(tab === "blocked")}>Blocages</button>
        <button onClick={() => setTab("hours")} style={tabStyle(tab === "hours")}>Horaires</button>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem 4rem" }}>

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
                  <div key={b.id} style={{ background: "#fff", border: "1px solid #eee", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ flex: 1, minWidth: "200px" }}>
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
            <div style={{ background: "#fff", border: "1px solid #eee", padding: "1.5rem", marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                Nouveau blocage
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
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
                style={{ padding: "0.7rem 2rem", background: "#000", color: "#fff", border: "none", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
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
                  <div key={b.id} style={{ background: "#fff", border: "1px solid #eee", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontWeight: 500 }}>{formatDateFR(b.date)}</span>
                      <span style={{ color: "#888", marginLeft: "1rem" }}>{b.start_time} - {b.end_time}</span>
                      {b.reason && <span style={{ color: "#aaa", marginLeft: "1rem", fontStyle: "italic" }}>{b.reason}</span>}
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

            <div style={{ background: "#fff", border: "1px solid #eee", padding: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {editHours.map((h, idx) => (
                  <div key={h.day} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.8rem 0", borderBottom: idx < 6 ? "1px solid #f0f0f0" : "none", flexWrap: "wrap" }}>
                    <label style={{ width: "100px", fontSize: "0.9rem", fontWeight: h.open ? 500 : 400, color: h.open ? "#000" : "#ccc" }}>
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
                    {h.open && (
                      <>
                        <input
                          type="time"
                          value={h.start}
                          onChange={(e) => {
                            const next = [...editHours];
                            next[idx] = { ...next[idx], start: e.target.value };
                            setEditHours(next);
                          }}
                          style={{ padding: "0.5rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.85rem" }}
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
                          style={{ padding: "0.5rem", border: "1px solid #ddd", fontFamily: "inherit", fontSize: "0.85rem" }}
                        />
                      </>
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
      </div>
    </div>
  );
}
