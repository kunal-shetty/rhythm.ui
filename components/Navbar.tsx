"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Components", href: "#components" },
  { label: "Docs",       href: "/docs"       },
  { label: "Showcase",   href: "/showcase"   },
  { label: "Blog",       href: "/blog"       },
];

export default function Navbar() {
  const logoRef  = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef   = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 80], [0, 18]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.05 });
    tl.fromTo(logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.65, ease: "power3.out" }
    )
    .fromTo(linksRef.current.filter(Boolean),
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, stagger: 0.065, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
      "-=0.45"
    );

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      style={{ backdropFilter: `blur(${blurPx}px)`, WebkitBackdropFilter: `blur(${blurPx}px)` }}
      className={[
        "fixed top-0 left-0 right-0 z-50 py-4 border-b transition-all duration-300",
        scrolled ? "bg-bg/80 border-white/[0.07]" : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div className="max-w-[1160px] mx-auto px-7 flex items-center justify-between">

        {/* Logo */}
        <Link ref={logoRef} href="/" className="flex items-center gap-2.5 no-underline opacity-0">
          <span className="w-8 h-8 rounded-[7px] bg-surface border border-white/[0.13] flex items-center justify-center shrink-0">
            <LogoMark />
          </span>
          <span className="text-[1.06rem] font-bold tracking-[-0.05em] text-white">
            rhythm<span className="text-violet">.ui</span>
          </span>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex gap-0.5 list-none m-0 p-0">
          {NAV_LINKS.map((l, i) => (
            <li key={l.label} ref={(el) => { linksRef.current[i] = el; }} className="opacity-0">
              <NavLink href={l.href}>{l.label}</NavLink>
            </li>
          ))}
        </ul>

        {/* CTA group */}
        <div ref={ctaRef} className="flex items-center gap-2.5 opacity-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center bg-surface border border-white/[0.07] text-muted2 hover:text-white hover:border-white/[0.13] transition-colors"
          >
            <GitHubIcon />
          </a>
          <Link
            href="/docs"
            className="flex items-center gap-1.5 bg-grad-btn text-white rounded-[10px] px-[18px] py-[8px] text-[0.84rem] font-medium tracking-[-0.01em] shadow-glow hover:shadow-glow-lg hover:-translate-y-px transition-all duration-200 no-underline"
          >
            Get Started <ArrowIcon />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

/* Animated nav link with GSAP micro-lift */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={() => gsap.to(ref.current, { y: -2, duration: 0.2, ease: "power2.out" })}
      onMouseLeave={() => gsap.to(ref.current, { y: 0, duration: 0.3, ease: "power2.out" })}
      className="block px-3.5 py-[7px] text-muted2 text-[0.86rem] font-normal tracking-[-0.01em] rounded-lg hover:text-white hover:bg-white/5 transition-colors no-underline"
    >
      {children}
    </Link>
  );
}

/* ── Icons ── */
function LogoMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path d="M3 10 Q6.5 2 10 10 Q13.5 18 17 10" stroke="url(#navLG)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <defs>
        <linearGradient id="navLG" x1="3" y1="10" x2="17" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c6fff" /><stop offset="1" stopColor="#ff6fa8" />
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
