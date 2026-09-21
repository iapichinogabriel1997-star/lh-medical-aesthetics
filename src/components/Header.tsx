"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Accueil" },
  {
    label: "Nos Services",
    sub: [
      { href: "/epilation-laser", label: "Épilation définitive" },
      { href: "/cryolipolyse", label: "Cryolipolyse" },
      { href: "/cryolipolyse", label: "Radiofréquence" },
      { href: "/cryolipolyse", label: "Lipocavitation" },
    ],
  },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const servicePaths = ["/epilation-laser", "/cryolipolyse", "/services"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopSubOpen, setDesktopSubOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const pathname = usePathname();
  const subTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isServiceActive = servicePaths.includes(pathname);

  const openDesktopSub = () => {
    if (subTimeout.current) clearTimeout(subTimeout.current);
    setDesktopSubOpen(true);
  };
  const closeDesktopSub = () => {
    subTimeout.current = setTimeout(() => setDesktopSubOpen(false), 150);
  };

  const linkColor = (active: boolean) =>
    active
      ? scrolled ? "#000" : "#fff"
      : scrolled ? "#888" : "rgba(255,255,255,0.7)";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? "70px" : "90px",
          transition: "height 0.4s ease",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <Image
            src="/images/logo.svg"
            alt="LH Medical Aesthetics"
            width={50}
            height={50}
            style={{ filter: scrolled ? "none" : "invert(1)", transition: "filter 0.4s ease" }}
          />
          <span
            className="hidden sm:inline"
            style={{
              fontSize: "0.75rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: scrolled ? "#000" : "#fff",
              transition: "color 0.4s ease",
            }}
          >
            Medical Aesthetics
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ alignItems: "center", gap: "2.5rem" }} className="hidden md:!flex">
          {navLinks.map((link) => {
            if ("sub" in link && link.sub) {
              return (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={openDesktopSub}
                  onMouseLeave={closeDesktopSub}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: linkColor(isServiceActive),
                      fontWeight: isServiceActive ? 500 : 400,
                      transition: "color 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: 0,
                      fontFamily: "inherit",
                    }}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      style={{
                        transition: "transform 0.3s ease",
                        transform: desktopSubOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      paddingTop: "0.75rem",
                      opacity: desktopSubOpen ? 1 : 0,
                      pointerEvents: desktopSubOpen ? "auto" : "none",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                  >
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "6px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                        padding: "0.6rem 0",
                        minWidth: "220px",
                      }}
                    >
                      {link.sub.map((subLink) => (
                        <Link
                          key={subLink.label}
                          href={subLink.href}
                          style={{
                            display: "block",
                            padding: "0.7rem 1.5rem",
                            fontSize: "0.7rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase" as const,
                            textDecoration: "none",
                            color: pathname === subLink.href ? "#000" : "#777",
                            fontWeight: pathname === subLink.href ? 500 : 400,
                            transition: "color 0.2s ease, background 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f5f5f5";
                            e.currentTarget.style.color = "#000";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = pathname === subLink.href ? "#000" : "#777";
                          }}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href!}
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  textDecoration: "none",
                  color: linkColor(pathname === link.href),
                  fontWeight: pathname === link.href ? 500 : 400,
                  transition: "color 0.3s ease",
                  position: "relative",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/reservation"
            style={{
              marginLeft: "1rem",
              padding: "0.7rem 1.8rem",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              background: scrolled ? "#000" : "#fff",
              color: scrolled ? "#fff" : "#000",
              transition: "all 0.4s ease",
            }}
          >
            Rendez-vous
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "8px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: scrolled ? "#000" : "#fff",
                transition: "all 0.3s ease",
                transform:
                  mobileOpen && i === 0
                    ? "rotate(45deg) translateY(4px)"
                    : mobileOpen && i === 2
                    ? "rotate(-45deg) translateY(-4px)"
                    : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden animate-slide-down"
          style={{
            background: "#fff",
            borderTop: "1px solid #f0f0f0",
            padding: "2rem",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {navLinks.map((link) => {
              if ("sub" in link && link.sub) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileSubOpen(!mobileSubOpen)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase" as const,
                        color: isServiceActive ? "#000" : "#999",
                        padding: "0.5rem 0",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        width: "100%",
                      }}
                    >
                      {link.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        style={{
                          transition: "transform 0.3s ease",
                          transform: mobileSubOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileSubOpen && (
                      <div style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                        {link.sub.map((subLink) => (
                          <Link
                            key={subLink.label}
                            href={subLink.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              fontSize: "0.75rem",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase" as const,
                              textDecoration: "none",
                              color: pathname === subLink.href ? "#000" : "#aaa",
                              padding: "0.45rem 0",
                              borderLeft: "2px solid #e0e0e0",
                              paddingLeft: "1rem",
                            }}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    textDecoration: "none",
                    color: pathname === link.href ? "#000" : "#999",
                    padding: "0.5rem 0",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/reservation"
              onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{ textAlign: "center", marginTop: "0.5rem" }}
            >
              Prendre rendez-vous
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
