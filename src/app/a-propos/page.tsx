import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";

export const metadata: Metadata = {
  title: "À propos | LH Medical Aesthetics",
  description: "Découvrez LH Medical Aesthetics, votre institut d'épilation laser à Liège.",
};

export default function APropos() {
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
        <Image src="/images/7.webp" alt="LH Medical Aesthetics" fill style={{ objectFit: "cover", opacity: 0.35 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))" }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: "#fff" }}>
          <AnimateOnScroll animation="fade-up">
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "1rem" }}>
              Notre institut
            </p>
          </AnimateOnScroll>
          <AnimatedText text="À Propos" tag="h1" delay={0.2} style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 200, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }} />
        </div>
      </section>

      {/* Notre histoire */}
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
            <div>
              <AnimateOnScroll animation="fade-up">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                  Qui sommes-nous
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "2rem", lineHeight: 1.3 }}>
                  LH Medical Aesthetics
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                  Découvrez dans notre institut la dernière génération d&apos;épilation laser avec la
                  technologie <strong>Laser-Pro de Divina-Pro</strong>.
                </p>
                <p style={{ color: "#666", lineHeight: 1.9, marginBottom: "1.5rem" }}>
                  Grâce à ses 4 longueurs d&apos;ondes complémentaires, elle cible efficacement
                  tous les types de poils et de peaux, y compris les plus claires et les plus
                  foncées, pour un résultat durable et sans douleur.
                </p>
                <p style={{ color: "#666", lineHeight: 1.9 }}>
                  Offrez-vous une peau douce toute l&apos;année avec la précision et la performance
                  de la Laser-Pro, utilisée dans les meilleurs centres esthétiques.
                </p>
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll animation="fade-left">
              <div style={{ position: "relative", height: "550px", overflow: "hidden" }}>
                <Image src="/images/8.webp" alt="Soin épilation laser" fill style={{ objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <AnimateOnScroll animation="fade-up">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                Ce qui nous définit
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.15}>
              <h2 className="section-title">Nos engagements</h2>
            </AnimateOnScroll>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              { title: "Expertise", desc: "Une équipe formée aux dernières techniques d'épilation laser pour des soins de qualité professionnelle." },
              { title: "Écoute", desc: "Nous prenons soin de répondre à toutes vos questions concernant nos différents soins." },
              { title: "Sur-mesure", desc: "Un soin préparé pour vous. Selon votre diagnostique et la finalité dont vous avez besoin." },
              { title: "Résultats", desc: "Résultats visibles dès les premières séances grâce à une technologie sûre, rapide et confortable." },
            ].map((item, i) => (
              <AnimateOnScroll key={item.title} animation="fade-up" delay={i * 0.1}>
                <div style={{ padding: "2.5rem", background: "#fff", border: "1px solid #eee" }}>
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

      {/* Technologie galerie */}
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <AnimateOnScroll animation="zoom-in">
                <div style={{ position: "relative", height: "250px", overflow: "hidden" }}>
                  <Image src="/images/5.webp" alt="Traitement laser jambe" fill style={{ objectFit: "cover" }} />
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="zoom-in" delay={0.15}>
                <div style={{ position: "relative", height: "250px", overflow: "hidden" }}>
                  <Image src="/images/6.webp" alt="Traitement laser détail" fill style={{ objectFit: "cover" }} />
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.25} style={{ gridColumn: "1 / -1" }}>
                <div style={{ position: "relative", height: "350px", overflow: "hidden" }}>
                  <Image src="/images/3.webp" alt="Machine Divina-Pro" fill style={{ objectFit: "contain" }} />
                </div>
              </AnimateOnScroll>
            </div>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                  Équipement
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="blur-in" delay={0.1}>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", lineHeight: 1.3 }}>
                  La technologie au service de votre peau
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Nous utilisons exclusivement la <strong>Laser-Pro de Divina-Pro</strong>,
                  reconnue pour sa fiabilité et son efficacité. Ses 4 longueurs d&apos;ondes
                  permettent de traiter efficacement tous les phototypes.
                </p>
                <Link href="/reservation" className="btn-primary">
                  Demander une démo
                </Link>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "7rem 2rem",
          background: "#000",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <AnimateOnScroll animation="blur-in">
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 200, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", lineHeight: 1.3 }}>
              Prêt(e) à commencer ?
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", lineHeight: 1.8 }}>
              Nous fixons rendez-vous à votre meilleure convenance pour un diagnostic personnalisé.
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
