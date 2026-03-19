'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    let rx = mx, ry = my;
    let gx = mx, gy = my;

    let lastX = mx;
    let lastY = my;

    // 🎯 mouse move
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const dx = mx - lastX;
      const dy = my - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      lastX = mx;
      lastY = my;

      // dot (fast)
      gsap.to(dot, {
        x: mx,
        y: my,
        duration: 0.1,
        ease: "power3.out"
      });

      // stretch effect based on speed
      gsap.to(ring, {
        scaleX: 1 + Math.min(speed / 300, 0.6),
        scaleY: 1 - Math.min(speed / 600, 0.3),
        duration: 0.2
      });
    };

    // 🧠 smooth follow loop
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      gx += (mx - gx) * 0.06;
      gy += (my - gy) * 0.06;

      gsap.set(ring, { x: rx, y: ry });
      gsap.set(glow, { x: gx, y: gy });

      requestAnimationFrame(tick);
    };
    tick();

    // 🧲 hover interactions
    const expand = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.3 });
      gsap.to(glow, { scale: 2.5, opacity: 0.25, duration: 0.3 });
      gsap.to(dot, { scale: 0.4, duration: 0.2 });
    };

    const shrink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(glow, { scale: 1, opacity: 0.15, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const elements = document.querySelectorAll("a, button, [data-cursor]");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    document.addEventListener("mousemove", onMove);

    return () => {
      document.removeEventListener("mousemove", onMove);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", expand);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      {/* ✨ glow aura */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99997,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,111,255,0.25), transparent 60%)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          filter: "blur(20px)",
        }}
      />

      {/* 🌀 ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99998,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(124,111,255,0.6)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 🎯 dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#7c6fff",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 12px #7c6fff",
        }}
      />
    </>
  );
}