import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedText from "@/components/AnimatedText";

export const metadata: Metadata = {
  title: "Cryolipolyse, Radiofréquence & Lipocavitation | LH Medical Aesthetics",
  description:
    "Traitements corps non invasifs à Liège : cryolipolyse, radiofréquence et lipocavitation. Résultats avant/après visibles. Consultation gratuite.",
};

/* ── data ────────────────────────────────────────── */

const processSteps = [
  {
    num: "01",
    title: "Consultation",
    desc: "Analyse personnalisée de vos zones à traiter et définition d'un programme sur-mesure adapté à vos objectifs.",
  },
  {
    num: "02",
    title: "Traitement",
    desc: "Séance réalisée avec nos technologies de pointe, dans un cadre confortable et bienveillant.",
  },
  {
    num: "03",
    title: "Résultats",
    desc: "Les résultats apparaissent progressivement au fil des semaines suivant le traitement.",
  },
];

const beforeAfter = [
  { src: "/images/cryo/6.webp", alt: "Résultat cryolipolyse ventre" },
  { src: "/images/cryo/7.webp", alt: "Mesure pli cutané avant/après" },
  { src: "/images/cryo/5.webp", alt: "Réduction cellulite" },
  { src: "/images/cryo/4.webp", alt: "Résultat cryolipolyse séance" },
];

const zones = [
  "Ventre",
  "Poignées d'amour",
  "Cuisses",
  "Bras",
  "Double menton",
  "Dos",
  "Culotte de cheval",
  "Genoux",
];

const faqs = [
  {
    q: "Combien de séances sont nécessaires ?",
    a: "En général, 1 à 3 séances de cryolipolyse par zone suffisent. Pour la radiofréquence et la lipocavitation, un programme de 6 à 10 séances est recommandé pour des résultats optimaux.",
  },
  {
    q: "Est-ce douloureux ?",
    a: "Les traitements sont indolores. La cryolipolyse peut provoquer une sensation de froid intense les premières minutes, qui s'atténue rapidement. La radiofréquence est agréable (sensation de chaleur) et la lipocavitation est totalement confortable.",
  },
  {
    q: "Quand voit-on les résultats ?",
    a: "Les premiers résultats de la cryolipolyse sont visibles après 6 à 12 semaines. La radiofréquence montre un effet raffermissant dès la première séance. La lipocavitation donne des résultats progressifs dès les premières sessions.",
  },
  {
    q: "Y a-t-il des contre-indications ?",
    a: "Certaines conditions médicales (grossesse, troubles circulatoires, implants métalliques dans la zone traitée) peuvent être des contre-indications. Une consultation préalable permet de vérifier votre éligibilité.",
  },
  {
    q: "Peut-on combiner les trois traitements ?",
    a: "Oui, c'est même recommandé ! La combinaison cryolipolyse + radiofréquence + lipocavitation permet un remodelage corporel complet : destruction des graisses, raffermissement de la peau et drainage.",
  },
];

/* ── page ────────────────────────────────────────── */

