"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

interface Service {
  name: string;
  price: number;
  duration: number;
}

interface Category {
  name: string;
  services: Service[];
}

const categories: Category[] = [
  {
    name: "Zones individuelles",
    services: [
      { name: "Aisselles", price: 40, duration: 15 },
      { name: "Pieds", price: 20, duration: 10 },
      { name: "Mains (Doigts)", price: 20, duration: 10 },
      { name: "Sillon inter-fessier", price: 35, duration: 15 },
      { name: "Maillot simple échancré", price: 35, duration: 20 },
      { name: "Maillot intégral", price: 50, duration: 25 },
      { name: "Cuisses", price: 45, duration: 25 },
      { name: "Demi-jambes / Genoux", price: 50, duration: 25 },
      { name: "Jambes complètes", price: 70, duration: 40 },
      { name: "Demi-bras", price: 35, duration: 15 },
      { name: "Bras complet (sans aisselles)", price: 50, duration: 25 },
      { name: "Dos", price: 90, duration: 40 },
      { name: "Ligne abdominale", price: 20, duration: 10 },
    ],
  },
  {
    name: "Visage & Nuque",
    services: [
      { name: "Nuque", price: 35, duration: 15 },
      { name: "Lèvre supérieure", price: 25, duration: 10 },
      { name: "Barbe", price: 50, duration: 25 },
      { name: "Duvet", price: 30, duration: 15 },
    ],
  },
  {
    name: "Forfaits Laser",
    services: [
      { name: "Forfait 1 — Bikini, Sif, Aisselles", price: 90, duration: 45 },
      { name: "Forfait 2 — Bikini, Sif, Aisselles, Demi-jambes", price: 130, duration: 60 },
      { name: "Forfait 3 — Bikini, Sif, Ligne abdo, Aisselles, Jambes", price: 150, duration: 75 },
      { name: "Forfait 4 — Tout le corps", price: 180, duration: 90 },
    ],
  },
  {
    name: "Cryolipolyse",
    services: [
      { name: "Cryolipolyse — 1 zone", price: 150, duration: 60 },
      { name: "Cryolipolyse — 2 zones", price: 250, duration: 90 },
      { name: "Cryolipolyse — 3 zones", price: 350, duration: 120 },
    ],
  },
  {
    name: "Radiofréquence",
    services: [
      { name: "Radiofréquence — Visage", price: 80, duration: 30 },
      { name: "Radiofréquence — Corps (1 zone)", price: 90, duration: 40 },
      { name: "Radiofréquence — Corps (2 zones)", price: 150, duration: 60 },
    ],
  },
  {
    name: "Lipocavitation",
    services: [
      { name: "Lipocavitation — 1 zone", price: 80, duration: 30 },
      { name: "Lipocavitation — 2 zones", price: 140, duration: 50 },
    ],
  },
  {
    name: "Forfaits Cryo / RF / Lipo",
    services: [
      { name: "Forfait Cryo + RF (1 zone)", price: 200, duration: 90 },
      { name: "Forfait Cryo + RF + Lipo (1 zone)", price: 250, duration: 120 },
    ],
  },
];

const moisFR = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

/* ────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────── */

