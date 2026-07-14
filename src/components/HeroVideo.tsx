"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      video.play().then(() => setVideoLoaded(true)).catch(() => {});
    };

    video.addEventListener("canplaythrough", handleCanPlay);
    video.load();

    return () => video.removeEventListener("canplaythrough", handleCanPlay);
  }, []);

  return (
    <>
      {/* Image fallback toujours visible derrière */}
      <Image
        src="/images/8.webp"
        alt=""
        fill
        priority
        style={{ objectFit: "cover", opacity: 0.5 }}
      />
      {/* Vidéo par-dessus quand elle est prête */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoLoaded ? 0.5 : 0,
          zIndex: 1,
          transition: "opacity 1s ease",
        }}
      >
        <source src="/images/video-hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}
