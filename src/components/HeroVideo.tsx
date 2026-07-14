"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = "/images/video-hero.mp4";
    video.load();

    const play = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", play);
    play();

    window.addEventListener("touchstart", play, { once: true });
    window.addEventListener("click", play, { once: true });
    window.addEventListener("scroll", play, { once: true });

    return () => {
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <>
      <Image
        src="/images/8.webp"
        alt=""
        fill
        priority
        style={{ objectFit: "cover", opacity: 0.5 }}
      />
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        webkit-playsinline=""
        x5-playsinline=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.5,
          zIndex: 1,
        }}
      />
    </>
  );
}