export default function Reservation() {
  const [step, setStep] = useState(1);

  // Step 1
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [openCategory, setOpenCategory] = useState<string>(categories[0].name);

  // Step 2
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [closedDay, setClosedDay] = useState(false);

  // Step 3
  const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", phone: "", note: "" });

  // Step 4
  const [confirmed, setConfirmed] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = selectedServices.reduce((s, sv) => s + sv.price, 0);
  const totalDuration = selectedServices.reduce((s, sv) => s + sv.duration, 0);

  /* ─── Fetch available slots when date changes ─── */
  const fetchSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    setClosedDay(false);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    try {
      const res = await fetch(`/api/bookings?date=${dateStr}&duration=${totalDuration}`);
      const slots: string[] = await res.json();
      setAvailableSlots(slots);
      if (slots.length === 0) setClosedDay(true);
    } catch {
      setAvailableSlots([]);
    }
    setLoadingSlots(false);
  }, [totalDuration]);

  useEffect(() => {
    if (selectedDate && step === 2) {
      fetchSlots(selectedDate);
    }
  }, [selectedDate, step, fetchSlots]);

  /* ─── Calendar helpers ─── */
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const days: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [currentMonth]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isDaySelectable(day: number) {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return d >= today;
  }

  function isSelected(day: number) {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  }

  function toggleService(s: Service) {
    setSelectedServices((prev) =>
      prev.find((x) => x.name === s.name) ? prev.filter((x) => x.name !== s.name) : [...prev, s]
    );
  }

  function formatDate(d: Date) {
    const dayName = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"][d.getDay()];
    return `${dayName} ${d.getDate()} ${moisFR[d.getMonth()].toLowerCase()} ${d.getFullYear()}`;
  }

  function endTime(startTime: string, durationMin: number) {
    const [h, m] = startTime.split(":").map(Number);
    const totalMin = h * 60 + m + durationMin;
    return `${String(Math.floor(totalMin / 60)).padStart(2, "0")}:${String(totalMin % 60).padStart(2, "0")}`;
  }

  async function handleConfirm() {
    setSubmitting(true);
    setBookingError("");
    const dateStr = selectedDate
      ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedServices,
          date: dateStr,
          time: selectedTime,
          firstName: info.firstName,
          lastName: info.lastName,
          email: info.email,
          phone: info.phone,
          note: info.note,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setBookingError(err.error || "Erreur lors de la réservation");
        setSubmitting(false);
        return;
      }

      setConfirmed(true);
      setStep(4);
    } catch {
      setBookingError("Erreur de connexion. Veuillez réessayer.");
    }
    setSubmitting(false);
  }

  const canProceedStep2 = selectedDate && selectedTime;
  const canProceedStep3 = info.firstName && info.lastName && info.email && info.phone;

  const stepsLabels = ["Prestation", "Date & Heure", "Vos informations", "Confirmation"];

  return (
    <>
      {/* Header */}
      <section style={{ background: "#000", color: "#fff", padding: "7rem 2rem 2rem", textAlign: "center" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff", marginBottom: "1.5rem" }}>
          <Image src="/images/logo.svg" alt="LH" width={28} height={28} style={{ filter: "invert(1)" }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 300 }}>
            LH Medical Aesthetics
          </span>
        </Link>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Réservation en ligne
        </h1>
      </section>

      {/* Steps indicator */}
      <div style={{ background: "#f8f8f8", borderBottom: "1px solid #eee", padding: "1.5rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {stepsLabels.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 600,
                background: step >= i + 1 ? "#000" : "#ddd", color: step >= i + 1 ? "#fff" : "#999",
              }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.05em", color: step === i + 1 ? "#000" : "#aaa", fontWeight: step === i + 1 ? 500 : 400 }}>
                {s}
              </span>
              {i < stepsLabels.length - 1 && (
                <div style={{ width: "30px", height: "1px", background: step > i + 1 ? "#000" : "#ddd", margin: "0 0.3rem" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <section style={{ minHeight: "60vh", background: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 2rem 8rem" }}>

          {/* ═══════ STEP 1 ═══════ */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "2rem" }}>
                Choisissez vos prestations
              </h2>
              <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 280px" }}>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setOpenCategory(openCategory === cat.name ? "" : cat.name)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                        padding: "1rem 0", background: "none", border: "none", borderBottom: "1px solid #eee",
                        cursor: "pointer", textAlign: "left", fontFamily: "inherit", fontSize: "0.9rem",
                        fontWeight: openCategory === cat.name ? 600 : 400,
                        color: openCategory === cat.name ? "#000" : "#555",
                      }}
                    >
                      {cat.name}
                      <svg style={{ width: "16px", height: "16px", transform: openCategory === cat.name ? "rotate(90deg)" : "none", transition: "transform 0.2s ease", color: "#aaa" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, minWidth: "300px" }}>
                  {categories.filter((c) => c.name === openCategory).map((cat) =>
                    cat.services.map((s) => {
                      const isActive = selectedServices.some((x) => x.name === s.name);
                      return (
                        <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid #f0f0f0" }}>
                          <div>
                            <span style={{ fontSize: "0.95rem" }}>{s.name}</span>
                            <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.2rem" }}>{s.price} € · {s.duration} min</div>
                          </div>
                          <button
                            onClick={() => toggleService(s)}
                            style={{
                              padding: "0.6rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase",
                              border: isActive ? "none" : "1px solid #000",
                              background: isActive ? "#000" : "#fff", color: isActive ? "#fff" : "#000",
                              cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s ease",
                            }}
                          >
                            {isActive ? "✓ Sélectionné" : "Sélectionner"}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══════ STEP 2 ═══════ */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "2rem" }}>
                Sélectionnez une date et une heure
              </h2>
              <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 300px" }}>
                  <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                    Votre sélection
                  </h3>
                  {selectedServices.map((s) => (
                    <div key={s.name} style={{ padding: "0.8rem 1rem", background: "#f8f8f8", marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: "0.9rem" }}>{s.name}</span>
                        <div style={{ fontSize: "0.75rem", color: "#999" }}>{s.duration} min</div>
                      </div>
                      <span style={{ fontWeight: 500 }}>{s.price}€</span>
                    </div>
                  ))}
                  <div style={{ padding: "0.8rem 1rem", borderTop: "2px solid #000", marginTop: "0.5rem", display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                    <span>Total · {totalDuration} min</span>
                    <span>{total}€</span>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: "320px" }}>
                  {/* Month nav */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                    <button onClick={() => { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); setSelectedDate(null); setSelectedTime(null); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", fontSize: "1.2rem" }}>‹</button>
                    <span style={{ fontSize: "1.1rem", fontWeight: 400 }}>{moisFR[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                    <button onClick={() => { setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); setSelectedDate(null); setSelectedTime(null); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", fontSize: "1.2rem" }}>›</button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "0.5rem" }}>
                    {["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"].map((d) => (
                      <span key={d} style={{ fontSize: "0.75rem", color: "#999", fontWeight: 500, padding: "0.5rem" }}>{d}</span>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
                    {calendarDays.map((day, idx) => {
                      if (day === null) return <div key={`e-${idx}`} />;
                      const selectable = isDaySelectable(day);
                      const sel = isSelected(day);
                      const isToday = today.getDate() === day && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();
                      return (
                        <button
                          key={day}
                          disabled={!selectable}
                          onClick={() => { setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)); setSelectedTime(null); }}
                          style={{
                            padding: "0.7rem", textAlign: "center", fontSize: "0.9rem",
                            background: sel ? "#000" : "transparent",
                            color: sel ? "#fff" : selectable ? "#000" : "#ccc",
                            fontWeight: isToday ? 700 : 400,
                            border: "none", borderRadius: sel ? "50%" : "0",
                            cursor: selectable ? "pointer" : "default", fontFamily: "inherit", position: "relative",
                          }}
                        >
                          {day}
                          {isToday && !sel && <span style={{ position: "absolute", bottom: "4px", left: "50%", transform: "translateX(-50%)", width: "4px", height: "4px", borderRadius: "50%", background: "#e74c3c" }} />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div style={{ marginTop: "2rem" }}>
                      <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                        Horaires disponibles
                      </h3>
                      {loadingSlots ? (
                        <p style={{ color: "#999", fontSize: "0.9rem" }}>Chargement...</p>
                      ) : closedDay ? (
                        <p style={{ color: "#c0392b", fontSize: "0.9rem" }}>Aucun créneau disponible ce jour.</p>
                      ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "0.5rem" }}>
                          {availableSlots.map((t) => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              style={{
                                padding: "0.7rem 0.5rem", fontSize: "0.85rem",
                                border: selectedTime === t ? "none" : "1px solid #e0e0e0",
                                background: selectedTime === t ? "#000" : "#fff",
                                color: selectedTime === t ? "#fff" : "#333",
                                cursor: "pointer", fontFamily: "inherit",
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══════ STEP 3 ═══════ */}
          {step === 3 && (
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                Vos informations
              </h2>
              <p style={{ color: "#999", fontSize: "0.85rem", marginBottom: "2rem" }}>
                Tous les champs marqués * sont obligatoires.
              </p>

              {bookingError && (
                <div style={{ padding: "1rem", background: "#fef2f2", border: "1px solid #fecaca", color: "#c0392b", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                  {bookingError}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Prénom *</label>
                    <input type="text" required value={info.firstName} onChange={(e) => setInfo({ ...info, firstName: e.target.value })} style={{ width: "100%", padding: "0.9rem 0", borderBottom: "1px solid #ddd", fontSize: "0.9rem", outline: "none", background: "transparent", border: "none", borderBottomWidth: "1px", borderBottomStyle: "solid" as const, borderBottomColor: "#ddd", fontFamily: "inherit" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Nom *</label>
                    <input type="text" required value={info.lastName} onChange={(e) => setInfo({ ...info, lastName: e.target.value })} style={{ width: "100%", padding: "0.9rem 0", borderBottom: "1px solid #ddd", fontSize: "0.9rem", outline: "none", background: "transparent", border: "none", borderBottomWidth: "1px", borderBottomStyle: "solid" as const, borderBottomColor: "#ddd", fontFamily: "inherit" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Email *</label>
                  <input type="email" required value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} style={{ width: "100%", padding: "0.9rem 0", borderBottom: "1px solid #ddd", fontSize: "0.9rem", outline: "none", background: "transparent", border: "none", borderBottomWidth: "1px", borderBottomStyle: "solid" as const, borderBottomColor: "#ddd", fontFamily: "inherit" }} />
                  <span style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "0.3rem", display: "block" }}>Un email de confirmation vous sera envoyé à cette adresse.</span>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Téléphone *</label>
                  <input type="tel" required value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} style={{ width: "100%", padding: "0.9rem 0", borderBottom: "1px solid #ddd", fontSize: "0.9rem", outline: "none", background: "transparent", border: "none", borderBottomWidth: "1px", borderBottomStyle: "solid" as const, borderBottomColor: "#ddd", fontFamily: "inherit" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.5rem" }}>Note (optionnel)</label>
                  <textarea rows={3} value={info.note} onChange={(e) => setInfo({ ...info, note: e.target.value })} placeholder="Informations complémentaires..." style={{ width: "100%", padding: "0.9rem 0", borderBottom: "1px solid #ddd", fontSize: "0.9rem", outline: "none", background: "transparent", border: "none", borderBottomWidth: "1px", borderBottomStyle: "solid" as const, borderBottomColor: "#ddd", fontFamily: "inherit", resize: "none" }} />
                </div>
              </div>

              {/* Summary */}
              <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "#f8f8f8", border: "1px solid #eee" }}>
                <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>Récapitulatif</h3>
                {selectedServices.map((s) => (
                  <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
                    <span style={{ fontSize: "0.9rem" }}>{s.name} · {s.duration} min</span>
                    <span style={{ fontWeight: 500 }}>{s.price}€</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0.8rem 0 0", fontWeight: 600, fontSize: "1.1rem" }}>
                  <span>Total</span>
                  <span>{total}€</span>
                </div>
                {selectedDate && selectedTime && (
                  <div style={{ marginTop: "1rem", padding: "0.8rem", background: "#fff", fontSize: "0.85rem", color: "#555" }}>
                    {formatDate(selectedDate)}, {selectedTime} - {endTime(selectedTime, totalDuration)}
                  </div>
                )}
                <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#999" }}>Paiement sur place</p>
              </div>
            </div>
          )}

          {/* ═══════ STEP 4 ═══════ */}
          {step === 4 && confirmed && (
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", padding: "3rem 0" }}>
              <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
                <svg style={{ width: "30px", height: "30px", color: "#fff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 300, letterSpacing: "0.1em", marginBottom: "1rem" }}>Réservation confirmée</h2>
              <p style={{ color: "#888", marginBottom: "2.5rem", lineHeight: 1.7 }}>
                Un email de confirmation a été envoyé à <strong>{info.email}</strong>.<br />
                Nous avons hâte de vous accueillir.
              </p>
              <div style={{ textAlign: "left", padding: "2rem", background: "#f8f8f8", border: "1px solid #eee", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "1.5rem" }}>Détails du rendez-vous</h3>
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>Client</span>
                  <p style={{ fontSize: "0.95rem", marginTop: "0.3rem" }}>{info.firstName} {info.lastName}</p>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>Date & heure</span>
                  <p style={{ fontSize: "0.95rem", marginTop: "0.3rem" }}>{selectedDate && formatDate(selectedDate)}, {selectedTime} - {selectedTime && endTime(selectedTime, totalDuration)}</p>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>Prestation(s)</span>
                  {selectedServices.map((s) => (
                    <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
                      <span style={{ fontSize: "0.9rem" }}>{s.name} · {s.duration} min</span>
                      <span style={{ fontWeight: 500 }}>{s.price}€</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "0.8rem 0 0", fontWeight: 600 }}>
                    <span>Total</span><span>{total}€</span>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa" }}>Paiement</span>
                  <p style={{ fontSize: "0.95rem", marginTop: "0.3rem" }}>Paiement sur place</p>
                </div>
              </div>
              <Link href="/" className="btn-primary">Retour à l&apos;accueil</Link>
            </div>
          )}
        </div>
      </section>

      {/* Bottom bar */}
      {step < 4 && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
          background: "#fff", borderTop: "1px solid #eee", padding: "1rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
        }}>
          <div>
            {step > 1 && (
              <button onClick={() => { setStep(step - 1); setBookingError(""); }} style={{ background: "none", border: "1px solid #ddd", padding: "0.7rem 1.5rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>
                ← Retour
              </button>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {selectedServices.length > 0 && (
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.7rem", color: "#999", display: "block" }}>{selectedServices.length} prestation{selectedServices.length > 1 ? "s" : ""}</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>{total}€</span>
              </div>
            )}
            <button
              onClick={() => {
                if (step === 1 && selectedServices.length > 0) setStep(2);
                else if (step === 2 && canProceedStep2) setStep(3);
                else if (step === 3 && canProceedStep3) handleConfirm();
              }}
              disabled={
                submitting ||
                (step === 1 && selectedServices.length === 0) ||
                (step === 2 && !canProceedStep2) ||
                (step === 3 && !canProceedStep3)
              }
              style={{
                padding: "0.8rem 2.5rem", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase",
                border: "none",
                background: submitting || (step === 1 && selectedServices.length === 0) || (step === 2 && !canProceedStep2) || (step === 3 && !canProceedStep3) ? "#ccc" : "#000",
                color: "#fff",
                cursor: submitting || (step === 1 && selectedServices.length === 0) || (step === 2 && !canProceedStep2) || (step === 3 && !canProceedStep3) ? "default" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {submitting ? "Envoi en cours..." : step === 3 ? "Confirmer la réservation" : "Continuer"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
