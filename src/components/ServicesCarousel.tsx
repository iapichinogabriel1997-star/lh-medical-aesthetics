"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";

const services = [
  {
    title: "Épilation Laser",
    desc: "Technologie Laser-Pro 4 longueurs d'ondes pour tous les types de peaux.",
    img: "/images/1.webp",
    href: "/services",
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

export default function ServicesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive(index);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    const scrollLeft = card.offsetLeft - (track.offsetWidth / 2 - card.offsetWidth / 2);
    track.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, []);

  /* autoplay */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % services.length;
        goTo(next);
        return next;
      });
    }, 4000);
  }, [goTo]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleClick = (i: number) => {
    goTo(i);
    resetTimer();
  };

  return (
    <section className="section-padding" style={{ background: "#f8f8f8", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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

        {/* Carousel track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            padding: "0 1rem 1rem",
          }}
        >
          {services.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              onClick={() => handleClick(i)}
              style={{
                flex: "0 0 280px",
                scrollSnapAlign: "center",
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.4s ease, opacity 0.4s ease",
                transform: active === i ? "scale(1)" : "scale(0.95)",
                opacity: active === i ? 1 : 0.6,
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "360px",
                  overflow: "hidden",
                  background: "#e0e0e0",
                }}
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                />
                {/* gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
                  }}
                />
                {/* text */}
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
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "2rem" }}>
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              aria-label={`Aller au soin ${i + 1}`}
              style={{
                width: active === i ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: active === i ? "#000" : "#ccc",
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
