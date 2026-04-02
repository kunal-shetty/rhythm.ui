"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const CODE: { tokens: { t: string; c?: string }[] }[] = [
  { tokens: [{ t: "// rhythm.ui — copy. paste. ship.", c: "token-gray" }] },
  { tokens: [] },
  {
    tokens: [
      { t: "import", c: "token-purple" }, { t: " { " },
      { t: "Button", c: "token-blue" }, { t: ", " },
      { t: "Card", c: "token-blue" }, { t: ", " },
      { t: "Modal", c: "token-blue" }, { t: " } " },
      { t: "from", c: "token-purple" }, { t: " " },
      { t: "'rhythm-ui'", c: "token-green" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { t: "export default ", c: "token-purple" },
      { t: "function ", c: "token-blue" },
      { t: "App() {" },
    ],
  },
  { tokens: [{ t: "  return ", c: "token-purple" }, { t: "(" }] },
  {
    tokens: [
      { t: "    <", c: "token-gray" },
      { t: "Button", c: "token-blue" },
      { t: " variant=", c: "token-gray" },
      { t: '"gradient"', c: "token-green" },
      { t: ">", c: "token-gray" },
      { t: "Ship it" },
      { t: "</", c: "token-gray" },
      { t: "Button", c: "token-blue" },
      { t: ">", c: "token-gray" },
    ],
  },
  { tokens: [{ t: "  );" }] },
  { tokens: [{ t: "}" }] },
];

const STATS = [
  { value: "60+", label: "Components" },
  { value: "12k", label: "GitHub Stars" },
  { value: "3.2k", label: "Developers" },
];

/* ─── Noise SVG for subtle texture ─── */
function NoiseSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ─── Animated scan line ─── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-30"
      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(124,111,255,0.35) 50%, transparent 100%)" }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 9, ease: "linear", repeat: Infinity, repeatDelay: 4 }}
    />
  );
}

/* ─── Floating dot grid accent ─── */
function DotGrid() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        right: "3%",
        top: "18%",
        width: 160,
        height: 160,
        backgroundImage: "radial-gradient(circle, rgba(124,111,255,0.25) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }}
    />
  );
}

