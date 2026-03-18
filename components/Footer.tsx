"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const COLS: Record<string, string[]> = {
  Product:   ["Components", "Documentation", "Showcase", "Changelog"],
  Resources: ["Getting Started", "Examples", "Figma Kit", "Blog"],
  Community: ["GitHub", "Discord", "Twitter / X", "Contributing"],
};

const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const col  = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.07] pt-16 pb-8">
      <div className="max-w-[1160px] mx-auto px-7">
        <motion.div variants={wrap} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={col}>
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-8 h-8 rounded-[7px] bg-surface border border-white/[0.13] flex items-center justify-center shrink-0">
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10 Q6.5 2 10 10 Q13.5 18 17 10" stroke="url(#fLG)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                  <defs><linearGradient id="fLG" x1="3" y1="10" x2="17" y2="10" gradientUnits="userSpaceOnUse"><stop stopColor="#7c6fff"/><stop offset="1" stopColor="#ff6fa8"/></linearGradient></defs>
                </svg>
              </span>
              <span className="text-[1.05rem] font-bold tracking-[-0.05em]">rhythm<span className="text-violet">.ui</span></span>
            </div>
            <p className="text-muted text-[0.84rem] font-light leading-[1.7] tracking-[-0.005em] max-w-[250px] mb-5">
              Beautiful, animated UI components for React, HTML &amp; CSS. Free forever.
            </p>
            <div className="flex gap-2">
              {[
                { href: "https://github.com", icon: <GHIcon /> },
                { href: "#",                  icon: <DCIcon /> },
                { href: "#",                  icon: <XIcon  /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface border border-white/[0.07] text-muted hover:text-white hover:border-white/[0.13] hover:-translate-y-0.5 transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav cols */}
          {Object.entries(COLS).map(([title, links]) => (
            <motion.div key={title} variants={col}>
              <h4 className="text-[0.75rem] font-semibold tracking-[0.06em] uppercase text-muted mb-3.5">{title}</h4>
              <ul className="space-y-2.5 list-none m-0 p-0">
                {links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-muted2 text-[0.86rem] font-light tracking-[-0.008em] hover:text-white transition-colors no-underline">{l}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="border-t border-white/[0.07] pt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="text-muted text-[0.78rem] tracking-[-0.005em]">© {new Date().getFullYear()} rhythm.ui — Built with precision. Free forever.</span>
          <div className="flex gap-5">
            {["Privacy", "License", "Terms"].map((l) => (
              <Link key={l} href="#" className="text-muted text-[0.78rem] hover:text-white transition-colors no-underline">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function GHIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>; }
function DCIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.053a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>; }
function XIcon()  { return <svg width="13" height="13" viewBox="0 0 15 15" fill="none"><path d="M1.5 1.5L13.5 13.5M13.5 1.5L1.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
