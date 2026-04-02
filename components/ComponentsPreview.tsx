"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

/* ── Noise SVG texture ── */
function NoiseSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.032] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise2">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise2)" />
    </svg>
  );
}

/* ── Scan line ── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-30"
      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(124,111,255,0.28) 50%, transparent 100%)" }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 11, ease: "linear", repeat: Infinity, repeatDelay: 5 }}
    />
  );
}

/* ── Mini Previews ── */

function ButtonPreview() {
  return (
    <div className="flex gap-2 items-center flex-wrap justify-center">
      <motion.button
        whileHover={{ scale: 1.08, y: -1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="bg-grad-btn text-white rounded-lg px-4 py-2 text-[0.79rem] font-medium shadow-glow cursor-none"
      >
        Primary
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, borderColor: "rgba(124,111,255,0.5)" }}
        className="text-white border border-white/[0.13] rounded-lg px-3.5 py-[7px] text-[0.79rem] cursor-none"
        transition={{ duration: 0.2 }}
      >
        Outline
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.9)" }}
        className="text-muted2 rounded-lg px-3 py-[7px] text-[0.79rem] cursor-none"
        transition={{ duration: 0.2 }}
      >
        Ghost
      </motion.button>
    </div>
  );
}

function CardPreview() {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(124,111,255,0.15)" }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3 w-44"
    >
      <div className="w-7 h-7 rounded-full shrink-0 bg-grad-btn flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="5" r="2.5" stroke="white" strokeWidth="1.2" />
          <path d="M2 12c0-2.8 2.2-4 5-4s5 1.2 5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="h-1.5 rounded-full bg-white/[0.12] w-[75%]" />
        <div className="h-1.5 rounded-full bg-white/[0.12] w-[50%]" />
      </div>
      <span className="text-[0.67rem] text-violet bg-violet/10 border border-violet/25 rounded px-1.5 py-0.5 font-mono">
        Pro
      </span>
    </motion.div>
  );
}

function InputPreview() {
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setFocused(f => !f), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center gap-2 bg-surface2 border border-white/[0.07] rounded-lg px-3 py-2">
        <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
          <circle cx="5.5" cy="5.5" r="3.5" stroke="#5858a0" strokeWidth="1.2" />
          <path d="M8.5 8.5l3 3" stroke="#5858a0" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="text-muted text-[0.79rem]">Search...</span>
      </div>
      <motion.div
        animate={{
          borderColor: focused ? "rgba(124,111,255,0.5)" : "rgba(255,255,255,0.07)",
          boxShadow: focused ? "0 0 14px rgba(124,111,255,0.15)" : "none",
        }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 bg-surface2 border rounded-lg px-3 py-2"
      >
        <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
          <path d="M2 2l9 9M11 2l-9 9" stroke="#7c6fff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="text-white text-[0.79rem]">rhythm-ui</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.06, repeat: Infinity }}
          className="w-px h-3.5 bg-violet ml-0.5"
        />
      </motion.div>
    </div>
  );
}

function BadgePreview() {
  const badges = [
    { label: "New release", color: "text-violet border-violet/30 bg-violet/10" },
    { label: "Trending",    color: "text-pink border-pink/30 bg-pink/10" },
    { label: "Free",        color: "text-mint border-mint/30 bg-mint/10" },
    { label: "v2.0",        color: "text-muted2 border-white/[0.13]" },
  ];
  return (
    <div className="flex gap-1.5 flex-wrap justify-center">
      {badges.map((b, i) => (
        <motion.span
          key={b.label}
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.07, y: -1 }}
          className={`rounded-full px-2.5 py-1 text-[0.72rem] border ${b.color}`}
        >
          {b.label}
        </motion.span>
      ))}
    </div>
  );
}

function ModalPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface border border-white/[0.13] rounded-xl p-3.5 w-44 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[0.81rem] font-semibold tracking-[-0.02em]">Delete project</span>
        <button className="text-muted cursor-none p-0.5">
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <p className="text-muted2 text-[0.73rem] mb-2.5 leading-snug">This action cannot be undone.</p>
      <div className="flex gap-1.5">
        <button className="bg-surface2 text-muted rounded-md px-2.5 py-1 text-[0.71rem] cursor-none border-0 font-sans">Cancel</button>
        <button className="bg-red-500/10 text-red-400 border border-red-500/30 rounded-md px-2.5 py-1 text-[0.71rem] cursor-none font-sans">Delete</button>
      </div>
    </motion.div>
  );
}

