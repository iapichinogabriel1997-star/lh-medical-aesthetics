"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "zoom-in" | "blur-in";
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const animations = {
  "fade-up": { from: { opacity: 0, transform: "translateY(50px)" }, to: { opacity: 1, transform: "translateY(0)" } },
  "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
  "fade-left": { from: { opacity: 0, transform: "translateX(-50px)" }, to: { opacity: 1, transform: "translateX(0)" } },
  "fade-right": { from: { opacity: 0, transform: "translateX(50px)" }, to: { opacity: 1, transform: "translateX(0)" } },
  "zoom-in": { from: { opacity: 0, transform: "scale(0.9)" }, to: { opacity: 1, transform: "scale(1)" } },
  "blur-in": { from: { opacity: 0, filter: "blur(10px)" }, to: { opacity: 1, filter: "blur(0)" } },
};

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const anim = animations[animation];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(visible ? anim.to : anim.from),
        transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
