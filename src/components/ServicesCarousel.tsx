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
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const dragDistRef = useRef(0);
  const lockedAxisRef = useRef<"x" | "y" | null>(null);
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
    }, 3000);
  }, []);

  /* ── pointer events (mouse + touch unified) ── */
  const onDown = useCallback((clientX: number, clientY: number) => {
    draggingRef.current = true;
    pausedRef.current = true;
    dragStartXRef.current = clientX;
    dragStartYRef.current = clientY;
    dragStartPosRef.current = posRef.current;
    dragDistRef.current = 0;
    lockedAxisRef.current = null;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const onMove = useCallback(
    (clientX: number, clientY: number, e: Event) => {
      if (!draggingRef.current) return;

      const dx = dragStartXRef.current - clientX;
      const dy = dragStartYRef.current - clientY;

      /* Lock axis after 8px of movement to decide scroll vs swipe */
      if (!lockedAxisRef.current) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          lockedAxisRef.current = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
        }
        return;
      }

      /* If vertical scroll, release control */
      if (lockedAxisRef.current === "y") {
        draggingRef.current = false;
        scheduleResume();
        return;
      }

      /* Horizontal swipe — prevent page scroll and move carousel */
      e.preventDefault();
      dragDistRef.current = dx;
      posRef.current = wrap(dragStartPosRef.current + dx);
      applyPos();
    },
    [wrap, applyPos, scheduleResume],
  );

  const onUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    lockedAxisRef.current = null;
    scheduleResume();
  }, [scheduleResume]);

  /* Attach touch listeners with { passive: false } so we can preventDefault */
  useEffect(() => {
    const el = trackRef.current?.parentElement;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      onDown(t.clientX, t.clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      onMove(t.clientX, t.clientY, e);
    };
    const handleTouchEnd = () => onUp();

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onDown, onMove, onUp]);

  /* ── mouse drag ── */
  const onMouseDown = (e: React.MouseEvent) => onDown(e.clientX, e.clientY);
  const onMouseMove = (e: React.MouseEvent) =>
    onMove(e.clientX, e.clientY, e.nativeEvent);
  const onMouseUp = () => onUp();

  /* ── autoplay ── */
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
      className="section-padding"
      style={{ background: "#f8f8f8", overflow: "hidden" }}
    >
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

      <div
        style={{
          overflow: "hidden",
          cursor: "grab",
          userSelect: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
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
    </section>
  );
}