function TogglePreview() {
  const [states, setStates] = useState([true, false, true]);
  return (
    <div className="flex flex-col gap-2.5">
      {["Dark mode", "Notifications", "Analytics"].map((label, i) => (
        <div
          key={label}
          className="flex items-center gap-2.5 cursor-none"
          onClick={() => setStates(s => { const n = [...s]; n[i] = !n[i]; return n; })}
        >
          <motion.div
            animate={{ backgroundColor: states[i] ? "rgba(124,111,255,1)" : "rgba(255,255,255,0.07)" }}
            transition={{ duration: 0.25 }}
            className="relative w-9 h-5 rounded-full border border-white/[0.1]"
          >
            <motion.div
              animate={{ x: states[i] ? 16 : 2 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
            />
          </motion.div>
          <span className="text-muted2 text-[0.79rem] tracking-[-0.005em]">{label}</span>
        </div>
      ))}
    </div>
  );
}

const CARDS = [
  { name: "Buttons",  desc: "Gradient, ghost & icon variants with hover effects.",    Preview: ButtonPreview, tags: ["React","HTML"], color: "#7c6fff" },
  { name: "Cards",    desc: "Glass, elevated & bordered with smooth interactions.",   Preview: CardPreview,   tags: ["React","CSS"],  color: "#ff6fa8" },
  { name: "Inputs",   desc: "Animated focus rings, floating labels, validation.",     Preview: InputPreview,  tags: ["React","HTML"], color: "#6fffd4" },
  { name: "Badges",   desc: "Status tags, labels & color-coded variant system.",      Preview: BadgePreview,  tags: ["React","CSS"],  color: "#ffb86c" },
  { name: "Modals",   desc: "Accessible dialogs with backdrop blur & animations.",    Preview: ModalPreview,  tags: ["React"],        color: "#7c6fff" },
  { name: "Toggles",  desc: "Smooth animated switches with ARIA support.",  Preview: TogglePreview, tags: ["React","HTML"], color: "#6fffd4" },
];

/* ── 3-D tilt card with Hero-level polish ── */
function TiltCard({ card, delay }: { card: typeof CARDS[0]; delay: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const mx   = useMotionValue(0);
  const my   = useMotionValue(0);
  const smx  = useSpring(mx, { stiffness: 220, damping: 22 });
  const smy  = useSpring(my, { stiffness: 220, damping: 22 });
  const rotX = useTransform(smy, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotY = useTransform(smx, [-0.5, 0.5], ["-8deg", "8deg"]);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const spotBg = useTransform([glowX, glowY], ([gx, gy]: number[]) =>
    `radial-gradient(140px circle at ${gx}% ${gy}%, rgba(124,111,255,0.15), transparent 75%)`
  );

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
    glowX.set(((e.clientX - r.left) / r.width)  * 100);
    glowY.set(((e.clientY - r.top)  / r.height) * 100);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 52, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Outer glow bloom on hover */}
      <motion.div
        className="absolute -inset-px rounded-[20px] pointer-events-none z-0"
        animate={{
          boxShadow: hovered
            ? `0 0 0 1px rgba(124,111,255,0.22), 0 20px 60px rgba(124,111,255,0.14), 0 4px 16px rgba(0,0,0,0.4)`
            : `0 0 0 1px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.2)`,
        }}
        transition={{ duration: 0.35 }}
        style={{ borderRadius: 20 }}
      />

      <div
        className="relative z-10 rounded-[18px] overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(28,24,50,0.98) 0%, rgba(18,15,36,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Spotlight follow */}
        <motion.div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: spotBg }} />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Color accent top bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
          animate={{
            background: hovered
              ? `linear-gradient(90deg, transparent, ${card.color}88, transparent)`
              : "transparent",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Preview area */}
        <div className="relative z-10 h-[130px] border-b border-white/[0.05] flex items-center justify-center p-5"
          style={{ background: "rgba(255,255,255,0.015)" }}
        >
          <card.Preview />
        </div>

        {/* Content */}
        <div className="relative z-10 p-5">
          <div className="flex items-start justify-between mb-1.5">
            <p className="text-[0.95rem] font-semibold tracking-[-0.03em]">{card.name}</p>
            {/* Animated dot */}
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: delay * 2 }}
              className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
              style={{ backgroundColor: card.color }}
            />
          </div>
          <p className="text-muted2 text-[0.81rem] leading-[1.62] tracking-[-0.005em] mb-3.5">{card.desc}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {card.tags.map((tag) => (
                <span key={tag} className="text-[0.69rem] font-mono text-muted bg-bg border border-white/[0.07] rounded px-1.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-[0.73rem] cursor-none tracking-[-0.01em] transition-colors duration-200"
              style={{ color: copied ? card.color : "rgba(160,156,200,0.7)" }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <CheckIcon />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <CopyIcon />
                  </motion.span>
                )}
              </AnimatePresence>
              {copied ? "Copied!" : "Copy"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Floating counter ── */
function StatPill({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      <span
        className="text-[1.45rem] font-bold tracking-[-0.04em] leading-none"
        style={{
          background: "linear-gradient(135deg, #e8e6ff 0%, #c9c3ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </span>
      <span className="text-[0.72rem] tracking-[0.06em] uppercase mt-1" style={{ color: "rgba(180,176,210,0.5)" }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function ComponentsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 35, damping: 22 });
  const sy = useSpring(mouseY, { stiffness: 35, damping: 22 });

  const o1x = useTransform(sx, [-1, 1], [-28, 28]);
  const o1y = useTransform(sy, [-1, 1], [-28, 28]);
  const o2x = useTransform(sx, [-1, 1], [22, -22]);
  const o2y = useTransform(sy, [-1, 1], [18, -18]);
  const o3x = useTransform(sx, [-1, 1], [-12, 12]);
  const o3y = useTransform(sy, [-1, 1], [-14, 14]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".comp-orb-a", { y: -22, x: 8,  duration: 6.0, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".comp-orb-b", { y:  16, x: -6, duration: 7.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
      gsap.to(".comp-orb-c", { y: -14, x: 5,  duration: 5.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

      gsap.fromTo(".comp-bg-grid", { opacity: 0 }, { opacity: 1, duration: 2.5, ease: "power1.out" });
    }, sectionRef);

    const onMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouse);
    return () => { ctx.revert(); window.removeEventListener("mousemove", onMouse); };
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} id="components" className="relative z-10 py-28 overflow-hidden">

      {/* Noise */}
      <NoiseSVG />

      {/* Scan line */}
      <ScanLine />

      {/* Grid (fades in via GSAP) */}
      <div className="comp-bg-grid absolute inset-0 z-0 pointer-events-none opacity-0"
        style={{
          backgroundImage: "linear-gradient(rgba(124,111,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,111,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)" }}
      />

      {/* Hero bloom (top-center) */}
      <div
        className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,111,255,0.08) 0%, rgba(255,111,168,0.03) 50%, transparent 68%)" }}
      />

      {/* Parallax orbs */}
      <motion.div
        className="comp-orb-a absolute top-0 right-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,111,255,0.18), rgba(93,78,255,0.06) 55%, transparent 70%)",
          filter: "blur(68px)",
          x: o1x, y: o1y,
        }}
      />
      <motion.div
        className="comp-orb-b absolute bottom-10 left-[-60px] w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,111,168,0.15), rgba(255,60,120,0.04) 55%, transparent 70%)",
          filter: "blur(72px)",
          x: o2x, y: o2y,
        }}
      />
      <motion.div
        className="comp-orb-c absolute top-1/2 left-[20%] w-44 h-44 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(111,255,212,0.08), transparent 70%)",
          filter: "blur(56px)",
          x: o3x, y: o3y,
        }}
      />

      {/* Dot accent grid (top right) */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "4%", top: "12%",
          width: 140, height: 140,
          backgroundImage: "radial-gradient(circle, rgba(124,111,255,0.22) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      {/* Dot accent grid (bottom left) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "2%", bottom: "10%",
          width: 100, height: 100,
          backgroundImage: "radial-gradient(circle, rgba(255,111,168,0.18) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="max-w-[1160px] mx-auto px-7 relative z-10">

        {/* ── Header ── */}
        <div className="mb-14">
          {/* Section label */}
          <motion.div
            ref={labelRef}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 text-[0.71rem] font-medium tracking-[0.14em] uppercase mb-[18px]"
            style={{ color: "rgba(196,192,255,0.8)" }}
          >
            {/* Animated line */}
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 22 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="block h-px bg-violet"
            />
            Components
            {/* Pinging dot */}
            <span className="relative flex h-[6px] w-[6px] shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-50" />
              <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-violet" />
            </span>
          </motion.div>

          <motion.h2
            ref={headRef}
            initial={{ opacity: 0, y: 36, skewY: 1.5 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-[-0.045em] leading-[1.08] mb-4"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.9rem)" }}
          >
            Everything you need.
            <br />
            <span
              style={{
                background: "linear-gradient(120deg, #c8c3ff 0%, #b084f5 35%, #ff8aaa 70%, #ffb86c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nothing you don't.
            </span>
          </motion.h2>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-14">
            <motion.p
              ref={subRef}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted2 text-[0.93rem] font-light leading-[1.75] tracking-[-0.005em] max-w-[400px]"
            >
              Handcrafted, animated components. Copy once, customize forever.
            </motion.p>

            {/* Mini stats */}
            <div ref={statsRef} className="flex items-center gap-8 shrink-0">
              <StatPill value="60+"  label="Components" delay={0.3} />
              <StatPill value="12k"  label="Stars"       delay={0.38} />
              <StatPill value="3.2k" label="Developers"  delay={0.46} />
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 [perspective:1200px]">
          {CARDS.map((card, i) => (
            <TiltCard key={card.name} card={card} delay={i * 0.08} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative flex items-center gap-2.5 text-white rounded-[11px] px-7 py-3.5 text-[0.91rem] font-medium tracking-[-0.01em] no-underline overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7c6fff 0%, #a066f5 50%, #d467a8 100%)",
              boxShadow: "0 0 0 1px rgba(124,111,255,0.4), 0 8px 32px rgba(124,111,255,0.25), 0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }}
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            Browse all components
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ scale: 1.03, y: -2, borderColor: "rgba(124,111,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex items-center gap-2 text-white rounded-[11px] px-6 py-[13px] text-[0.91rem] font-normal tracking-[-0.01em] no-underline"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.11)",
              backdropFilter: "blur(10px)",
            }}
          >
            View on GitHub
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 9V2.5H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
      <path d="M2 7l3.5 3.5L11 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[0.71rem] font-medium tracking-[0.14em] uppercase text-violet mb-[18px] before:block before:w-[22px] before:h-px before:bg-violet">
      {children}
    </p>
  );
}