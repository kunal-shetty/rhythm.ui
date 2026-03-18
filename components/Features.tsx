"use client";

import { motion } from "framer-motion";

const FEATURES = [
  { icon: <BoltIcon />,     bg: "bg-violet/[0.12]", line: "from-violet", title: "Copy & Paste Ready",    desc: "Every component ships with clean, production-ready code. Drop it straight into your project with zero modification." },
  { icon: <PaletteIcon />,  bg: "bg-pink/[0.12]",   line: "from-pink",   title: "Fully Customizable",    desc: "Built with CSS custom properties and Tailwind utilities. Adapt any component to your brand palette in seconds."     },
  { icon: <WaveIcon />,     bg: "bg-mint/[0.12]",   line: "from-mint",   title: "Animated by Default",   desc: "Micro-interactions and smooth transitions baked in. Every component feels intentionally alive — no extra effort."    },
  { icon: <GlobeIcon />,    bg: "bg-violet/[0.12]", line: "from-violet", title: "Multi-Framework",       desc: "React, HTML, and CSS variants for every component. Use whatever stack you're already building on."                },
  { icon: <ShieldIcon />,   bg: "bg-pink/[0.12]",   line: "from-pink",   title: "Accessible First",      desc: "ARIA roles, keyboard navigation, and screen-reader support built in. Accessibility is never an afterthought."     },
  { icon: <InfinityIcon />, bg: "bg-mint/[0.12]",   line: "from-mint",   title: "Free. Forever.",        desc: "No subscriptions, no gated tiers, no license fees. rhythm.ui is and always will be open source and completely free." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 44 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-24 border-t border-white/[0.07]">
      <div className="max-w-[1160px] mx-auto px-7">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <SectionLabel>Why rhythm.ui</SectionLabel>
          <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)] font-bold tracking-[-0.045em] leading-[1.1]">
            Built for developers<br /><span className="text-grad">who care about craft</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative bg-surface border border-white/[0.07] rounded-[18px] p-7 overflow-hidden group hover:border-violet/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-300"
            >
              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-[18px] ${f.bg}`}>{f.icon}</div>
              <h3 className="text-[0.95rem] font-semibold tracking-[-0.03em] mb-2.5">{f.title}</h3>
              <p className="text-muted2 text-[0.84rem] leading-[1.72] font-light tracking-[-0.005em]">{f.desc}</p>
              <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${f.line} to-transparent w-0 group-hover:w-full transition-[width] duration-[400ms] ease-expo`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[0.71rem] font-medium tracking-[0.14em] uppercase text-violet mb-[18px] before:block before:w-[22px] before:h-px before:bg-violet">{children}</p>
  );
}

function BoltIcon()     { return <svg width="19" height="19" viewBox="0 0 20 20" fill="none"><path d="M11 2L4 11h7l-2 7 9-10h-7l2-6z" stroke="#7c6fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function PaletteIcon()  { return <svg width="19" height="19" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#ff6fa8" strokeWidth="1.5"/><circle cx="7" cy="8" r="1.5" fill="#ff6fa8" opacity=".6"/><circle cx="13" cy="8" r="1.5" fill="#ff6fa8" opacity=".6"/><circle cx="10" cy="13" r="1.5" fill="#ff6fa8" opacity=".6"/><circle cx="6" cy="12" r="1.5" fill="#ff6fa8" opacity=".6"/><circle cx="14" cy="12" r="1.5" fill="#ff6fa8" opacity=".6"/></svg>; }
function WaveIcon()     { return <svg width="19" height="19" viewBox="0 0 20 20" fill="none"><path d="M2 10 Q5 4 8 10 Q11 16 14 10 Q17 4 20 10" stroke="#6fffd4" strokeWidth="1.6" strokeLinecap="round"/></svg>; }
function GlobeIcon()    { return <svg width="19" height="19" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#7c6fff" strokeWidth="1.5"/><ellipse cx="10" cy="10" rx="3.5" ry="7.5" stroke="#7c6fff" strokeWidth="1.2"/><path d="M2.5 10h15M3 6.5h14M3 13.5h14" stroke="#7c6fff" strokeWidth="1.1" strokeLinecap="round" opacity=".6"/></svg>; }
function ShieldIcon()   { return <svg width="19" height="19" viewBox="0 0 20 20" fill="none"><path d="M10 2.5L3 5.5v5c0 4 3.5 7 7 8 3.5-1 7-4 7-8v-5L10 2.5z" stroke="#ff6fa8" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 10l2 2 4-4" stroke="#ff6fa8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function InfinityIcon() { return <svg width="19" height="19" viewBox="0 0 20 20" fill="none"><path d="M3 10c0-2.2 1.8-4 4-4s4 2 6 4-1.8 4-4 4-4-2-6-4z" stroke="#6fffd4" strokeWidth="1.5"/><path d="M9 10c0 2.2 1.8 4 4 4s4-2 4-4-1.8-4-4-4-4 2-4 4z" stroke="#6fffd4" strokeWidth="1.5"/></svg>; }
