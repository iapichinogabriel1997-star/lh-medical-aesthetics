"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play on iOS/mobile
    const tryPlay = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", tryPlay);
    tryPlay();

    // Also try on user interaction (iOS requirement)
    const handleTouch = () => {
      tryPlay();
      document.removeEventListener("touchstart", handleTouch);
    };
    document.addEventListener("touchstart", handleTouch);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("touchstart", handleTouch);
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
      <video
        ref={videoRef}
        autoPlay
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
          opacity: 0.5,
          zIndex: 1,
        }}
        // iOS needs these as attributes
        {...{ "webkit-playsinline": "true" } as Record<string, string>}
      >
        <source src="/images/video-hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}
