import Link from "next/link";
import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";

export const metadata: Metadata = {
  title: "Tarifs | LH Medical Aesthetics",
  description: "Tarifs épilation laser, cryolipolyse, radiofréquence et lipocavitation à Liège.",
};

const tarifsLaser = [
  { zone: "Aisselles", prix: "40 €" },
  { zone: "Pieds", prix: "20 €" },
  { zone: "Mains (Doigts)", prix: "20 €" },
  { zone: "Sillon inter-fessier", prix: "35 €" },
  { zone: "Maillot simple échancré", prix: "35 €" },
  { zone: "Maillot intégral", prix: "50 €" },
  { zone: "Cuisses", prix: "45 €" },
  { zone: "Demi-jambes / Genoux", prix: "50 €" },
  { zone: "Jambes complètes", prix: "70 €" },
  { zone: "Demi-bras", prix: "35 €" },
  { zone: "Bras complet (sans aisselles)", prix: "50 €" },
  { zone: "Dos", prix: "90 €" },
  { zone: "Ligne abdominale", prix: "20 €" },
  { zone: "Nuque", prix: "35 €" },
  { zone: "Lèvre supérieur", prix: "25 €" },
  { zone: "Barbe", prix: "50 €" },
  { zone: "Duvet", prix: "30 €" },
];

const tarifsCryo = [
  { zone: "1 zone", prix: "150 €" },
  { zone: "2 zones", prix: "250 €" },
  { zone: "3 zones", prix: "350 €" },
];

const tarifsRF = [
  { zone: "Visage", prix: "80 €" },
  { zone: "Corps — 1 zone", prix: "90 €" },
  { zone: "Corps — 2 zones", prix: "150 €" },
];

const tarifsLipo = [
  { zone: "1 zone", prix: "80 €" },
  { zone: "2 zones", prix: "140 €" },
];

const forfaitsLaser = [
  { nom: "Forfait 1", detail: "Bikini, Sif, Aisselles", prix: "90 €" },
  { nom: "Forfait 2", detail: "Bikini, Sif, Aisselles, Demi-jambes", prix: "130 €" },
  { nom: "Forfait 3", detail: "Bikini, Sif, Ligne abdominale, Aisselles, Jambes complètes", prix: "150 €" },
  { nom: "Forfait 4", detail: "Tout le corps", prix: "180 €", featured: true },
];

const forfaitsCombines = [
  { nom: "Cryo + RF", detail: "Cryolipolyse + Radiofréquence (1 zone)", prix: "200 €" },
  { nom: "Cryo + RF + Lipo", detail: "Cryolipolyse + Radiofréquence + Lipocavitation (1 zone)", prix: "250 €", featured: true },
];

