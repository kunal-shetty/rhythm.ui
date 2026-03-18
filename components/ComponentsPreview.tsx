"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ── Mini live previews ── */

function ButtonPreview() {
  return (
    <div className="flex gap-2 items-center flex-wrap justify-center">
      <button className="bg-grad-btn text-white rounded-lg px-4 py-2 text-[0.79rem] font-medium shadow-glow hover:scale-105 transition-transform cursor-none">Primary</button>
      <button className="text-white border border-white/[0.13] rounded-lg px-3.5 py-[7px] text-[0.79rem] cursor-none">Outline</button>
      <button className="text-muted2 rounded-lg px-3 py-[7px] text-[0.79rem] cursor-none">Ghost</button>
    </div>
  );
}

function CardPreview() {
  return (
    <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-3.5 py-3 w-44">
      <div className="w-7 h-7 rounded-full shrink-0 bg-grad-btn flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="white" strokeWidth="1.2"/><path d="M2 12c0-2.8 2.2-4 5-4s5 1.2 5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="h-1.5 rounded-full bg-white/[0.12] w-[75%]" />
        <div className="h-1.5 rounded-full bg-white/[0.12] w-[50%]" />
      </div>
      <span className="text-[0.67rem] text-violet bg-violet/10 border border-violet/25 rounded px-1.5 py-0.5 font-mono">Pro</span>
    </div>
  );
}

function InputPreview() {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center gap-2 bg-surface2 border border-white/[0.07] rounded-lg px-3 py-2">
        <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="3.5" stroke="#5858a0" strokeWidth="1.2"/><path d="M8.5 8.5l3 3" stroke="#5858a0" strokeWidth="1.2" strokeLinecap="round"/></svg>
        <span className="text-muted text-[0.79rem]">Search...</span>
      </div>
      <div className="flex items-center gap-2 bg-surface2 border border-violet/50 rounded-lg px-3 py-2 shadow-[0_0_12px_rgba(124,111,255,0.14)]">
        <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><path d="M2 2l9 9M11 2l-9 9" stroke="#7c6fff" strokeWidth="1.2" strokeLinecap="round"/></svg>
        <span className="text-white text-[0.79rem]">rhythm-ui</span>
        <span className="w-px h-3.5 bg-violet animate-blink ml-0.5" />
      </div>
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="flex gap-1.5 flex-wrap justify-center">
      <span className="rounded-full px-2.5 py-1 text-[0.72rem] border text-violet border-violet/30 bg-violet/10">New release</span>
      <span className="rounded-full px-2.5 py-1 text-[0.72rem] border text-pink border-pink/30 bg-pink/10">Trending</span>
      <span className="rounded-full px-2.5 py-1 text-[0.72rem] border text-mint border-mint/30 bg-mint/10">Free</span>
      <span className="rounded-full px-2.5 py-1 text-[0.72rem] border text-muted2 border-white/[0.13]">v2.0</span>
    </div>
  );
}

function ModalPreview() {
  return (
    <div className="bg-surface border border-white/[0.13] rounded-xl p-3.5 w-44 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[0.81rem] font-semibold tracking-[-0.02em]">Delete project</span>
        <button className="text-muted cursor-none p-0.5">
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>
      <p className="text-muted2 text-[0.73rem] mb-2.5 leading-snug">This action cannot be undone.</p>
      <div className="flex gap-1.5">
        <button className="bg-surface2 text-muted rounded-md px-2.5 py-1 text-[0.71rem] cursor-none border-0 font-sans">Cancel</button>
        <button className="bg-red-500/10 text-red-400 border border-red-500/30 rounded-md px-2.5 py-1 text-[0.71rem] cursor-none font-sans">Delete</button>
      </div>
    </div>
  );
}

