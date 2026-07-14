import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";

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
              width={70}
              height={70}
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

      {/* ═══════════ AVANTAGES ═══════════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                Nos avantages
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={0.15}>
              <h2 className="section-title">Pourquoi nous choisir</h2>
            </AnimateOnScroll>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
            }}
          >
            {[
              {
                title: "Technologie avancée",
                desc: "Laser-Pro de Divina-Pro avec 4 longueurs d'ondes complémentaires pour cibler tous les types de poils et de peaux.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
              },
              {
                title: "Résultats visibles",
                desc: "Des résultats dès les premières séances pour un résultat durable et sans douleur.",
                icon: "M5 13l4 4L19 7",
              },
              {
                title: "Pour tous",
                desc: "Adaptée aussi bien aux femmes qu'aux hommes, y compris les peaux les plus claires et les plus foncées.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
              },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title} animation="fade-up" delay={i * 0.15}>
                <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      margin: "0 auto 1.5rem",
                      border: "1px solid #e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.4s ease",
                    }}
                  >
                    <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={item.icon} />
                    </svg>
                  </div>
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

      {/* ═══════════ GALERIE ═══════════ */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                En images
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.15}>
              <h2 className="section-title">Notre expertise</h2>
            </AnimateOnScroll>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "0.5rem",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <AnimateOnScroll animation="fade-right" style={{ gridRow: "1 / 3", position: "relative", minHeight: "500px", overflow: "hidden" }}>
              <Image src="/images/7.webp" alt="Traitement laser aisselles" fill style={{ objectFit: "cover" }} />
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={0.2} style={{ position: "relative", minHeight: "245px", overflow: "hidden" }}>
              <Image src="/images/1.webp" alt="Traitement laser" fill style={{ objectFit: "cover" }} />
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={0.35} style={{ position: "relative", minHeight: "245px", overflow: "hidden" }}>
              <Image src="/images/2.webp" alt="Jambes lisses" fill style={{ objectFit: "cover" }} />
            </AnimateOnScroll>
          </div>
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