function TarifGrid({ items }: { items: Array<{ zone: string; prix: string }> }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0 4rem" }}>
      {items.map((item, i) => (
        <AnimateOnScroll key={item.zone} animation="fade-up" delay={i * 0.04} duration={0.5}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #f0f0f0" }}>
            <span style={{ color: "#444", fontSize: "0.95rem" }}>{item.zone}</span>
            <span style={{ fontWeight: 500, letterSpacing: "0.05em", fontSize: "0.95rem" }}>{item.prix}</span>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}

export default function Tarifs() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#000", color: "#fff", textAlign: "center", padding: "8rem 2rem 5rem" }}>
        <AnimateOnScroll animation="fade-up">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>
            Nos soins
          </p>
        </AnimateOnScroll>
        <AnimatedText text="Nos Tarifs" tag="h1" delay={0.2} style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }} />
        <AnimateOnScroll animation="fade-in" delay={0.6}>
          <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "1rem" }}>Prix par séance</p>
        </AnimateOnScroll>
      </section>

      {/* Navigation rapide */}
      <nav
        style={{
          position: "sticky",
          top: "70px",
          zIndex: 50,
          background: "#fff",
          borderBottom: "1px solid #eee",
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="tarif-nav"
      >
        <div style={{ display: "flex", gap: "0", minWidth: "max-content", margin: "0 auto", justifyContent: "center" }}>
          {[
            { href: "#laser", label: "Laser" },
            { href: "#cryo", label: "Cryo" },
            { href: "#rf", label: "RF" },
            { href: "#lipo", label: "Lipo" },
            { href: "#forfaits", label: "Forfaits" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                padding: "0.9rem 1.5rem",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#555",
                whiteSpace: "nowrap",
                borderBottom: "2px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ═══════════ ÉPILATION LASER ═══════════ */}
      <section id="laser" className="section-padding" style={{ background: "#fff", scrollMarginTop: "140px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <AnimateOnScroll animation="fade-up">
            <p style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem" }}>
              Service 01
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3rem" }}>
              Épilation Laser
            </h2>
          </AnimateOnScroll>
          <TarifGrid items={tarifsLaser} />
        </div>
      </section>

      {/* Forfaits Laser */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem" }}>
                Économisez
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.1}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Forfaits Laser
              </h2>
            </AnimateOnScroll>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem" }}>
            {forfaitsLaser.map((forfait, i) => {
              const isFeatured = "featured" in forfait && forfait.featured;
              return (
                <AnimateOnScroll key={forfait.nom} animation="fade-up" delay={i * 0.12}>
                  <div style={{
                    padding: "2.5rem 2rem", textAlign: "center",
                    border: isFeatured ? "none" : "1px solid #e0e0e0",
                    background: isFeatured ? "#000" : "#fff",
                    color: isFeatured ? "#fff" : "#000",
                  }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: isFeatured ? "rgba(255,255,255,0.5)" : "#999", display: "block", marginBottom: "1.5rem" }}>
                      {forfait.nom}
                    </span>
                    <span style={{ fontSize: "2.5rem", fontWeight: 200, display: "block", marginBottom: "1.5rem" }}>
                      {forfait.prix}
                    </span>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: isFeatured ? "rgba(255,255,255,0.6)" : "#888", marginBottom: "2rem", minHeight: "3rem" }}>
                      {forfait.detail}
                    </p>
                    <Link href="/reservation" style={{
                      display: "block", padding: "0.9rem", fontSize: "0.65rem", letterSpacing: "0.2em",
                      textTransform: "uppercase", textDecoration: "none",
                      background: isFeatured ? "#fff" : "#000", color: isFeatured ? "#000" : "#fff",
                    }}>
                      Réserver
                    </Link>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CRYOLIPOLYSE ═══════════ */}
      <section id="cryo" className="section-padding" style={{ background: "#fff", scrollMarginTop: "140px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <AnimateOnScroll animation="fade-up">
            <p style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem" }}>
              Service 02
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3rem" }}>
              Cryolipolyse
            </h2>
          </AnimateOnScroll>
          <TarifGrid items={tarifsCryo} />
        </div>
      </section>

      {/* ═══════════ RADIOFRÉQUENCE ═══════════ */}
      <section id="rf" className="section-padding" style={{ background: "#f8f8f8", scrollMarginTop: "140px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <AnimateOnScroll animation="fade-up">
            <p style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem" }}>
              Service 03
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3rem" }}>
              Radiofréquence
            </h2>
          </AnimateOnScroll>
          <TarifGrid items={tarifsRF} />
        </div>
      </section>

      {/* ═══════════ LIPOCAVITATION ═══════════ */}
      <section id="lipo" className="section-padding" style={{ background: "#fff", scrollMarginTop: "140px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <AnimateOnScroll animation="fade-up">
            <p style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem" }}>
              Service 04
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3rem" }}>
              Lipocavitation
            </h2>
          </AnimateOnScroll>
          <TarifGrid items={tarifsLipo} />
        </div>
      </section>

      {/* ═══════════ FORFAITS COMBINÉS ═══════════ */}
      <section id="forfaits" className="section-padding" style={{ background: "#f8f8f8", scrollMarginTop: "140px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "0.8rem" }}>
                Le meilleur des deux mondes
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.1}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Forfaits combinés
              </h2>
            </AnimateOnScroll>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {forfaitsCombines.map((forfait, i) => {
              const isFeatured = "featured" in forfait && forfait.featured;
              return (
                <AnimateOnScroll key={forfait.nom} animation="fade-up" delay={i * 0.15}>
                  <div style={{
                    padding: "2.5rem 2rem", textAlign: "center",
                    border: isFeatured ? "none" : "1px solid #e0e0e0",
                    background: isFeatured ? "#000" : "#fff",
                    color: isFeatured ? "#fff" : "#000",
                  }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: isFeatured ? "rgba(255,255,255,0.5)" : "#999", display: "block", marginBottom: "1.5rem" }}>
                      {forfait.nom}
                    </span>
                    <span style={{ fontSize: "2.5rem", fontWeight: 200, display: "block", marginBottom: "1.5rem" }}>
                      {forfait.prix}
                    </span>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: isFeatured ? "rgba(255,255,255,0.6)" : "#888", marginBottom: "2rem" }}>
                      {forfait.detail}
                    </p>
                    <Link href="/reservation" style={{
                      display: "block", padding: "0.9rem", fontSize: "0.65rem", letterSpacing: "0.2em",
                      textTransform: "uppercase", textDecoration: "none",
                      background: isFeatured ? "#fff" : "#000", color: isFeatured ? "#000" : "#fff",
                    }}>
                      Réserver
                    </Link>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info */}
      <section style={{ padding: "4rem 2rem", background: "#fff", textAlign: "center" }}>
        <AnimateOnScroll animation="fade-in">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <p style={{ color: "#999", fontSize: "0.85rem", lineHeight: 1.8 }}>
              Les tarifs sont indiqués par séance. Le nombre de séances nécessaires varie selon
              le type de peau et la zone traitée. Une consultation préalable permet de déterminer
              le plan de traitement adapté à vos besoins.
            </p>
            <Link href="/contact" style={{ display: "inline-block", marginTop: "1.5rem", color: "#000", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Nous contacter pour plus d&apos;informations →
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
