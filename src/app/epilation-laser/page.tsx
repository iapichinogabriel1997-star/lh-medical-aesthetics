import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";

export const metadata: Metadata = {
  title: "Épilation Laser | LH Medical Aesthetics",
  description:
    "Épilation laser de dernière génération à Liège. Technologie Laser-Pro Divina-Pro, 4 longueurs d'ondes, tous types de peaux. Résultats durables.",
};

const gallery = [
  { src: "/images/laser/1.webp", alt: "Épilation laser aisselles" },
  { src: "/images/laser/2.webp", alt: "Épilation laser jambes" },
  { src: "/images/laser/3.webp", alt: "Traitement laser corps" },
  { src: "/images/laser/4.webp", alt: "Écran technologie DioLASH Ice" },
  { src: "/images/laser/5.webp", alt: "Pièce à main laser" },
];

const zones = [
  "Visage",
  "Aisselles",
  "Maillot",
  "Jambes complètes",
  "Demi-jambes",
  "Bras",
  "Dos",
  "Torse",
  "Lèvre supérieure",
  "Menton",
];

const faqs = [
  {
    q: "Combien de séances faut-il ?",
    a: "En moyenne 6 à 10 séances espacées de 4 à 6 semaines permettent d'obtenir une réduction permanente de 80 à 90% de la pilosité. Le nombre exact dépend de la zone, du type de poil et du phototype.",
  },
  {
    q: "Est-ce douloureux ?",
    a: "Notre technologie Laser-Pro intègre un système de refroidissement qui rend le traitement très confortable. La plupart des clients décrivent une légère sensation de chaleur, bien loin de l'épilation à la cire.",
  },
  {
    q: "L'épilation laser fonctionne-t-elle sur peau foncée ?",
    a: "Oui. Grâce aux 4 longueurs d'ondes complémentaires de notre laser, nous traitons efficacement tous les phototypes, des peaux les plus claires aux plus foncées, en toute sécurité.",
  },
  {
    q: "Quelles précautions avant une séance ?",
    a: "Évitez l'exposition au soleil et l'autobronzant 2 semaines avant. Ne pas épiler à la cire ou à la pince 4 semaines avant (le rasage est autorisé). Venez avec la peau propre et sans crème.",
  },
  {
    q: "Les résultats sont-ils définitifs ?",
    a: "Les poils détruits par le laser ne repoussent pas. Cependant, des poils dormants peuvent se réactiver avec le temps ou les changements hormonaux. Une séance d'entretien annuelle peut être recommandée.",
  },
];