export default function Hero() {
  const badgeRef   = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const codeRef    = useRef<HTMLDivElement>(null);

  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 40, damping: 20 });

  /* Multi-layer parallax */
  const o1x = useTransform(sx, [-1, 1], [-38, 38]);
  const o1y = useTransform(sy, [-1, 1], [-38, 38]);
  const o2x = useTransform(sx, [-1, 1], [28, -28]);
  const o2y = useTransform(sy, [-1, 1], [22, -22]);
  const o3x = useTransform(sx, [-1, 1], [-16, 16]);
  const o3y = useTransform(sy, [-1, 1], [-20, 20]);
  const cardRotX = useTransform(sy, [-1, 1], [4, -4]);
  const cardRotY = useTransform(sx, [-1, 1], [-5, 5]);

  /* Blinking cursor in code block */
  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    /* ── GSAP entrance ── */
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(badgeRef.current,
        { opacity: 0, scale: 0.72, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(2.5)" }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 60, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: "power4.out" },
        "-=0.35"
      )
      .fromTo([subRef.current],
        { opacity: 0, y: 28, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75, ease: "power3.out" },
        "-=0.45"
      )
      .fromTo(actionsRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.35"
      )
      .fromTo(statsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(codeRef.current,
        { opacity: 0, y: 48, scale: 0.95, rotateX: 8 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.0, ease: "power3.out" },
        "-=0.7"
      );

      /* Orb looping floats */
      gsap.to(".orb-a", { y: -28, x: 10,  duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-b", { y:  20, x: -8,  duration: 7.0, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
      gsap.to(".orb-c", { y: -18, x:  6,  duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.4 });
      gsap.to(".orb-d", { y:  12, x: -12, duration: 6.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

      /* Shimmering grid fade */
      gsap.fromTo(".bg-grid",
        { opacity: 0 },
        { opacity: 1, duration: 2.5, ease: "power1.out", delay: 0.3 }
      );
    });

    /* Mouse parallax */
    const onMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouse);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [mouseX, mouseY]);

  const handleCopy = () => {
    const code = `import { Button, Card, Modal } from 'rhythm-ui'\n\nexport default function App() {\n  return (\n    <Button variant="gradient">Ship it</Button>\n  );\n}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden">

      {/* Noise texture overlay */}
      <NoiseSVG />

      {/* Animated scan line */}
      <ScanLine />

      {/* Fixed grid (opacity animated via GSAP) */}
      <div className="bg-grid fixed inset-0 z-0 pointer-events-none opacity-0" />

      {/* Vignette edges */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)" }}
      />

      {/* Hero radial bloom — layered */}
      <div
        className="absolute -top-64 left-1/2 -translate-x-1/2 w-[1100px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,111,255,0.10) 0%, rgba(255,111,168,0.04) 45%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full pointer-events-none blur-[1px]"
        style={{ background: "radial-gradient(ellipse, rgba(124,111,255,0.05) 0%, transparent 65%)" }}
      />

      {/* Parallax orbs */}
      <motion.div
        className="orb-a absolute -top-24 -right-16 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,111,255,0.22), rgba(93,78,255,0.08) 50%, transparent 70%)",
          filter: "blur(72px)",
          x: o1x, y: o1y,
        }}
      />
      <motion.div
        className="orb-b absolute -bottom-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,111,168,0.18), rgba(255,60,120,0.05) 55%, transparent 70%)",
          filter: "blur(80px)",
          x: o2x, y: o2y,
        }}
      />
      <motion.div
        className="orb-c absolute top-[35%] right-[28%] w-52 h-52 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(111,255,212,0.10), transparent 70%)",
          filter: "blur(60px)",
          x: o3x, y: o3y,
        }}
      />
      <div
        className="orb-d absolute bottom-[22%] right-[8%] w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,200,111,0.08), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Dot grid accent */}
      <DotGrid />

      {/* ─── Main grid ─── */}
      <div className="relative z-10 max-w-[1180px] mx-auto px-7 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ══ LEFT ══ */}
        <div className="flex flex-col items-start">

          {/* Badge */}
          <div
            ref={badgeRef}
            className="opacity-0 mb-8 flex items-center gap-2.5 rounded-full px-4 py-[6px] text-[0.76rem] tracking-wide font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(124,111,255,0.12), rgba(255,111,168,0.07))",
              border: "1px solid rgba(124,111,255,0.22)",
              color: "rgba(200,196,255,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="relative flex h-[7px] w-[7px] shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6fffd4] opacity-60" />
              <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#6fffd4] shadow-[0_0_6px_#6fffd4]" />
            </span>
            60+ free components · React · HTML · CSS
          </div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="opacity-0 font-bold leading-[1.03] tracking-[-0.055em] mb-6"
            style={{ fontSize: "clamp(2.9rem, 5.8vw, 5rem)" }}
          >
            Components that<br />
            move to the{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(120deg, #c8c3ff 0%, #b084f5 35%, #ff8aaa 70%, #ffb86c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              rhythm
              {/* Underline shimmer */}
              
            </span>
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="opacity-0 text-[1.02rem] leading-[1.82] tracking-[-0.01em] mb-9 max-w-[430px]"
            style={{ color: "rgba(180,176,210,0.85)" }}
          >
            Beautiful, animated UI components for React, HTML &amp; CSS.
            Copy a component, paste it in,{" "}
            <span style={{ color: "rgba(220,216,255,0.95)", fontWeight: 500 }}>ship your product.</span>
          </p>

          {/* CTAs */}
          <div ref={actionsRef} className="opacity-0 flex flex-wrap gap-3 mb-10">
            <motion.a
              href="#components"
              className="relative flex items-center gap-2.5 text-white rounded-[11px] px-7 py-3.5 text-[0.91rem] font-medium tracking-[-0.01em] no-underline overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #7c6fff 0%, #a066f5 50%, #d467a8 100%)",
                boxShadow: "0 0 0 1px rgba(124,111,255,0.4), 0 8px 32px rgba(124,111,255,0.28), 0 2px 8px rgba(0,0,0,0.3)",
              }}
              whileHover={{ scale: 1.03, y: -1.5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              {/* Shine sweep on hover */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              Browse Components <ArrowIcon />
            </motion.a>

            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white rounded-[11px] px-6 py-[13px] text-[0.91rem] font-normal tracking-[-0.01em] no-underline"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.11)",
                backdropFilter: "blur(10px)",
              }}
              whileHover={{
                scale: 1.03,
                y: -1.5,
                borderColor: "rgba(124,111,255,0.45)",
                backgroundColor: "rgba(124,111,255,0.08)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <GitHubIcon /> Star on GitHub
            </motion.a>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="opacity-0 flex items-center gap-7">
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-[1.55rem] font-bold tracking-[-0.04em] leading-none"
                  style={{
                    background: "linear-gradient(135deg, #e8e6ff 0%, #c9c3ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </span>
                <span className="text-[0.73rem] tracking-[0.06em] uppercase mt-0.5" style={{ color: "rgba(180,176,210,0.55)" }}>
                  {s.label}
                </span>
              </div>
            ))}
            
          </div>
        </div>

        {/* ══ RIGHT — Enhanced code block ══ */}
        <motion.div
          ref={codeRef}
          className="hidden lg:block opacity-0 relative"
          style={{ perspective: "900px" }}
        >
          <motion.div
            className="relative rounded-[20px] overflow-hidden"
            style={{
              rotateX: cardRotX,
              rotateY: cardRotY,
              background: "linear-gradient(145deg, rgba(30,26,52,0.98) 0%, rgba(20,17,38,0.98) 100%)",
              border: "1px solid rgba(124,111,255,0.18)",
              boxShadow: `
                0 0 0 1px rgba(0,0,0,0.5),
                0 4px 6px rgba(0,0,0,0.3),
                0 20px 40px rgba(0,0,0,0.5),
                0 60px 100px rgba(0,0,0,0.4),
                inset 0 1px 0 rgba(255,255,255,0.06),
                0 0 60px rgba(124,111,255,0.06)
              `,
              transformStyle: "preserve-3d",
            }}
            whileHover={{
              scale: 1.012,
              transition: { type: "spring", stiffness: 160, damping: 18 },
            }}
          >
            {/* Top corner glows */}
            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(124,111,255,0.12), transparent 70%)", filter: "blur(10px)" }}
            />
            <div
              className="absolute -top-4 right-10 w-20 h-20 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,111,168,0.08), transparent 70%)", filter: "blur(8px)" }}
            />

            {/* Subtle interior grid lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Window bar */}
            <div
              className="relative flex items-center gap-3 px-5 py-3.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.25)" }}
            >
              {/* Traffic lights */}
              <div className="flex gap-[6px]">
                {[
                  { bg: "#ff5f57", shadow: "rgba(255,95,87,0.4)" },
                  { bg: "#febc2e", shadow: "rgba(254,188,46,0.4)" },
                  { bg: "#28c840", shadow: "rgba(40,200,64,0.4)" },
                ].map((d, i) => (
                  <motion.span
                    key={i}
                    className="w-[11px] h-[11px] rounded-full block"
                    style={{ background: d.bg, boxShadow: `0 0 6px ${d.shadow}` }}
                    whileHover={{ scale: 1.25 }}
                  />
                ))}
              </div>

              {/* Tab pill */}
              <div
                className="mx-auto flex items-center gap-1.5 font-mono text-[0.73rem] tracking-normal rounded-md px-3 py-1"
                style={{
                  background: "rgba(124,111,255,0.1)",
                  border: "1px solid rgba(124,111,255,0.18)",
                  color: "rgba(196,192,255,0.8)",
                }}
              >
                <CodeIcon /> App.tsx
              </div>

            
            </div>

            {/* Line numbers + code */}
            <div className="py-5 relative">
              {/* Active line highlight */}
             

              {CODE.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex font-mono text-[0.79rem] leading-[1.95] min-h-[1.95em] cursor-default"
                  onMouseEnter={() => setHoveredLine(i)}
                  onMouseLeave={() => setHoveredLine(null)}
                  animate={{
                    backgroundColor:
                      hoveredLine === i && line.tokens.length > 0
                        ? "transparent"
                        : "transparent",
                  }}
                >
                  {/* Line number */}
                  <span
                    className="min-w-[46px] text-right pr-[18px] select-none shrink-0 text-[0.72rem]"
                    style={{
                      color: hoveredLine === i ? "rgba(124,111,255,0.7)" : "rgba(130,124,160,0.35)",
                      transition: "color 0.15s",
                    }}
                  >
                    {line.tokens.length > 0 ? i + 1 : ""}
                  </span>

                  {/* Tokens */}
                  <span className="flex-1 pr-5" style={{ color: "rgba(230,226,255,0.88)" }}>
                    {line.tokens.map((tok, j) => (
                      <span key={j} className={tok.c ?? ""}>{tok.t}</span>
                    ))}
                    {/* Blinking cursor on last real line */}
                    {i === CODE.length - 1 && (
                      <motion.span
                        className="inline-block w-[2px] h-[13px] ml-0.5 align-middle rounded-sm"
                        style={{ background: "rgba(124,111,255,0.9)", marginBottom: 1 }}
                        animate={{ opacity: cursorVisible ? 1 : 0 }}
                        transition={{ duration: 0 }}
                      />
                    )}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom bar — status strip */}
            <div
              className="flex items-center gap-3 px-5 py-2 text-[0.68rem] font-mono"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(0,0,0,0.2)",
                color: "rgba(130,124,160,0.5)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#28c840] shadow-[0_0_4px_#28c840]" />
              TypeScript · ESLint clean
              <span className="ml-auto">UTF-8</span>
            </div>
          </motion.div>

          {/* Reflection / ground shadow */}
          <div
            className="absolute -bottom-8 left-8 right-8 h-12 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(124,111,255,0.15) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
function CodeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M4 3L1 7l3 4M10 3l3 4-3 4M8 2l-2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}