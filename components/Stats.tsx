"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 60,  suffix: "+",    label: "Free Components" },
  { value: 3,   suffix: "",     label: "Frameworks"      },
  { value: 100, suffix: "%",    label: "Free Forever"    },
  { value: 0,   suffix: " min", label: "Setup Time"      },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const barRefs    = useRef<(HTMLDivElement   | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Card stagger entrance
    gsap.fromTo(".stat-card",
      { opacity: 0, y: 32, scale: 0.94 },
      { opacity: 1, y: 0,  scale: 1, duration: 0.65, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" } }
    );

    // Animated counters
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const { value, suffix } = STATS[i];
      gsap.fromTo({ v: 0 }, { v: 0 }, {
        v: value, duration: 1.8, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
        onUpdate: function () { el.textContent = Math.round(this.targets()[0].v) + suffix; },
      });
    });

    // Progress bars
    barRefs.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.fromTo(bar, { width: "0%" }, {
        width: "100%", duration: 1.6, ease: "power2.out", delay: i * 0.1,
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 border-b border-white/[0.07]">
      <div className="max-w-[1160px] mx-auto px-7 grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="stat-card opacity-0 px-6 py-9 border-r border-white/[0.07] last:border-r-0 relative overflow-hidden group hover:bg-violet/[0.03] transition-colors duration-300"
          >
            <span
              ref={(el) => { numRefs.current[i] = el; }}
              className="block text-[2.7rem] font-bold leading-none tracking-[-0.065em] mb-2 text-grad"
            >
              0{s.suffix}
            </span>
            <span className="text-muted text-[0.8rem] tracking-[-0.005em]">{s.label}</span>

            {/* Animated bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.04]">
              <div
                ref={(el) => { barRefs.current[i] = el; }}
                className="h-full bg-grad-btn"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
