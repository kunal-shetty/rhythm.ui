"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ITEMS = [
  "Buttons","Cards","Modals","Inputs","Toggles","Badges",
  "Tooltips","Dropdowns","Navigation","Loaders","Accordions",
  "Tabs","Alerts","Progress","Sliders","Tables",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef    = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;

    tlRef.current = gsap.to(track, {
      x: -half, duration: 28, ease: "none", repeat: -1,
      modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % half) },
    });

    const pause = () => tlRef.current?.pause();
    const play  = () => tlRef.current?.play();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", play);
    return () => {
      tlRef.current?.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", play);
    };
  }, []);

  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative z-10 border-t border-b border-white/[0.07] py-[17px] overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none bg-gradient-to-r from-bg to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none bg-gradient-to-l from-bg to-transparent" />
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max will-change-transform">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 px-8 text-muted text-[0.79rem] border-r border-white/[0.07] whitespace-nowrap hover:text-white transition-colors duration-200 tracking-[-0.005em]"
            >
              <span className="w-1.5 h-1.5 rounded-sm bg-violet/70 rotate-45 shrink-0 inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
