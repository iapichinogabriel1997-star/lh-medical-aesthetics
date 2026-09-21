import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";
import ServicesCarousel from "@/components/ServicesCarousel";

export default function Home() {
  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <HeroVideo />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            color: "#fff",
            padding: "0 2rem",
            maxWidth: "800px",
          }}
        >
          <AnimateOnScroll animation="zoom-in" duration={1.2}>
            <Image
              src="/images/logo.svg"
              alt="LH Medical Aesthetics"
              width={110}
              height={110}
              style={{ margin: "0 auto 2rem", filter: "invert(1)" }}
            />
          </AnimateOnScroll>
          <AnimatedText
            text="LH Medical Aesthetics"
            tag="h1"
            delay={0.3}
            speed={40}
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 200, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}
          />
          <AnimateOnScroll animation="fade-up" delay={1}>
            <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.2rem)", fontWeight: 300, color: "rgba(255,255,255,0.8)", marginBottom: "3rem", letterSpacing: "0.05em" }}>
              Épilation laser de dernière génération à Liège
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={1.3}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Link href="/reservation" className="btn-white">
                Prendre rendez-vous
              </Link>
              <Link href="/services" className="btn-outline">
                Découvrir nos soins
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════ CAROUSEL NOS SOINS ═══════════ */}
      <ServicesCarousel />

      {/* ═══════════ NOUVEAU SOIN — CRYOLIPOLYSE ═══════════ */}
      {/* Mobile: card with image background + overlay text */}
      <section
        className="md:hidden"
        style={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/cryo/3.webp"
          alt="Cryolipolyse traitement"
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 60%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 10, padding: "2rem 1.5rem 3rem", color: "#fff" }}>
          <AnimateOnScroll animation="fade-up">
            <span
              style={{
                display: "inline-block",
                padding: "0.35rem 1rem",
                background: "#fff",
                color: "#000",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
              }}
            >
              Nouveau soin
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: 200,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                lineHeight: 1.3,
              }}
            >
              Découvrez la Cryolipolyse
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "1.2rem", fontSize: "0.9rem" }}>
              Éliminez les graisses tenaces sans chirurgie. Combinée à la radiofréquence et à la lipocavitation pour un remodelage corporel complet.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0" }}>
              {[
                "Jusqu'à 30% de réduction par séance",
                "Résultats définitifs et sans douleur",
                "3 technologies complémentaires",
              ].map((item) => (
                <li
                  key={item}
                  style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "0.6rem" }}
                >
                  <svg
                    style={{ width: "16px", height: "16px", marginTop: "3px", flexShrink: 0 }}
                    fill="none"
                    stroke="#fff"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem" }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/cryolipolyse" className="btn-white">
              En savoir plus
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Desktop: side-by-side layout */}
      <section className="section-padding hidden md:!block" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <AnimateOnScroll animation="fade-right">
              <div style={{ position: "relative", height: "550px", overflow: "hidden" }}>
                <Image src="/images/cryo/3.webp" alt="Cryolipolyse traitement" fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
            <div>
              <AnimateOnScroll animation="fade-up">
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.4rem 1.2rem",
                    background: "#000",
                    color: "#fff",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                  }}
                >
                  Nouveau soin
                </span>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    fontWeight: 200,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "2rem",
                    lineHeight: 1.3,
                  }}
                >
                  Découvrez la Cryolipolyse
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  Éliminez les <strong>graisses tenaces</strong> sans chirurgie grâce au froid. La
                  cryolipolyse cristallise les cellules graisseuses qui sont ensuite éliminées
                  naturellement par votre organisme.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Combinée à la <strong>radiofréquence</strong> et à la{" "}
                  <strong>lipocavitation</strong>, nous proposons un programme complet de remodelage
                  corporel adapté à vos objectifs.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {[
                    "Jusqu'à 30% de réduction de graisse par séance",
                    "Résultats définitifs et sans douleur",
                    "3 technologies complémentaires",
                    "Consultation personnalisée offerte",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "0.8rem" }}
                    >
                      <svg
                        style={{ width: "18px", height: "18px", marginTop: "3px", flexShrink: 0 }}
                        fill="none"
                        stroke="#000"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{ color: "#555", fontSize: "0.9rem" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/cryolipolyse" className="btn-primary">
                  En savoir plus
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PANORAMIQUE ÉPILATION LASER ═══════════ */}
      <section style={{ background: "#f8f8f8", padding: "5rem 0", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
          <AnimateOnScroll animation="fade-up">
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
              En images
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.15}>
            <h2 className="section-title">Épilation Laser</h2>
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
          {[
            { src: "/images/laser/1.webp", alt: "Épilation laser aisselles" },
            { src: "/images/laser/2.webp", alt: "Épilation laser jambes" },
            { src: "/images/laser/3.webp", alt: "Traitement laser corps" },
          ].map((img, i) => (
            <AnimateOnScroll key={img.src} animation="fade-up" delay={i * 0.1}>
              <Link href="/epilation-laser" style={{ display: "block", position: "relative", height: "clamp(250px, 40vw, 450px)", overflow: "hidden" }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
              </Link>
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
          {[
            { src: "/images/laser/4.webp", alt: "Écran technologie laser" },
            { src: "/images/laser/5.webp", alt: "Pièce à main laser" },
          ].map((img, i) => (
            <AnimateOnScroll key={img.src} animation="fade-up" delay={0.3 + i * 0.1}>
              <Link href="/epilation-laser" style={{ display: "block", position: "relative", height: "clamp(200px, 35vw, 380px)", overflow: "hidden" }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <AnimateOnScroll animation="fade-up" delay={0.3}>
            <Link href="/epilation-laser" className="btn-primary">
              Découvrir l&apos;épilation laser
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section
        style={{
          position: "relative",
          padding: "8rem 2rem",
          background: "#000",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/8.webp"
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.2 }}
        />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "700px", margin: "0 auto", color: "#fff" }}>
          <AnimateOnScroll animation="blur-in">
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", lineHeight: 1.3 }}>
              Offrez-vous une peau douce toute l&apos;année
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Avec la précision et la performance de la Laser-Pro, utilisée dans les meilleurs
              centres esthétiques. Prenez rendez-vous dès maintenant.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.4}>
            <Link href="/reservation" className="btn-white">
              Réserver une séance
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════════ PROCESSUS ═══════════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                Votre parcours
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.15}>
              <h2 className="section-title">Comment ça marche</h2>
            </AnimateOnScroll>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "3rem",
              textAlign: "center",
            }}
          >
            {[
              { step: "01", title: "Rendez-vous", desc: "Nous fixons rendez-vous à votre meilleure convenance" },
              { step: "02", title: "Diagnostic", desc: "Un soin préparé pour vous selon votre diagnostique personnalisé" },
              { step: "03", title: "Soin sur-mesure", desc: "Un traitement adapté à votre type de peau et de pilosité" },
            ].map((item, i) => (
              <AnimateOnScroll key={item.step} animation="fade-up" delay={i * 0.2}>
                <div style={{ padding: "1rem" }}>
                  <span style={{ fontSize: "4rem", fontWeight: 100, color: "#e8e8e8", display: "block", marginBottom: "0.5rem", lineHeight: 1 }}>
                    {item.step}
                  </span>
                  <h3 style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#777", fontSize: "0.9rem", lineHeight: 1.8 }}>{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TECHNOLOGIE ═══════════ */}
      <section className="section-padding" style={{ background: "transparent" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                Innovation
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.15}>
              <h2 className="section-title">Technologie Divina-Pro</h2>
            </AnimateOnScroll>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <AnimateOnScroll animation="fade-right">
              <div style={{ position: "relative", height: "450px", overflow: "hidden" }}>
                <Image src="/images/3.webp" alt="Machine Divina-Pro" fill style={{ objectFit: "contain" }} />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={0.2}>
              <div>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                  La Laser-Pro de Divina-Pro est la référence en matière d&apos;épilation laser
                  professionnelle. Utilisée dans les meilleurs centres esthétiques, elle offre
                  une précision et une performance inégalées.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem" }}>
                  Grâce à ses 4 longueurs d&apos;ondes complémentaires, elle cible efficacement
                  tous les types de peaux pour un résultat durable et sans douleur.
                </p>
                <Link href="/services" className="btn-primary">
                  En savoir plus
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
