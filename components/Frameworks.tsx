"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FW = [
  { name: "React",      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" fill="#61dafb"/><ellipse cx="12" cy="12" rx="11" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="11" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg> },
  { name: "Next.js",    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.2"/><path d="M8.5 8v8M8.5 8l7 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "HTML",       icon: <svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" fill="#e34f26" opacity=".9"/><path d="M12 18.5l5-1.5.7-7H7.8l.3 3h5.2l-.3 2.5L12 17" fill="white" opacity=".9"/><path d="M7.5 7.5h9l-.3 3H8l.2 2h7.2" fill="white" opacity=".9"/></svg> },
  { name: "CSS",        icon: <svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" fill="#264de4" opacity=".9"/><path d="M12 17.5l4.5-1.3.6-6H7.8l.2 2h7l-.2 2.2L12 15.5l-3-.6-.2-1.4H7l.4 4" fill="white" opacity=".9"/></svg> },
  { name: "TypeScript", icon: <svg width="26" height="26" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#3178c6"/><path d="M13 10h4.5M15 10v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><path d="M11 14.5c-.4-1.5-2.5-1.5-2.5 0s2.5 1.5 2.5 3S8.5 20 8 18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "Tailwind",   icon: <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C13.37 10.8 14.44 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.63 7.2 14.56 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.37 16.8 9.44 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.63 13.2 9.56 12 7 12z" fill="#38bdf8"/></svg> },
];

export default function Frameworks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(".fw-card",
      { opacity: 0, y: 28, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: "back.out(1.4)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-24 border-t border-white/[0.07]">
      <div className="max-w-[1160px] mx-auto px-7 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="flex items-center justify-center gap-2.5 text-[0.71rem] font-medium tracking-[0.14em] uppercase text-violet mb-[18px] before:block before:w-[22px] before:h-px before:bg-violet">
            Stack Agnostic
          </p>
          <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)] font-bold tracking-[-0.045em] leading-[1.1] mb-3.5">
            Works with <span className="text-grad">your tools</span>
          </h2>
          <p className="text-muted2 text-[0.93rem] font-light leading-[1.75] tracking-[-0.005em] max-w-[380px] mx-auto">
            Never locked to a framework. Build with what you already know.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-3">
          {FW.map((fw) => (
            <div
              key={fw.name}
              className="fw-card opacity-0 bg-surface border border-white/[0.07] rounded-xl p-5 flex flex-col items-center gap-2.5 hover:border-white/[0.13] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-surface2">{fw.icon}</div>
              <span className="text-[0.8rem] font-semibold tracking-[-0.02em]">{fw.name}</span>
              <span className="text-[0.65rem] text-mint bg-mint/10 border border-mint/20 rounded px-1.5 py-0.5 font-mono uppercase tracking-[0.04em]">stable</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
