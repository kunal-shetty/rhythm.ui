"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function spawnParticles(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const colors = ["#7c6fff", "#ff6fa8", "#6fffd4"];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    Object.assign(p.style, {
      position: "fixed", width: "5px", height: "5px", borderRadius: "50%",
      background: colors[i % 3],
      left: r.left + r.width  * Math.random() + "px",
      top:  r.top  + r.height * Math.random() + "px",
      zIndex: "9998", pointerEvents: "none",
      transition: `transform ${0.65 + Math.random() * 0.45}s cubic-bezier(0,0,.2,1) ${Math.random() * 0.22}s, opacity ${0.6 + Math.random() * 0.4}s ease ${Math.random() * 0.22}s`,
    });
    document.body.appendChild(p);
    requestAnimationFrame(() => {
      p.style.transform = `translate(${(Math.random() - 0.5) * 200}px,${(Math.random() - 0.5) * 200}px) scale(0)`;
      p.style.opacity = "0";
    });
    setTimeout(() => p.remove(), 1200);
  }
}

function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.32, y: (e.clientY - r.top - r.height / 2) * 0.32, duration: 0.35, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return <a ref={ref} href={href} className={className}>{children}</a>;
}

export default function CTA() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: boxRef.current, start: "top 70%", once: true,
      onEnter: () => boxRef.current && spawnParticles(boxRef.current),
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-[1160px] mx-auto px-7">
        <motion.div
          ref={boxRef}
          initial={{ opacity: 0, y: 56, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-surface border border-white/[0.13] rounded-[24px] overflow-hidden shadow-cta"
        >
          <div className="absolute -top-36 -left-24 w-[500px] h-[400px] rounded-full pointer-events-none blur-[80px]" style={{ background: "radial-gradient(circle,rgba(124,111,255,0.11),transparent 70%)" }} />
          <div className="absolute -bottom-36 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none blur-[80px]" style={{ background: "radial-gradient(circle,rgba(255,111,168,0.09),transparent 70%)" }} />

          <div className="relative z-10 text-center py-20 px-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-flex items-center gap-2 bg-mint/[0.08] border border-mint/20 rounded-full px-3.5 py-1.5 text-[0.77rem] text-mint mb-7"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1l1.2 2.4L9 4.1 6.9 6.1l.4 2.9L5 7.7 2.7 9l.4-2.9L1 4.1l2.8-.7L5 1z" fill="#6fffd4"/></svg>
              Free &amp; Open Source
            </motion.div>

            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-[-0.055em] leading-[1.08] mb-4">
              Start building with<br /><span className="text-grad">rhythm.ui</span>
            </h2>
            <p className="text-muted2 text-[0.97rem] font-light leading-[1.72] tracking-[-0.005em] mb-10">
              Beautiful animated components. Copy, paste, ship.<br />No subscriptions. No limits. Free forever.
            </p>

            <div className="flex flex-wrap gap-3.5 justify-center">
              <MagneticLink href="#components" className="flex items-center gap-2 bg-grad-btn text-white rounded-[10px] px-7 py-3.5 text-[0.93rem] font-medium tracking-[-0.01em] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all duration-200 no-underline">
                Browse Components
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </MagneticLink>
              <MagneticLink href="https://github.com" className="flex items-center gap-2 text-white border border-white/[0.13] rounded-[10px] px-6 py-[13px] text-[0.93rem] font-normal tracking-[-0.01em] hover:border-violet/50 hover:bg-violet/[0.07] transition-all duration-200 no-underline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                View on GitHub
              </MagneticLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
