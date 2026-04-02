"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Noise texture ── */
function NoiseSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.030] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise-fw">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-fw)" />
    </svg>
  );
}

/* ── Scan line ── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-30"
      style={{ background: "linear-gradient(90deg, transparent 0%, rgba(124,111,255,0.22) 50%, transparent 100%)" }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 13, ease: "linear", repeat: Infinity, repeatDelay: 6 }}
    />
  );
}

const FW = [
  {
    name: "React",
    color: "#61dafb",
    glow: "rgba(97,218,251,0.18)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="#61dafb" />
        <ellipse cx="12" cy="12" rx="11" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="11" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "#ffffff",
    glow: "rgba(255,255,255,0.12)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.2" />
        <path d="M8.5 8v8M8.5 8l7 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "HTML",
    color: "#e34f26",
    glow: "rgba(227,79,38,0.18)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" fill="#e34f26" opacity=".9" />
        <path d="M12 18.5l5-1.5.7-7H7.8l.3 3h5.2l-.3 2.5L12 17" fill="white" opacity=".9" />
        <path d="M7.5 7.5h9l-.3 3H8l.2 2h7.2" fill="white" opacity=".9" />
      </svg>
    ),
  },
  {
    name: "CSS",
    color: "#264de4",
    glow: "rgba(38,77,228,0.22)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" fill="#264de4" opacity=".9" />
        <path d="M12 17.5l4.5-1.3.6-6H7.8l.2 2h7l-.2 2.2L12 15.5l-3-.6-.2-1.4H7l.4 4" fill="white" opacity=".9" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    glow: "rgba(49,120,198,0.22)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="3" fill="#3178c6" />
        <path d="M13 10h4.5M15 10v8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11 14.5c-.4-1.5-2.5-1.5-2.5 0s2.5 1.5 2.5 3S8.5 20 8 18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.18)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.37 10.8 14.44 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.63 7.2 14.56 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.37 16.8 9.44 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.63 13.2 9.56 12 7 12z" fill="#38bdf8" />
      </svg>
    ),
  },
  {
  name: "Vue",
  color: "#42b883",
  glow: "rgba(66,184,131,0.18)",
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <path d="M3 3h6l3 5 3-5h6l-9 15L3 3z" fill="#42b883"/>
      <path d="M9 3l3 5 3-5h3l-6 10L6 3h3z" fill="#35495e"/>
    </svg>
  ),
},
{
  name: "Angular",
  color: "#dd0031",
  glow: "rgba(221,0,49,0.2)",
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <polygon points="12,2 22,6 20,18 12,22 4,18 2,6" fill="#dd0031"/>
      <path d="M12 6l4 10h-2l-.8-2H10.8L10 16H8l4-10z" fill="white"/>
    </svg>
  ),
},
{
  name: "Svelte",
  color: "#ff3e00",
  glow: "rgba(255,62,0,0.2)",
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <path d="M12 2c4 0 7 2 7 5s-3 4-7 5-7 2-7 5 3 5 7 5 7-2 7-5" fill="#ff3e00"/>
    </svg>
  ),
},
{
  name: "SolidJS",
  color: "#2c4f7c",
  glow: "rgba(44,79,124,0.2)",
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="solidGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#2c4f7c"/>
          <stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
      </defs>
      <polygon points="4,4 20,4 12,20" fill="url(#solidGrad)"/>
    </svg>
  ),
},
{
  name: "Alpine.js",
  color: "#8bc0d0",
  glow: "rgba(139,192,208,0.2)",
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <path d="M4 20l8-16 8 16h-4l-4-8-4 8H4z" fill="#8bc0d0"/>
    </svg>
  ),
},
{
  name: "Astro",
  color: "#ff5d01",
  glow: "rgba(255,93,1,0.22)",
  icon: (
    <svg width="28" height="28" viewBox="0 0 24 24">
      <path d="M12 2c-1.5 3.5-3 7-6 18 3-2 5-3 6-3s3 1 6 3c-3-11-4.5-14.5-6-18z" fill="#ff5d01"/>
      <path d="M9.5 14c.5 1.5 2 2 2.5 2s2-.5 2.5-2c-1 .5-1.7.7-2.5.7s-1.5-.2-2.5-.7z" fill="black"/>
    </svg>
  ),
},
];

/* ── 3-D tilt framework card ── */
function FwCard({ fw, index }: { fw: typeof FW[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 240, damping: 22 });
  const smy = useSpring(my, { stiffness: 240, damping: 22 });
  const rotX = useTransform(smy, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotY = useTransform(smx, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const [hovered, setHovered] = useState(false);

  const spotBg = useTransform([glowX, glowY], ([gx, gy]: number[]) =>
    `radial-gradient(80px circle at ${gx}% ${gy}%, ${fw.glow}, transparent 80%)`
  );

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
    glowX.set(((e.clientX - r.left) / r.width)  * 100);
    glowY.set(((e.clientY - r.top)  / r.height) * 100);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="fw-card opacity-0 relative group"
    >
      {/* Outer glow ring on hover */}
      <motion.div
        className="absolute -inset-px rounded-[16px] pointer-events-none z-0"
        animate={{
          boxShadow: hovered
            ? `0 0 0 1px ${fw.color}44, 0 12px 40px ${fw.glow}, 0 4px 12px rgba(0,0,0,0.4)`
            : `0 0 0 1px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)`,
        }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: 16 }}
      />

      <motion.div
        className="relative z-10 rounded-[15px] overflow-hidden flex flex-col items-center gap-3 p-5"
        style={{
          background: "linear-gradient(145deg, rgba(28,24,50,0.98) 0%, rgba(18,15,36,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
      >
        {/* Spotlight follow */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotBg }}
        />

        {/* Subtle interior grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Color top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
          animate={{
            background: hovered
              ? `linear-gradient(90deg, transparent, ${fw.color}99, transparent)`
              : "transparent",
          }}
          transition={{ duration: 0.35 }}
        />

        {/* Icon container */}
        <motion.div
          className="relative z-10 w-14 h-14 rounded-[12px] flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          animate={{
            boxShadow: hovered ? `0 0 20px ${fw.glow}` : "none",
            borderColor: hovered ? `${fw.color}33` : "rgba(255,255,255,0.07)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Spinning ring on hover */}
          <motion.div
            className="absolute inset-0 rounded-[12px] pointer-events-none"
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: 4, ease: "linear", repeat: hovered ? Infinity : 0 }}
            style={{
              background: `conic-gradient(from 0deg, transparent 60%, ${fw.color}55 100%)`,
              opacity: hovered ? 1 : 0,
            }}
          />
          <div className="relative z-10">{fw.icon}</div>
        </motion.div>

        {/* Name */}
        <span className="relative z-10 text-[0.82rem] font-semibold tracking-[-0.02em]">{fw.name}</span>

        {/* Stable badge */}
        <motion.span
          className="relative z-10 text-[0.63rem] font-mono uppercase tracking-[0.05em] rounded px-1.5 py-0.5 border"
          animate={{
            color: hovered ? fw.color : "rgba(111,255,212,0.9)",
            borderColor: hovered ? `${fw.color}44` : "rgba(111,255,212,0.2)",
            backgroundColor: hovered ? `${fw.color}14` : "rgba(111,255,212,0.08)",
          }}
          transition={{ duration: 0.25 }}
        >
          stable
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function Frameworks() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 35, damping: 22 });
  const sy = useSpring(mouseY, { stiffness: 35, damping: 22 });
  const o1x = useTransform(sx, [-1, 1], [-22, 22]);
  const o1y = useTransform(sy, [-1, 1], [-22, 22]);
  const o2x = useTransform(sx, [-1, 1], [18, -18]);
  const o2y = useTransform(sy, [-1, 1], [14, -14]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".fw-card",
        { opacity: 0, y: 36, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.08,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.to(".fw-orb-a", { y: -20, x: 7,  duration: 5.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".fw-orb-b", { y:  14, x: -5, duration: 7.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });

      gsap.fromTo(".fw-grid", { opacity: 0 }, { opacity: 1, duration: 2.8, ease: "power1.out" });
    }, sectionRef);

    const onMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouse);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener("mousemove", onMouse);
    };
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="relative z-10 py-28 overflow-hidden border-t border-white/[0.05] hidden lg:block">

      {/* Noise */}
      <NoiseSVG />

      {/* Scan line */}
      <ScanLine />

      {/* Grid (GSAP fade) */}
      <div
        className="fw-grid absolute inset-0 z-0 pointer-events-none opacity-0"
        style={{
          backgroundImage: "linear-gradient(rgba(124,111,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(124,111,255,0.035) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
      />

      {/* Top bloom */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,111,255,0.07) 0%, rgba(255,111,168,0.03) 50%, transparent 68%)" }}
      />

      {/* Parallax orbs */}
      <motion.div
        className="fw-orb-a absolute -top-16 right-[-60px] w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,111,255,0.16), rgba(93,78,255,0.05) 55%, transparent 70%)",
          filter: "blur(65px)",
          x: o1x, y: o1y,
        }}
      />
      <motion.div
        className="fw-orb-b absolute bottom-0 left-[-40px] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.12), rgba(56,189,248,0.03) 55%, transparent 70%)",
          filter: "blur(60px)",
          x: o2x, y: o2y,
        }}
      />

      {/* Dot grids */}
      <div className="absolute pointer-events-none" style={{
        right: "3%", top: "15%", width: 120, height: 120,
        backgroundImage: "radial-gradient(circle, rgba(124,111,255,0.22) 1px, transparent 1px)",
        backgroundSize: "13px 13px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }} />
      <div className="absolute pointer-events-none" style={{
        left: "2%", bottom: "12%", width: 90, height: 90,
        backgroundImage: "radial-gradient(circle, rgba(56,189,248,0.18) 1px, transparent 1px)",
        backgroundSize: "11px 11px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }} />

      <div className="max-w-[1160px] mx-auto px-7 relative z-10 text-center">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-2.5 text-[0.71rem] font-medium tracking-[0.14em] uppercase mb-[18px]"
            style={{ color: "rgba(196,192,255,0.8)" }}
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 22 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="block h-px bg-violet"
            />
            Stack Agnostic
            <span className="relative flex h-[6px] w-[6px] shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-50" />
              <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-violet" />
            </span>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 22 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="block h-px bg-violet"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 28, skewY: 1.2 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-[-0.045em] leading-[1.08] mb-4"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.9rem)" }}
          >
            Works with{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #c8c3ff 0%, #b084f5 35%, #ff8aaa 70%, #ffb86c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              your tools
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted2 text-[0.93rem] font-light leading-[1.75] tracking-[-0.005em] max-w-[380px] mx-auto"
          >
            Never locked to a framework. Build with what you already know.
          </motion.p>
        </motion.div>

        {/* ── Framework cards ── */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3.5 [perspective:1000px]">
          {FW.map((fw, i) => (
            <FwCard key={fw.name} fw={fw} index={i} />
          ))}
        </div>

        {/* ── Bottom tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          {/* Divider lines + text */}
          <span className="block h-px w-16 bg-gradient-to-r from-transparent to-white/[0.1]" />
          <span className="text-[0.76rem] tracking-[0.05em]" style={{ color: "rgba(160,156,200,0.5)" }}>
            More frameworks coming soon
          </span>
          <span className="block h-px w-16 bg-gradient-to-l from-transparent to-white/[0.1]" />
        </motion.div>

      </div>
    </section>
  );
}