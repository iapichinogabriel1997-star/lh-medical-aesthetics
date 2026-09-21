"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

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

/* duplicate the list so the track is wide enough for seamless looping */
const items = [...services, ...services];

function Card({ s }: { s: (typeof services)[number] }) {
  return (
    <Link
      href={s.href}
      style={{
        flex: "0 0 300px",
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "400px",
          overflow: "hidden",
          borderRadius: "6px",
        }}
      >
        <Image
          src={s.img}
          alt={s.title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "1.5rem",
          }}
        >
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
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.8rem",
              lineHeight: 1.6,
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const speed = 0.5; /* px per frame */

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    /* width of the first set (4 cards + gaps) */
    const cardWidth = 300;
    const gap = 24; /* 1.5rem ≈ 24px */
    const setWidth = services.length * (cardWidth + gap);

    const animate = () => {
      if (!paused) {
        posRef.current += speed;
        if (posRef.current >= setWidth) {
          posRef.current -= setWidth;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  return (
    <section
      className="section-padding"
      style={{ background: "#f8f8f8", overflow: "hidden" }}
    >
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

      {/* Track wrapper */}
      <div
        style={{ overflow: "hidden", cursor: "grab" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            willChange: "transform",
          }}
        >
          {items.map((s, i) => (
            <Card key={`${s.title}-${i}`} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
