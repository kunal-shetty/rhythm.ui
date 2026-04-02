"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";

const ITEMS = [
  "Buttons", "Cards", "Modals", "Inputs", "Toggles", "Badges",
  "Tooltips", "Dropdowns", "Navigation", "Loaders", "Accordions",
  "Tabs", "Alerts", "Progress", "Sliders", "Tables",
];

/* Each item gets a fixed accent color cycling through the palette */
const ACCENTS = [
  { dot: "#9d8fff", glow: "rgba(124,111,255,0.35)", text: "rgba(196,192,255,0.9)" },
  { dot: "#ff8aaa", glow: "rgba(255,111,168,0.35)", text: "rgba(255,196,210,0.9)" },
  { dot: "#6fffd4", glow: "rgba(111,255,212,0.35)", text: "rgba(180,255,234,0.9)" },
  { dot: "#ffb86c", glow: "rgba(255,184,108,0.35)", text: "rgba(255,222,168,0.9)" },
  { dot: "#c084fc", glow: "rgba(192,132,252,0.35)", text: "rgba(220,180,255,0.9)" },
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);

  /* Mouse proximity — slow down near the strip */
  const mouseY = useMotionValue(0);
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;

    tlRef.current = gsap.to(track, {
      x: -half,
      duration: 34,
      ease: "none",
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % half) },
    });

    /* Smooth speed changes */
    let targetSpeed = 1;
    const ticker = gsap.ticker.add(() => {
      const current = tlRef.current?.timeScale() ?? 1;
      const lerped = current + (targetSpeed - current) * 0.08;
      tlRef.current?.timeScale(lerped);
    });

    const slowDown = () => { targetSpeed = 0; setSpeed(0); };
    const resume = () => { targetSpeed = 1; setSpeed(1); };

    track.parentElement?.addEventListener("mouseenter", slowDown);
    track.parentElement?.addEventListener("mouseleave", resume);

    return () => {
      tlRef.current?.kill();
      gsap.ticker.remove(ticker);
      track.parentElement?.removeEventListener("mouseenter", slowDown);
      track.parentElement?.removeEventListener("mouseleave", resume);
    };
  }, []);

  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative z-10 overflow-hidden" style={{ padding: "1px 0" }}>

      {/* Top border — gradient shimmer */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(124,111,255,0.25) 20%, rgba(255,111,168,0.2) 50%, rgba(111,255,212,0.2) 80%, transparent 100%)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />

      {/* Bottom border — offset phase */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(111,255,212,0.2) 20%, rgba(124,111,255,0.25) 60%, rgba(255,111,168,0.2) 80%, transparent 100%)",
        }}
        animate={{ backgroundPosition: ["200% 0%", "0% 0%"] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />

      {/* Subtle glow band beneath */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(124,111,255,0.03) 0%, transparent 40%, transparent 60%, rgba(124,111,255,0.03) 100%)",
        }}
      />

      {/* Inner strip */}
      <div
        className="relative py-[15px]"
        style={{ background: "rgba(0,0,0,0.12)" }}
      >
        {/* Edge fades — wider + more opaque */}
        <div
          className="absolute left-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(8,6,20,1) 0%, rgba(8,6,20,0.85) 50%, transparent 100%)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, rgba(8,6,20,1) 0%, rgba(8,6,20,0.85) 50%, transparent 100%)" }}
        />



        <div className="overflow-hidden">
          <div ref={trackRef} className="flex w-max will-change-transform">
            {doubled.map((item, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              const isHovered = hovered === i;

              return (
                <motion.span
                  key={i}
                  className="relative flex items-center gap-2.5 px-7 whitespace-nowrap cursor-default select-none"
                  style={{
                    fontSize: "0.8rem",
                    letterSpacing: "-0.01em",
                    color: isHovered ? accent.text : "rgba(140,134,180,0.65)",
                    borderRight: "1px solid rgba(255,255,255,0.055)",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    color: isHovered ? accent.text : "rgba(140,134,180,0.65)",
                  }}
                  transition={{ duration: 0.18 }}
                >


                  {/* Accent diamond */}
                  <motion.span
                    className="relative shrink-0 inline-block"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 1.5,
                      background: accent.dot,
                      rotate: "45deg",
                      boxShadow: isHovered ? `0 0 8px ${accent.dot}, 0 0 16px ${accent.glow}` : "none",
                    }}
                    animate={{
                      scale: isHovered ? 1.4 : 1,
                      boxShadow: isHovered
                        ? `0 0 8px ${accent.dot}, 0 0 16px ${accent.glow}`
                        : "0 0 0px transparent",
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  />

                  {/* Label */}
                  <motion.span
                    className="relative"
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  >
                    {item}
                  </motion.span>
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}