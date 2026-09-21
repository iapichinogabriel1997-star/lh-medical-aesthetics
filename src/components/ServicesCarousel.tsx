"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";

const services = [
  {
    title: "Épilation Laser",
    desc: "Technologie Laser-Pro 4 longueurs d'ondes pour tous les types de peaux.",
    img: "/images/laser/1.webp",
    href: "/epilation-laser",
  },
  {
    title: "Cryolipolyse",
    desc: "Élimination des graisses par le froid, jusqu'à 30% de réduction par séance.",
    img: "/images/cryo/3.webp",
    href: "/cryolipolyse",
  },
  {
    title: "Radiofréquence",
    desc: "Raffermissement cutané et réduction de la cellulite par ondes électromagnétiques.",
    img: "/images/cryo/2.webp",
    href: "/cryolipolyse",
  },
  {
    title: "Lipocavitation",
    desc: "Remodelage corporel ciblé par ultrasons, alternative à la liposuccion.",
    img: "/images/cryo/1.webp",
    href: "/cryolipolyse",
  },
];

const items = [...services, ...services];

function Card({ s }: { s: (typeof services)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={s.href}
      style={{
        flex: "0 0 280px",
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          height: "380px",
          overflow: "hidden",
          borderRadius: "6px",
        }}
      >
        <Image
          src={s.img}
          alt={s.title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease, filter 0.5s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            filter: hovered ? "brightness(1.15)" : "brightness(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
            transition: "background 0.5s ease",
          }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
          <h3
            style={{
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            {s.title}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", lineHeight: 1.6 }}>{s.desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const CARD_W = 280;
  const GAP = 20;
  const SET_W = services.length * (CARD_W + GAP);

  const wrap = useCallback(
    (v: number) => ((v % SET_W) + SET_W) % SET_W,
    [SET_W],
  );

  const applyPos = useCallback(() => {
    const track = trackRef.current;
    if (track) track.style.transform = `translateX(-${posRef.current}px)`;
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 4000);
  }, []);

  /* Arrow navigation — jump one card */
  const goNext = useCallback(() => {
    pausedRef.current = true;
    posRef.current = wrap(posRef.current + CARD_W + GAP);
    applyPos();
    scheduleResume();
  }, [wrap, applyPos, scheduleResume, CARD_W, GAP]);

  const goPrev = useCallback(() => {
    pausedRef.current = true;
    posRef.current = wrap(posRef.current - CARD_W - GAP);
    applyPos();
    scheduleResume();
  }, [wrap, applyPos, scheduleResume, CARD_W, GAP]);

  /* Autoplay */
  useEffect(() => {
    const animate = () => {
      if (!pausedRef.current) {
        posRef.current = wrap(posRef.current + 0.5);
        applyPos();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [wrap, applyPos]);

  return (
    <section
      style={{ background: "#f8f8f8", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#999",
            marginBottom: "1rem",
          }}
        >
          Ce que nous proposons
        </p>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            fontWeight: 200,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1.3,
          }}
        >
          Nos Soins
        </h2>
      </div>

      {/* Carousel area */}
      <div style={{ position: "relative" }}>
        {/* Track */}
        <div style={{ overflow: "hidden" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: `${GAP}px`,
              willChange: "transform",
            }}
          >
            {items.map((s, i) => (
              <Card key={`${s.title}-${i}`} s={s} />
            ))}
          </div>
        </div>

        {/* Arrow left */}
        <button
          onClick={goPrev}
          aria-label="Précédent"
          style={{
            position: "absolute",
            top: "50%",
            left: "0.75rem",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          <svg width="18" height="18" fill="none" stroke="#000" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Arrow right */}
        <button
          onClick={goNext}
          aria-label="Suivant"
          style={{
            position: "absolute",
            top: "50%",
            right: "0.75rem",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          <svg width="18" height="18" fill="none" stroke="#000" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
