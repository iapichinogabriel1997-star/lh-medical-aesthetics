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

function Card({
  s,
  active,
}: {
  s: (typeof services)[number];
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const lit = active || hovered;

  return (
    <Link
      href={s.href}
      style={{
        flex: "0 0 var(--card-w)",
        textDecoration: "none",
        color: "inherit",
        display: "block",
        transition: "transform 0.5s ease, opacity 0.5s ease",
        transform: active ? "scale(1)" : "scale(0.92)",
        opacity: active ? 1 : 0.5,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          height: "var(--card-h)",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <Image
          src={s.img}
          alt={s.title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease, filter 0.5s ease",
            transform: lit ? "scale(1.06)" : "scale(1)",
            filter: lit ? "brightness(1.1)" : "brightness(0.9)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: active
              ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)"
              : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)",
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
              marginBottom: "0.4rem",
            }}
          >
            {s.title}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.8rem",
              lineHeight: 1.6,
              transition: "opacity 0.4s ease",
              opacity: active ? 1 : 0,
            }}
          >
            {s.desc}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesCarousel() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = services.length;

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(((idx % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* Autoplay: slide every 4s */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % count);
    }, 4000);
  }, [count]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleArrow = (dir: "prev" | "next") => {
    dir === "next" ? next() : prev();
    resetTimer();
  };

  /*
   * Position the track so that `current` card is centered.
   * We use CSS custom properties for card width so it adapts.
   * The offset formula: translateX = -(current * (cardW + gap))
   * The wrapper has padding-left = 50% - cardW/2 to center the active card.
   */

  return (
    <section
      style={{
        background: "#f8f8f8",
        overflow: "hidden",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        // CSS custom props for responsive card sizing
        // @ts-expect-error -- CSS custom properties
        "--card-w": "min(70vw, 380px)",
        "--card-h": "min(55vw, 440px)",
        "--gap": "16px",
      }}
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

      {/* Carousel */}
      <div style={{ position: "relative" }}>
        <div style={{ overflow: "hidden" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "var(--gap)",
              transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
              transform: `translateX(calc(50% - var(--card-w) / 2 - ${current} * (var(--card-w) + var(--gap))))`,
            }}
          >
            {services.map((s, i) => (
              <Card key={s.title} s={s} active={i === current} />
            ))}
          </div>
        </div>

        {/* Arrow left */}
        <button
          onClick={() => handleArrow("prev")}
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
          onClick={() => handleArrow("next")}
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

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i);
                resetTimer();
              }}
              aria-label={`Soin ${i + 1}`}
              style={{
                width: current === i ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: current === i ? "#000" : "#ccc",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
