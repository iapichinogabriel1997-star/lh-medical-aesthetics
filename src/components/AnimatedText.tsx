"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function AnimatedText({
  text,
  tag: Tag = "h1",
  style,
  className,
  delay = 0,
  speed = 30,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} style={style} className={className}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
          {word.split("").map((char, ci) => {
            const idx = words.slice(0, wi).join(" ").length + ci;
            return (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  transform: visible ? "translateY(0)" : "translateY(110%)",
                  opacity: visible ? 1 : 0,
                  transition: `transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay + idx * speed / 1000}s, opacity 0.4s ease ${delay + idx * speed / 1000}s`,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
