"use client";

import { useRef, HTMLAttributes } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// ─── GlassCard ─────────────────────────────────────────────────────────────
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-[18px] overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── TiltCard ──────────────────────────────────────────────────────────────
export function TiltCard({ children, className = "", ...props }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 220, damping: 22 });
  const smy = useSpring(my, { stiffness: 220, damping: 22 });
  const rotX = useTransform(smy, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotY = useTransform(smx, [-0.5, 0.5], ["-7deg", "7deg"]);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const spotBg = useTransform([glowX, glowY], ([gx, gy]: number[]) =>
    `radial-gradient(120px circle at ${gx}% ${gy}%, rgba(124,111,255,0.13), transparent 80%)`
  );

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    glowX.set(((e.clientX - r.left) / r.width) * 100);
    glowY.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className={`relative bg-surface border border-white/[0.07] rounded-[18px] overflow-hidden group hover:border-violet/30 hover:shadow-card transition-[border-color,box-shadow] duration-300 ${className}`}
      {...props}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotBg }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// ─── StatCard ──────────────────────────────────────────────────────────────
interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: string; up: boolean };
  className?: string;
}

export function StatCard({ value, label, icon, trend, className = "" }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`bg-surface border border-white/[0.07] rounded-[18px] p-6 relative overflow-hidden group hover:border-violet/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-[border-color,box-shadow] duration-300 ${className}`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet to-transparent w-0 group-hover:w-full transition-[width] duration-[400ms]" />
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className="w-10 h-10 rounded-[10px] flex items-center justify-center bg-violet/[0.12]">
            {icon}
          </div>
        )}
        {trend && (
          <span className={`text-[0.75rem] font-mono px-2 py-0.5 rounded-full border ${trend.up ? "text-mint bg-mint/10 border-mint/20" : "text-red-400 bg-red-500/10 border-red-500/20"}`}>
            {trend.up ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      <p className="text-[2rem] font-bold tracking-[-0.055em] text-grad mb-1">{value}</p>
      <p className="text-muted text-[0.82rem] tracking-[-0.005em]">{label}</p>
    </motion.div>
  );
}

// ─── ProfileCard ───────────────────────────────────────────────────────────
interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  className?: string;
}

export function ProfileCard({ name, role, badge, stats, className = "" }: ProfileCardProps) {
  return (
    <div className={`bg-surface border border-white/[0.07] rounded-[18px] p-6 ${className}`}>
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-full bg-grad-btn flex items-center justify-center text-white font-bold text-[1.1rem] shrink-0">
          {name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[0.95rem] font-semibold tracking-[-0.03em] truncate">{name}</p>
            {badge && (
              <span className="text-[0.65rem] font-mono text-violet bg-violet/10 border border-violet/25 rounded px-1.5 py-0.5 shrink-0">{badge}</span>
            )}
          </div>
          <p className="text-muted text-[0.8rem]">{role}</p>
        </div>
      </div>
      {stats && (
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface2 rounded-xl p-3 text-center">
              <p className="text-[1.1rem] font-bold tracking-[-0.04em]">{s.value}</p>
              <p className="text-muted text-[0.69rem]">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
