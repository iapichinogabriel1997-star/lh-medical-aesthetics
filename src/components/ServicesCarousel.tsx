"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

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

/* duplicate the list so the track is wide enough for seamless looping */
const items = [...services, ...services];

function Card({ s }: { s: (typeof services)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={s.href}
      style={{
        flex: "0 0 300px",
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
          height: "400px",
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speed = 0.5;

  const cardWidth = 300;
  const gap = 24;
  const setWidth = services.length * (cardWidth + gap);

  /* wrap position so it stays in [0, setWidth) */
  const wrap = (v: number) => ((v % setWidth) + setWidth) % setWidth;

  const applyPos = () => {
    const track = trackRef.current;
    if (track) track.style.transform = `translateX(-${posRef.current}px)`;
  };

  /* schedule autoplay resume after user interaction */
  const scheduleResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 2500);
  };

  /* ── mouse drag ── */
  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    pausedRef.current = true;
    startXRef.current = e.clientX;
    startPosRef.current = posRef.current;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return;
    const delta = startXRef.current - e.clientX;
    posRef.current = wrap(startPosRef.current + delta);
    applyPos();
  };

  const onMouseUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    scheduleResume();
  };

  /* ── touch swipe ── */
  const onTouchStart = (e: React.TouchEvent) => {
    pausedRef.current = true;
    draggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    startPosRef.current = posRef.current;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    const delta = startXRef.current - e.touches[0].clientX;
    posRef.current = wrap(startPosRef.current + delta);
    applyPos();
  };

  const onTouchEnd = () => {
    draggingRef.current = false;
    scheduleResume();
  };

  /* ── autoplay loop ── */
  useEffect(() => {
    const animate = () => {
      if (!pausedRef.current) {
        posRef.current = wrap(posRef.current + speed);
        applyPos();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

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
        ref={wrapperRef}
        style={{
          overflow: "hidden",
          cursor: draggingRef.current ? "grabbing" : "grab",
          touchAction: "pan-y",
          userSelect: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            willChange: "transform",
            pointerEvents: draggingRef.current ? "none" : "auto",
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