function TogglePreview() {
  const items = [
    { label: "Dark mode",     on: true  },
    { label: "Notifications", on: false },
    { label: "Analytics",     on: true  },
  ];
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((t) => (
        <div key={t.label} className="flex items-center gap-2.5">
          <div className={`relative w-9 h-5 rounded-full ${t.on ? "bg-violet" : "bg-surface2 border border-white/[0.13]"}`}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${t.on ? "left-[18px]" : "left-0.5"}`} />
          </div>
          <span className="text-muted2 text-[0.79rem] tracking-[-0.005em]">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

const CARDS = [
  { name: "Buttons",  desc: "Gradient, ghost & icon variants with hover effects.",      Preview: ButtonPreview, tags: ["React","HTML"] },
  { name: "Cards",    desc: "Glass, elevated & bordered with smooth interactions.",     Preview: CardPreview,   tags: ["React","CSS"]  },
  { name: "Inputs",   desc: "Animated focus rings, floating labels, validation.",       Preview: InputPreview,  tags: ["React","HTML"] },
  { name: "Badges",   desc: "Status tags, labels & color-coded variant system.",        Preview: BadgePreview,  tags: ["React","CSS"]  },
  { name: "Modals",   desc: "Accessible dialogs with backdrop blur & animations.",      Preview: ModalPreview,  tags: ["React"]        },
  { name: "Toggles",  desc: "Smooth animated switches with ARIA support baked in.",     Preview: TogglePreview, tags: ["React","HTML"] },
];

/* ── 3-D tilt card ── */
function TiltCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const mx   = useMotionValue(0);
  const my   = useMotionValue(0);
  const smx  = useSpring(mx,  { stiffness: 220, damping: 22 });
  const smy  = useSpring(my,  { stiffness: 220, damping: 22 });
  const rotX = useTransform(smy, [-0.5, 0.5], ["7deg",  "-7deg"]);
  const rotY = useTransform(smx, [-0.5, 0.5], ["-7deg", "7deg" ]);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const spotBg = useTransform([glowX, glowY], ([gx, gy]: number[]) =>
    `radial-gradient(120px circle at ${gx}% ${gy}%, rgba(124,111,255,0.13), transparent 80%)`
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
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface border border-white/[0.07] rounded-[18px] overflow-hidden relative group hover:border-violet/30 hover:shadow-card transition-[border-color,box-shadow] duration-300"
    >
      <motion.div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: spotBg }} />
      {children}
    </motion.div>
  );
}

export default function ComponentsPreview() {
  return (
    <section id="components" className="relative z-10 py-24">
      <div className="max-w-[1160px] mx-auto px-7">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <SectionLabel>Components</SectionLabel>
          <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)] font-bold tracking-[-0.045em] leading-[1.1] mb-3.5">
            Everything you need.<br /><span className="text-grad">Nothing you don't.</span>
          </h2>
          <p className="text-muted2 text-[0.93rem] font-light leading-[1.75] tracking-[-0.005em] max-w-[440px]">
            Handcrafted, animated components. Copy once, customize forever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 [perspective:1200px]">
          {CARDS.map(({ name, desc, Preview, tags }, i) => (
            <TiltCard key={name} delay={i * 0.07}>
              <div className="relative z-10 h-[126px] border-b border-white/[0.07] bg-surface2 flex items-center justify-center p-5">
                <Preview />
              </div>
              <div className="relative z-10 p-5">
                <p className="text-[0.95rem] font-semibold tracking-[-0.03em] mb-1.5">{name}</p>
                <p className="text-muted2 text-[0.81rem] leading-[1.62] tracking-[-0.005em] mb-3.5">{desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="text-[0.69rem] font-mono text-muted bg-bg border border-white/[0.07] rounded px-1.5 py-0.5">{tag}</span>
                    ))}
                  </div>
                  <button className="flex items-center gap-1.5 text-[0.73rem] text-muted2 hover:text-white transition-colors cursor-none tracking-[-0.01em]">
                    <CopyIcon /> Copy
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[0.71rem] font-medium tracking-[0.14em] uppercase text-violet mb-[18px] before:block before:w-[22px] before:h-px before:bg-violet">
      {children}
    </p>
  );
}

function CopyIcon() {
  return <svg width="12" height="12" viewBox="0 0 13 13" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2.5 9V2.5H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}
