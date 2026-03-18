"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  color: string;
}

interface LightCursorProps {
  trailLength?: number;
  dotSize?: number;
  colors?: string[];
  fadeSpeed?: number;
}

export default function LightCursor({
  trailLength = 18,
  dotSize = 5,
  colors = ["#7c6fff", "#ff6fa8", "#6fffd4"],
  fadeSpeed = 0.08,
}: LightCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail     = useRef<TrailPoint[]>([]);
  const mouse     = useRef({ x: -999, y: -999 });
  const raf       = useRef<number>(0);
  const colorIdx  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to viewport
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Advance colour every few points
      if (trail.current.length % 4 === 0) {
        colorIdx.current = (colorIdx.current + 1) % colors.length;
      }

      trail.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        color: colors[colorIdx.current],
      });

      // Keep trail capped
      if (trail.current.length > trailLength) {
        trail.current.shift();
      }
    };
    window.addEventListener("mousemove", onMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Age all points
      for (const pt of trail.current) {
        pt.age += fadeSpeed;
      }

      // Remove fully faded
      trail.current = trail.current.filter((pt) => pt.age < 1);

      // Draw trail dots — oldest are small & faded, newest are full size
      const len = trail.current.length;
      for (let i = 0; i < len; i++) {
        const pt     = trail.current[i];
        const ratio  = i / len;                        // 0 = oldest, 1 = newest
        const alpha  = ratio * (1 - pt.age);
        const radius = dotSize * ratio * 0.9 + 1;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(pt.color, alpha);
        ctx.fill();
      }

      // Draw cursor dot
      const { x, y } = mouse.current;
      if (x > 0) {
        // Outer ring
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(124,111,255,0.45)";
        ctx.lineWidth   = 1;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#7c6fff";
        ctx.shadowBlur  = 8;
        ctx.shadowColor = "#7c6fff";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf.current = requestAnimationFrame(render);
    };
    raf.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [trailLength, dotSize, colors, fadeSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
}
