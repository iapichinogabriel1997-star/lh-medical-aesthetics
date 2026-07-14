import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";

export const metadata: Metadata = {
  title: "Services | LH Medical Aesthetics",
  description: "Épilation laser, Cryolipolyse, Radiofréquence et Lipocavitation à Liège.",
};

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          overflow: "hidden",
        }}
      >
        <Image src="/images/8.webp" alt="Traitement laser" fill style={{ objectFit: "cover", opacity: 0.4 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: "#fff" }}>
          <AnimateOnScroll animation="fade-up">
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>
              Nos spécialités
            </p>
          </AnimateOnScroll>
          <AnimatedText text="Nos Services" tag="h1" delay={0.2} style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }} />
        </div>
      </section>

      {/* ═══════════ ÉPILATION LASER ═══════════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                  Service 01
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", lineHeight: 1.3 }}>
                  Épilation Laser
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  Découvrez dans notre institut la dernière génération d&apos;épilation laser avec
                  la technologie <strong>Laser-Pro de Divina-Pro</strong>.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Grâce à ses 4 longueurs d&apos;ondes complémentaires, elle cible efficacement
                  tous les types de poils et de peaux, y compris les plus claires et les plus
                  foncées, pour un résultat durable et sans douleur.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {[
                    "Résultats visibles dès les premières séances",
                    "Technologie sûre, rapide et confortable",
                    "Adaptée aussi bien aux femmes qu'aux hommes",
                    "4 longueurs d'ondes complémentaires",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "0.8rem" }}>
                      <svg style={{ width: "18px", height: "18px", marginTop: "3px", flexShrink: 0 }} fill="none" stroke="#000" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{ color: "#555", fontSize: "0.9rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/tarifs" className="btn-primary">Voir nos tarifs</Link>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll animation="fade-left">
              <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
                <Image src="/images/1.webp" alt="Traitement épilation laser" fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════ CRYOLIPOLYSE ═══════════ */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <AnimateOnScroll animation="fade-right">
              <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
                <Image src="/images/cryo/3.webp" alt="Cryolipolyse traitement" fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                  Service 02
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", lineHeight: 1.3 }}>
                  Cryolipolyse
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  La cryolipolyse est une technique non invasive qui permet de <strong>réduire les amas graisseux localisés</strong> par
                  le froid. Les cellules graisseuses sont cristallisées puis éliminées naturellement par l&apos;organisme.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Idéale pour les zones résistantes aux régimes et au sport : ventre, poignées d&apos;amour,
                  cuisses, bras et double menton.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {[
                    "Technique non invasive et sans chirurgie",
                    "Résultats visibles après 6 à 12 semaines",
                    "Séance indolore et sans temps de récupération",
                    "Élimination définitive des cellules graisseuses",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "0.8rem" }}>
                      <svg style={{ width: "18px", height: "18px", marginTop: "3px", flexShrink: 0 }} fill="none" stroke="#000" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{ color: "#555", fontSize: "0.9rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/tarifs" className="btn-primary">Voir nos tarifs</Link>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ RADIOFRÉQUENCE ═══════════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                  Service 03
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", lineHeight: 1.3 }}>
                  Radiofréquence
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  La radiofréquence utilise des ondes électromagnétiques pour <strong>stimuler la production de collagène</strong> en
                  profondeur. Elle raffermit la peau, réduit la cellulite et améliore l&apos;élasticité cutanée.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Un soin idéal pour le relâchement cutané du visage et du corps, en complément
                  de la cryolipolyse pour des résultats optimaux.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {[
                    "Raffermissement et tonification de la peau",
                    "Réduction visible de la cellulite",
                    "Stimulation naturelle du collagène",
                    "Soin agréable et relaxant",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "0.8rem" }}>
                      <svg style={{ width: "18px", height: "18px", marginTop: "3px", flexShrink: 0 }} fill="none" stroke="#000" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{ color: "#555", fontSize: "0.9rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/tarifs" className="btn-primary">Voir nos tarifs</Link>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll animation="fade-left">
              <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
                <Image src="/images/cryo/2.webp" alt="Radiofréquence traitement" fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════ LIPOCAVITATION ═══════════ */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <AnimateOnScroll animation="fade-right">
              <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
                <Image src="/images/cryo/1.webp" alt="Lipocavitation traitement" fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                  Service 04
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", lineHeight: 1.3 }}>
                  Lipocavitation
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  La lipocavitation utilise des <strong>ultrasons basse fréquence</strong> pour détruire les cellules graisseuses
                  de manière ciblée. Une alternative efficace et non chirurgicale à la liposuccion.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Combinée à la radiofréquence et à la cryolipolyse, elle permet un remodelage
                  corporel complet et durable.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {[
                    "Destruction ciblée des graisses par ultrasons",
                    "Alternative non chirurgicale à la liposuccion",
                    "Résultats dès les premières séances",
                    "Remodelage corporel sur-mesure",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "0.8rem" }}>
                      <svg style={{ width: "18px", height: "18px", marginTop: "3px", flexShrink: 0 }} fill="none" stroke="#000" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{ color: "#555", fontSize: "0.9rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/tarifs" className="btn-primary">Voir nos tarifs</Link>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALERIE RÉSULTATS ═══════════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                Nos soins en images
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.1}>
              <h2 className="section-title">Galerie</h2>
            </AnimateOnScroll>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
            {[
              { src: "/images/cryo/6.webp", alt: "Résultat corps" },
              { src: "/images/cryo/7.webp", alt: "Mesure pli cutané" },
              { src: "/images/cryo/5.webp", alt: "Cellulite" },
              { src: "/images/cryo/4.webp", alt: "Cryolipolyse séance" },
              { src: "/images/5.webp", alt: "Laser jambes" },
              { src: "/images/6.webp", alt: "Laser détail" },
            ].map((img, i) => (
              <AnimateOnScroll key={img.src} animation="zoom-in" delay={i * 0.1}>
                <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TECHNOLOGIE ═══════════ */}
      <section className="section-padding" style={{ background: "transparent" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <AnimateOnScroll animation="fade-right">
              <div style={{ position: "relative", height: "450px", overflow: "hidden" }}>
                <Image src="/images/3.webp" alt="Machine Divina-Pro" fill style={{ objectFit: "contain" }} />
              </div>
            </AnimateOnScroll>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                  Innovation
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", lineHeight: 1.3 }}>
                  Nos technologies
                </h2>
              </AnimateOnScroll>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { label: "Laser", desc: "Laser-Pro de Divina-Pro, 4 longueurs d'ondes pour tous les phototypes" },
                  { label: "Cryo", desc: "Cryolipolyse par le froid pour l'élimination définitive des graisses" },
                  { label: "RF", desc: "Radiofréquence pour le raffermissement cutané et la réduction de cellulite" },
                  { label: "Lipo", desc: "Lipocavitation par ultrasons pour un remodelage corporel ciblé" },
                ].map((item, i) => (
                  <AnimateOnScroll key={item.label} animation="fade-left" delay={0.12 * i}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div style={{ width: "50px", height: "50px", border: "1px solid #000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.05em" }}>{item.label.toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 500, marginBottom: "0.3rem", fontSize: "0.95rem" }}>{item.label}</h3>
                        <p style={{ color: "#777", fontSize: "0.85rem", lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ padding: "7rem 2rem", background: "#000", color: "#fff", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <Image src="/images/cryo/6.webp" alt="" fill style={{ objectFit: "cover", opacity: 0.15 }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "650px", margin: "0 auto" }}>
          <AnimateOnScroll animation="blur-in">
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", lineHeight: 1.3 }}>
              Prêt(e) à transformer votre corps ?
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", lineHeight: 1.8 }}>
              Réservez une consultation personnalisée pour définir le programme de soins adapté à vos objectifs.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.4}>
            <Link href="/reservation" className="btn-white">Prendre rendez-vous</Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
