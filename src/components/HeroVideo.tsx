"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 8;
    video.play().catch(() => {});
  }, []);

  return (
    <>
      {/* Image fallback visible pendant le chargement de la vidéo */}
      <Image
        src="/images/8.webp"
        alt=""
        fill
        priority
        style={{ objectFit: "cover", opacity: 0.5 }}
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/8.webp"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.5,
          zIndex: 1,
        }}
      >
        <source src="/images/video-lh.mp4" type="video/mp4" />
      </video>
    </>
  );
}
