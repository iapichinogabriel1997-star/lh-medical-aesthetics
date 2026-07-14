"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.9rem 0",
  fontSize: "0.9rem",
  outline: "none",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #ddd",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#999",
  marginBottom: "0.5rem",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: "#000", color: "#fff", textAlign: "center", padding: "8rem 2rem 5rem" }}>
        <AnimateOnScroll animation="fade-up">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>
            Contactez-nous
          </p>
        </AnimateOnScroll>
        <AnimatedText text="Contact" tag="h1" delay={0.2} style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }} />
      </section>

      {/* Coordonnées */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }}>
            {[
              {
                icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                title: "Téléphone",
                value: "+32 497 38 86 44",
                href: "tel:+32497388644",
              },
              {
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                title: "Adresse",
                value: "Rue d'Amercoeur 21/32, 4020 Liège",
                href: "https://maps.google.com/?q=Rue+d'Amercoeur+21/32+4020+Liège",
              },
              {
                icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z",
                title: "Instagram",
                value: "@lh.medical.aesthetics",
                href: "https://www.instagram.com",
                isFill: true,
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title} animation="fade-up" delay={i * 0.12}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ textAlign: "center", padding: "2.5rem 2rem", border: "1px solid #eee", textDecoration: "none", color: "inherit" }}
              >
                <div style={{ width: "50px", height: "50px", margin: "0 auto 1rem", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg style={{ width: "20px", height: "20px" }} fill={item.isFill ? "currentColor" : "none"} stroke={item.isFill ? "none" : "currentColor"} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ color: "#888", fontSize: "0.85rem" }}>{item.value}</p>
              </a>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Contact form */}
          <div style={{ maxWidth: "650px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <AnimateOnScroll animation="blur-in">
                <h2 style={{ fontSize: "1.5rem", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Nous contacter
                </h2>
              </AnimateOnScroll>
            </div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid #eee" }}>
                <svg style={{ width: "48px", height: "48px", margin: "0 auto 1rem", color: "#22c55e" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <h3 style={{ fontWeight: 500, marginBottom: "0.5rem" }}>Message envoyé</h3>
                <p style={{ color: "#888", fontSize: "0.9rem" }}>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  <div>
                    <label style={labelStyle}>Nom complet *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Téléphone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", cursor: "pointer", textAlign: "center" }}>
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Réservation */}
      <section style={{ padding: "5rem 2rem", background: "#f8f8f8", textAlign: "center" }}>
        <AnimateOnScroll animation="blur-in">
          <h2 style={{ fontSize: "1.5rem", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Envie de réserver ?
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={0.15}>
          <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Utilisez notre système de réservation en ligne pour choisir votre soin et votre créneau.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={0.3}>
          <Link href="/reservation" className="btn-primary">
            Réserver en ligne
          </Link>
        </AnimateOnScroll>
      </section>

      {/* Map */}
      <iframe
        title="LH Medical Aesthetics"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.8!2d5.5833!3d50.6333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRue+d'Amercoeur+21%2C+4020+Li%C3%A8ge!5e0!3m2!1sfr!2sbe!4v1"
        style={{ width: "100%", height: "400px", border: "none", display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </>
  );
}