export default function CryoPage() {
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
          src="/images/cryo/3.webp"
          alt="Traitement cryolipolyse"
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
              Remodelage corporel
            </p>
          </AnimateOnScroll>
          <AnimatedText
            text="Cryolipolyse, Radiofréquence & Lipocavitation"
            tag="h1"
            delay={0.2}
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              fontWeight: 200,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#fff",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          />
          <AnimateOnScroll animation="fade-up" delay={0.6}>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                marginTop: "1.5rem",
                fontSize: "0.95rem",
                maxWidth: "550px",
                margin: "1.5rem auto 0",
                lineHeight: 1.7,
              }}
            >
              Des techniques non invasives pour sculpter votre silhouette, raffermir votre peau et éliminer les graisses
              tenaces.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════ INTRO ═══════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
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
              Nos soins corps
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="blur-in" delay={0.1}>
            <h2 className="section-title">Trois technologies complémentaires</h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p style={{ color: "#666", lineHeight: 1.9, marginTop: "1.5rem" }}>
              Chez LH Medical Aesthetics, nous combinons trois technologies de pointe pour offrir un
              remodelage corporel complet et personnalisé. Chaque traitement cible un aspect
              différent pour des résultats visibles et durables, le tout sans chirurgie ni temps
              d&apos;arrêt.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ═══════ CRYOLIPOLYSE ═══════ */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
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
              <div style={{ position: "relative", height: "550px", overflow: "hidden" }}>
                <Image src="/images/cryo/3.webp" alt="Cryolipolyse traitement" fill style={{ objectFit: "cover" }} />
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
                  Traitement 01
                </p>
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
                  Cryolipolyse
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  La cryolipolyse est une technique révolutionnaire qui utilise le{" "}
                  <strong>froid contrôlé pour cristalliser et détruire les cellules graisseuses</strong>. Les
                  adipocytes ainsi traités sont ensuite éliminés naturellement par l&apos;organisme au fil des semaines.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Ce traitement cible précisément les amas graisseux résistants aux régimes et au sport. Le froid est
                  appliqué de manière contrôlée, ne touchant que les cellules graisseuses sans endommager les tissus
                  environnants. <strong>Jusqu&apos;à 30% de réduction de la couche graisseuse</strong> dès la première
                  séance.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {[
                    "Réduction de 25 à 30% de la graisse par séance",
                    "Résultats définitifs — les cellules détruites ne reviennent pas",
                    "Séance de 35 à 60 minutes selon la zone",
                    "Aucun temps de récupération",
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
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ RADIOFRÉQUENCE ═══════ */}
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
                <p
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#999",
                    marginBottom: "1rem",
                  }}
                >
                  Traitement 02
                </p>
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
                  Radiofréquence
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  La radiofréquence utilise des{" "}
                  <strong>ondes électromagnétiques pour chauffer les couches profondes de la peau</strong>, stimulant
                  ainsi la production de collagène et d&apos;élastine. La peau se raffermit, se retend et retrouve son
                  élasticité.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  C&apos;est le complément idéal de la cryolipolyse : après avoir éliminé la graisse, la radiofréquence
                  retend la peau pour un résultat harmonieux et naturel. Elle est également très efficace contre la{" "}
                  <strong>cellulite et le relâchement cutané</strong>.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {[
                    "Raffermissement visible dès la première séance",
                    "Stimulation naturelle du collagène",
                    "Réduction de la cellulite",
                    "Soin agréable — sensation de chaleur douce",
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
              </AnimateOnScroll>
            </div>
            <AnimateOnScroll animation="fade-left">
              <div style={{ position: "relative", height: "550px", overflow: "hidden" }}>
                <Image
                  src="/images/cryo/2.webp"
                  alt="Radiofréquence traitement"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════ LIPOCAVITATION ═══════ */}
      <section className="section-padding" style={{ background: "#f8f8f8" }}>
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
              <div style={{ position: "relative", height: "550px", overflow: "hidden" }}>
                <Image
                  src="/images/cryo/1.webp"
                  alt="Lipocavitation traitement"
                  fill
                  style={{ objectFit: "cover" }}
                />
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
                  Traitement 03
                </p>
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
                  Lipocavitation
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={0.2}>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  La lipocavitation utilise des{" "}
                  <strong>ultrasons basse fréquence pour fragmenter les cellules graisseuses</strong> de manière ciblée.
                  Les graisses libérées sont ensuite drainées naturellement par le système lymphatique.
                </p>
                <p style={{ color: "#666", lineHeight: 1.8, marginBottom: "2rem" }}>
                  C&apos;est une <strong>alternative non chirurgicale à la liposuccion</strong>, idéale en complément de
                  la cryolipolyse et de la radiofréquence pour un remodelage corporel complet. Les ultrasons permettent
                  un traitement précis et un affinement progressif de la silhouette.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0" }}>
                  {[
                    "Destruction ciblée des graisses par ultrasons",
                    "Alternative non chirurgicale à la liposuccion",
                    "Résultats visibles dès les premières séances",
                    "Drainage et remodelage corporel sur-mesure",
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
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ AVANT / APRÈS ═══════ */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
                Résultats réels
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={0.1}>
              <h2 className="section-title">Avant / Après</h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={0.2}>
              <p style={{ color: "#888", maxWidth: "500px", margin: "1rem auto 0", lineHeight: 1.7 }}>
                Des résultats visibles et durables obtenus par nos clientes chez LH Medical Aesthetics.
              </p>
            </AnimateOnScroll>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {beforeAfter.map((img, i) => (
              <AnimateOnScroll key={img.src} animation="zoom-in" delay={i * 0.1}>
                <div
                  style={{
                    position: "relative",
                    height: "320px",
                    overflow: "hidden",
                    background: "#f5f5f5",
                  }}
                >
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "2rem 1rem 1rem",
                      background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      {img.alt}
                    </span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
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
              Ciblage précis
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
            {processSteps.map((step, i) => (
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
                <div
                  style={{
                    background: "#fff",
                    padding: "2rem",
                    borderLeft: "3px solid #000",
                  }}
                >
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
        <Image src="/images/cryo/6.webp" alt="" fill style={{ objectFit: "cover", opacity: 0.15 }} />
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
              Prêt(e) à sculpter votre silhouette ?
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", lineHeight: 1.8 }}>
              Réservez votre consultation gratuite pour définir le programme de soins adapté à vos objectifs.
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
