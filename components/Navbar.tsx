"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Components", href: "#components" },
  { label: "Docs",       href: "/docs"       },
  { label: "Showcase",   href: "/showcase"   },
  { label: "Blog",       href: "/blog"       },
];

export default function Navbar() {
  const navRef   = useRef<HTMLElement>(null);
  const logoRef  = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef   = useRef<HTMLDivElement>(null);
  const pillRef  = useRef<HTMLDivElement>(null);

  const [scrolled,    setScrolled]    = useState(false);
  const [scrollPct,   setScrollPct]   = useState(0);
  const [activeLink,  setActiveLink]  = useState<string | null>(null);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [pillStyle,   setPillStyle]   = useState<{ left: number; width: number } | null>(null);

  const { scrollY } = useScroll();

  /* Scroll-driven blur & border opacity */
  const rawBlur    = useTransform(scrollY, [0, 100], [0, 22]);
  const blurPx     = useSpring(rawBlur, { stiffness: 80, damping: 20 });
  const bgOpacity  = useTransform(scrollY, [0, 80],  [0, 0.82]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);

  /* Progress bar width */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.08 });

      tl.fromTo(logoRef.current,
        { opacity: 0, x: -24, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }
      )
      .fromTo(linksRef.current.filter(Boolean),
        { opacity: 0, y: -12, filter: "blur(3px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.07, duration: 0.55, ease: "power2.out" },
        "-=0.42"
      )
      .fromTo(ctaRef.current,
        { opacity: 0, x: 24, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out" },
        "-=0.48"
      );
    });
    return () => ctx.revert();
  }, []);

  /* Floating pill hover tracker */
  const updatePill = useCallback((el: HTMLElement | null) => {
    if (!el || !navRef.current) { setPillStyle(null); return; }
    const navRect = navRef.current.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    setPillStyle({ left: elRect.left - navRect.left, width: elRect.width });
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 z-[60] h-[2px] pointer-events-none"
        style={{
          width: `${scrollPct}%`,
          background: "linear-gradient(90deg, #7c6fff, #c084fc, #ff6fa8)",
          boxShadow: "0 0 8px rgba(124,111,255,0.6)",
          opacity: scrollPct > 1 ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* ── Nav shell ── */}
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 py-0"
        style={{
          backdropFilter: `blur(${blurPx.get()}px)`,
          WebkitBackdropFilter: `blur(${blurPx.get()}px)`,
        }}
      >
        {/* Animated bg fill + border */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(10,8,22,1)",
            opacity: bgOpacity,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(124,111,255,0.5) 30%, rgba(255,111,168,0.4) 60%, transparent 100%)",
            opacity: borderOpacity,
          }}
        />

        {/* Inner container */}
        <div className="relative max-w-[1180px] mx-auto px-7">
          <div className="flex items-center justify-between h-[62px]">

            {/* ── Logo ── */}
            <Link
              ref={logoRef}
              href="/"
              className="flex items-center gap-2.5 no-underline opacity-0 shrink-0 group"
            >
              <motion.span
                className="relative w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(124,111,255,0.18), rgba(255,111,168,0.1))",
                  border: "1px solid rgba(124,111,255,0.28)",
                }}
                whileHover={{ scale: 1.1, rotate: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                {/* Inner shine */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(124,111,255,0.2), transparent)" }}
                />
                <LogoMark />
              </motion.span>

              <span className="text-[1.05rem] font-bold tracking-[-0.055em] text-white">
                rhythm
                <motion.span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(120deg, #9d8fff 0%, #c084fc 50%, #ff8aaa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                >
                  .ui
                </motion.span>
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="relative hidden md:block">
              {/* Floating hover pill */}
              <AnimatePresence>
                {pillStyle && (
                  <motion.div
                    ref={pillRef}
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none rounded-[8px]"
                    style={{ height: 34 }}
                    initial={{ opacity: 0, left: pillStyle.left, width: pillStyle.width }}
                    animate={{ opacity: 1, left: pillStyle.left, width: pillStyle.width }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  >
                    <div
                      className="w-full h-full rounded-[8px]"
                      style={{
                        background: "rgba(124,111,255,0.1)",
                        border: "1px solid rgba(124,111,255,0.18)",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <ul className="flex gap-0.5 list-none m-0 p-0 items-center">
                {NAV_LINKS.map((l, i) => (
                  <li
                    key={l.label}
                    ref={(el) => { linksRef.current[i] = el; }}
                    className="opacity-0"
                  >
                    <NavLink
                      href={l.href}
                      isActive={activeLink === l.href}
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── CTA group ── */}
            <div ref={ctaRef} className="flex items-center gap-2.5 opacity-0">

              {/* GitHub icon button */}
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-[34px] h-[34px] rounded-[8px] flex items-center justify-center overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(180,176,210,0.7)",
                }}
                whileHover={{ scale: 1.08, color: "#fff" }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                {/* Hover shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  style={{ background: "radial-gradient(circle at center, rgba(124,111,255,0.15), transparent 70%)" }}
                  whileHover={{ opacity: 1 }}
                />
                <GitHubIcon />
              </motion.a>

              {/* Get Started CTA */}
              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}>
                <Link
                  href="/docs"
                  className="relative flex items-center gap-1.5 text-white rounded-[10px] px-[18px] py-[8px] text-[0.84rem] font-medium tracking-[-0.015em] no-underline overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #7c6fff 0%, #a260f5 55%, #d467a8 100%)",
                    boxShadow: "0 0 0 1px rgba(124,111,255,0.35), 0 4px 20px rgba(124,111,255,0.22), 0 1px 4px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Animated shine */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)" }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
                  />
                  Get Started <ArrowIcon />
                </Link>
              </motion.div>

              {/* Mobile menu toggle */}
              <motion.button
                className="md:hidden w-[34px] h-[34px] rounded-[8px] flex flex-col items-center justify-center gap-[5px]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onClick={() => setMobileOpen(o => !o)}
                whileTap={{ scale: 0.94 }}
                aria-label="Toggle menu"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block h-px w-[16px] rounded-full bg-white"
                    style={{ opacity: i === 1 ? 0.6 : 0.9 }}
                    animate={mobileOpen ? {
                      rotate:      i === 0 ? 45 : i === 2 ? -45 : 0,
                      y:           i === 0 ?  5 : i === 2 ? -5  : 0,
                      opacity:     i === 1 ? 0 : 1,
                      width:       i === 1 ? 0 : 16,
                    } : {
                      rotate:  0,
                      y:       0,
                      opacity: i === 1 ? 0.6 : 0.9,
                      width:   16,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  />
                ))}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className="md:hidden overflow-hidden"
              style={{
                background: "rgba(10,8,22,0.97)",
                borderTop: "1px solid rgba(124,111,255,0.12)",
                backdropFilter: "blur(20px)",
              }}
            >
              <ul className="list-none m-0 p-0 px-5 py-3 flex flex-col gap-0.5">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 22 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3.5 py-3 text-[0.9rem] tracking-[-0.01em] rounded-[8px] no-underline transition-colors"
                      style={{ color: "rgba(180,176,210,0.8)" }}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

/* ── Nav link with pointer-tracked state ── */
function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href={href}
      className="relative block px-3.5 py-[7px] text-[0.85rem] tracking-[-0.01em] rounded-lg no-underline transition-colors duration-150 z-10"
      style={{
        color: isActive ? "rgba(220,216,255,0.95)" : "rgba(160,155,200,0.7)",
        fontWeight: isActive ? 450 : 400,
      }}
    >
      {children}

      {/* Active dot indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
            style={{ background: "rgba(124,111,255,0.9)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}

/* ── Icons ── */
function LogoMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path
        d="M3 10 Q6.5 2 10 10 Q13.5 18 17 10"
        stroke="url(#navLG)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <linearGradient id="navLG" x1="3" y1="10" x2="17" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9d8fff" />
          <stop offset="1" stopColor="#ff8aaa" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}