export default function EpilationLaserPage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section
        style={{
          position: "relative",
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/laser/1.webp"
          alt="Épilation laser"
          fill
          style={{ objectFit: "cover", opacity: 0.35 }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))",
          }}
        />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: "#fff", padding: "0 2rem" }}>
          <AnimateOnScroll animation="fade-up">
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                marginBottom: "1rem",
              }}
            >
              Technologie de dernière génération
            </p>
          </AnimateOnScroll>
          <AnimatedText
            text="Épilation Laser"
            tag="h1"
            delay={0.2}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 200,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#fff",
            }}
          />
          <AnimateOnScroll animation="fade-up" delay={0.6}>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                marginTop: "1.5rem",
                fontSize: "0.95rem",
                maxWidth: "500px",
                margin: "1.5rem auto 0",
                lineHeight: 1.7,
              }}
            >
              Une peau lisse et douce, durablement. Grâce à la technologie Laser-Pro de Divina-Pro.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════ DESCRIPTION ═══════ */}
      {/* Mobile */}
      <section
        className="md:hidden"
        style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}
      >
        <Image src="/images/laser/2.webp" alt="Épilation laser" fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.8) 55%)" }} />
        <div style={{ position: "relative", zIndex: 10, padding: "2rem 1.5rem 3rem", color: "#fff" }}>
          <AnimateOnScroll animation="fade-up">
            <span style={{ display: "inline-block", padding: "0.35rem 1rem", background: "#fff", color: "#000", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.2rem" }}>Notre spécialité</span>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 200, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", lineHeight: 1.3 }}>La Laser-Pro de Divina-Pro</h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "1.2rem", fontSize: "0.9rem" }}>
              Dernière génération d&apos;épilation laser avec 4 longueurs d&apos;ondes complémentaires. Tous types de peaux, résultat durable et sans douleur.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0" }}>
              {["4 longueurs d'ondes", "Tous les phototypes", "Résultats dès les 1ères séances", "Femmes et hommes"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "0.6rem" }}>
                  <svg style={{ width: "16px", height: "16px", marginTop: "3px", flexShrink: 0 }} fill="none" stroke="#fff" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem" }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/tarifs" className="btn-white">Voir nos tarifs</Link>
          </AnimateOnScroll>
        </div>
      </section>
      {/* Desktop */}
      <section className="section-padding hidden md:!block" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>Notre spécialité</p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", lineHeight: 1.3 }}>La Laser-Pro de Divina-Pro</h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  Découvrez dans notre institut la <strong>dernière génération d&apos;épilation laser</strong> avec la technologie Laser-Pro de Divina-Pro. Un appareil professionnel de référence utilisé dans les meilleurs centres esthétiques.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Grâce à ses <strong>4 longueurs d&apos;ondes complémentaires</strong>, elle cible efficacement tous les types de poils et de peaux, y compris les plus claires et les plus foncées, pour un résultat durable et sans douleur.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {["4 longueurs d'ondes complémentaires", "Système de refroidissement intégré", "Adapté à tous les phototypes", "Résultats visibles dès les premières séances", "Pour femmes et hommes"].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "0.8rem" }}>
                      <svg style={{ width: "18px", height: "18px", marginTop: "3px", flexShrink: 0 }} fill="none" stroke="#000" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span style={{ color: "#555", fontSize: "0.9rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/tarifs" className="btn-primary">Voir nos tarifs</Link>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll animation="fade-left">
              <div style={{ position: "relative", height: "600px", overflow: "hidden" }}>
                <Image src="/images/laser/2.webp" alt="Épilation laser jambes" fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════ GALERIE PANORAMIQUE ═══════ */}
      <section style={{ background: "#f8f8f8", padding: "5rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
          <AnimateOnScroll animation="fade-up">
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#999",
                marginBottom: "1rem",
              }}
            >
              Nos soins en images
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2 className="section-title">Galerie</h2>
          </AnimateOnScroll>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
            padding: "0 1rem",
          }}
        >
          {gallery.slice(0, 3).map((img, i) => (
            <AnimateOnScroll key={img.src} animation="fade-up" delay={i * 0.1}>
              <div style={{ position: "relative", height: "clamp(250px, 40vw, 450px)", overflow: "hidden" }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.5rem",
            padding: "0.5rem 1rem 0",
          }}
        >
          {gallery.slice(3, 5).map((img, i) => (
            <AnimateOnScroll key={img.src} animation="fade-up" delay={0.3 + i * 0.1}>
              <div style={{ position: "relative", height: "clamp(200px, 35vw, 380px)", overflow: "hidden" }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ═══════ TECHNOLOGIE ═══════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <AnimateOnScroll animation="fade-right">
              <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
                <Image src="/images/3.webp" alt="Machine Divina-Pro" fill style={{ objectFit: "contain" }} />
              </div>
            </AnimateOnScroll>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#999",
                    marginBottom: "1rem",
                  }}
                >
                  Innovation
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 200,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "2rem",
                    lineHeight: 1.3,
                  }}
                >
                  4 longueurs d&apos;ondes
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {[
                    { nm: "755nm", name: "Alexandrite", desc: "Idéal pour les peaux claires et les poils fins" },
                    { nm: "808nm", name: "Diode", desc: "Le standard pour tous les types de peau" },
                    { nm: "940nm", name: "Diode haute pénétration", desc: "Pour les poils profondément enracinés" },
                    { nm: "1064nm", name: "Nd:YAG", desc: "Sûr et efficace sur les peaux foncées" },
                  ].map((w) => (
                    <div key={w.nm} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: "55px",
                          height: "55px",
                          border: "1px solid #000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.03em" }}>{w.nm}</span>
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 500, marginBottom: "0.25rem", fontSize: "0.95rem" }}>{w.name}</h3>
                        <p style={{ color: "#777", fontSize: "0.85rem", lineHeight: 1.6 }}>{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ZONES TRAITÉES ═══════ */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <AnimateOnScroll animation="fade-up">
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#999",
                marginBottom: "1rem",
              }}
            >
              Femmes & hommes
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2 className="section-title">Zones traitées</h2>
          </AnimateOnScroll>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "3rem",
            }}
          >
            {zones.map((zone, i) => (
              <AnimateOnScroll key={zone} animation="fade-up" delay={i * 0.05}>
                <div
                  style={{
                    padding: "0.8rem 2rem",
                    border: "1px solid #ddd",
                    fontSize: "0.8rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#555",
                    background: "#fff",
                  }}
                >
                  {zone}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESSUS ═══════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "1rem",
                }}
              >
                Votre parcours
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.1}>
              <h2 className="section-title">Comment ça se passe ?</h2>
            </AnimateOnScroll>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>
            {[
              {
                num: "01",
                title: "Consultation",
                desc: "Analyse de votre type de peau et de pilosité. Définition du programme de séances adapté.",
              },
              {
                num: "02",
                title: "Séance",
                desc: "Application du gel, traitement zone par zone avec la Laser-Pro. Durée de 15 min à 1h selon la zone.",
              },
              {
                num: "03",
                title: "Résultat",
                desc: "Les poils tombent progressivement dans les 10 à 14 jours suivants. Peau lisse et douce.",
              },
            ].map((step, i) => (
              <AnimateOnScroll key={step.num} animation="fade-up" delay={i * 0.15}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      border: "1px solid #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.05em" }}>{step.num}</span>
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "0.8rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ color: "#777", fontSize: "0.85rem", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
        <div style={{ maxWidth: "750px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "1rem",
                }}
              >
                Vos questions
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.1}>
              <h2 className="section-title">Questions fréquentes</h2>
            </AnimateOnScroll>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={i} animation="fade-up" delay={i * 0.08}>
                <div style={{ background: "#fff", padding: "2rem", borderLeft: "3px solid #000" }}>
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      marginBottom: "0.8rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {faq.q}
                  </h3>
                  <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.8 }}>{faq.a}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section
        style={{
          padding: "7rem 2rem",
          background: "#000",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image src="/images/laser/3.webp" alt="" fill style={{ objectFit: "cover", opacity: 0.15 }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "650px", margin: "0 auto" }}>
          <AnimateOnScroll animation="blur-in">
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 200,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
                lineHeight: 1.3,
              }}
            >
              Prêt(e) pour une peau lisse ?
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", lineHeight: 1.8 }}>
              Réservez votre première consultation pour définir votre programme d&apos;épilation laser personnalisé.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.4}>
            <Link href="/reservation" className="btn-white">
              Prendre rendez-vous
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
