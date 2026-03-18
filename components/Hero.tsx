"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";

const CODE: { tokens: { t: string; c?: string }[] }[] = [
  { tokens: [{ t: "// rhythm.ui — copy. paste. ship.", c: "token-gray" }] },
  { tokens: [] },
  { tokens: [
    { t: "import", c: "token-purple" }, { t: " { " },
    { t: "Button", c: "token-blue"   }, { t: ", " },
    { t: "Card",   c: "token-blue"   }, { t: ", " },
    { t: "Modal",  c: "token-blue"   }, { t: " } " },
    { t: "from",   c: "token-purple" }, { t: " " },
    { t: "'rhythm-ui'", c: "token-green" },
  ]},
  { tokens: [] },
  { tokens: [
    { t: "export default ", c: "token-purple" },
    { t: "function ",       c: "token-blue"   },
    { t: "App() {" },
  ]},
  { tokens: [{ t: "  return ", c: "token-purple" }, { t: "(" }] },
  { tokens: [
    { t: "    <",        c: "token-gray"   },
    { t: "Button",       c: "token-blue"   },
    { t: " variant=",    c: "token-gray"   },
    { t: '"gradient"',   c: "token-green"  },
    { t: ">",            c: "token-gray"   },
    { t: "Ship it" },
    { t: "</",           c: "token-gray"   },
    { t: "Button",       c: "token-blue"   },
    { t: ">",            c: "token-gray"   },
  ]},
  { tokens: [{ t: "  );" }] },
  { tokens: [{ t: "}" }] },
];

export default function Hero() {
  const badgeRef   = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const codeRef    = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const sy = useSpring(mouseY, { stiffness: 45, damping: 22 });
  const o1x = useTransform(sx, [-1, 1], [-32,  32]);
  const o1y = useTransform(sy, [-1, 1], [-32,  32]);
  const o2x = useTransform(sx, [-1, 1], [ 22, -22]);
  const o2y = useTransform(sy, [-1, 1], [ 22, -22]);

  useEffect(() => {
    // GSAP entrance timeline
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(badgeRef.current,
      { opacity: 0, scale: 0.78, y: 14 },
      { opacity: 1, scale: 1,    y: 0, duration: 0.6, ease: "back.out(2.2)" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
      "-=0.3"
    )
    .fromTo([subRef.current, actionsRef.current],
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(codeRef.current,
      { opacity: 0, y: 36, scale: 0.97 },
      { opacity: 1, y: 0,  scale: 1,    duration: 0.9, ease: "power3.out" },
      "-=0.55"
    );

    // Orb floating loops
    gsap.to(".orb-1", { y: -24, duration: 5,   repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".orb-2", { y:  18, duration: 6.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
    gsap.to(".orb-3", { y: -14, x: 10, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

    // Mouse parallax
    const onMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">

      {/* Fixed grid */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid" />

      {/* Radial hero glow */}
      <div
        className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,111,255,0.09) 0%, transparent 70%)" }}
      />

      {/* Parallax orbs */}
      <motion.div
        className="orb-1 absolute -top-20 -right-12 w-[430px] h-[430px] rounded-full pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(124,111,255,0.17), transparent 70%)", x: o1x, y: o1y }}
      />
      <motion.div
        className="orb-2 absolute bottom-0 -left-16 w-80 h-80 rounded-full pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(255,111,168,0.13), transparent 70%)", x: o2x, y: o2y }}
      />
      <div
        className="orb-3 absolute top-[42%] right-[22%] w-48 h-48 rounded-full pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(111,255,212,0.07), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[1160px] mx-auto px-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* ── LEFT ── */}
        <div className="flex flex-col items-start">

          <div ref={badgeRef} className="opacity-0 mb-7 flex items-center gap-2.5 bg-surface border border-white/[0.13] rounded-full px-4 py-[7px] text-[0.78rem] text-muted2">
            <span className="w-[7px] h-[7px] rounded-full bg-mint shrink-0 animate-pulse shadow-[0_0_8px_#6fffd4]" />
            60+ free components — React · HTML · CSS
          </div>

          <h1 ref={titleRef} className="opacity-0 text-[clamp(2.8rem,5.5vw,4.7rem)] font-bold leading-[1.05] tracking-[-0.05em] mb-6">
            Components that<br />
            move to the <span className="text-grad">rhythm</span>
          </h1>

          <p ref={subRef} className="opacity-0 text-[1rem] text-muted2 font-light leading-[1.78] tracking-[-0.005em] max-w-[420px] mb-9">
            Beautiful, animated UI components for React, HTML &amp; CSS.
            Copy a component, paste it in, ship your product.
          </p>

          <div ref={actionsRef} className="opacity-0 flex flex-wrap gap-3">
            <a
              href="#components"
              className="flex items-center gap-2 bg-grad-btn text-white rounded-[10px] px-7 py-3.5 text-[0.92rem] font-medium tracking-[-0.01em] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              Browse Components <ArrowIcon />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white border border-white/[0.13] rounded-[10px] px-6 py-[13px] text-[0.92rem] font-normal tracking-[-0.01em] hover:border-violet/50 hover:bg-violet/[0.07] hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              <GitHubIcon /> Star on GitHub
            </a>
          </div>
        </div>

        {/* ── RIGHT — code block ── */}
        <motion.div
          ref={codeRef}
          className="hidden lg:block opacity-0 relative bg-surface border border-white/[0.07] rounded-[18px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
          whileHover={{ scale: 1.015, transition: { type: "spring", stiffness: 180, damping: 18 } }}
        >
          {/* Subtle shine */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg,rgba(124,111,255,0.04),rgba(255,111,168,0.02))" }} />

          {/* Window bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-surface2 border-b border-white/[0.07]">
            <div className="flex gap-1.5">
              <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.74rem] text-muted tracking-normal">
              <CodeIcon /> App.tsx
            </span>
          </div>

          {/* Code lines */}
          <div className="py-5">
            {CODE.map((line, i) => (
              <div key={i} className="flex font-mono text-[0.79rem] leading-[1.95] min-h-[1.95em]">
                <span className="min-w-[46px] text-right pr-[18px] text-muted text-[0.72rem] select-none shrink-0">
                  {line.tokens.length > 0 ? i + 1 : ""}
                </span>
                <span className="flex-1 pr-5 text-white/90">
                  {line.tokens.map((tok, j) => (
                    <span key={j} className={tok.c ?? ""}>{tok.t}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ArrowIcon()  {
  return <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function GitHubIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>;
}
function CodeIcon()   {
  return <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M4 3L1 7l3 4M10 3l3 4-3 4M8 2l-2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
