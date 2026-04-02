"use client";

import { useRef, ButtonHTMLAttributes } from "react";
import { gsap } from "gsap";

// ─── GradientButton ────────────────────────────────────────────────────────
interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function GradientButton({
  children,
  size = "md",
  className = "",
  onClick,
  ...props
}: GradientButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const sizes = {
    sm: "px-4 py-2 text-[0.8rem]",
    md: "px-6 py-3 text-[0.92rem]",
    lg: "px-8 py-4 text-[1rem]",
  };

  const onEnter = () =>
    gsap.to(ref.current, { scale: 1.04, y: -2, duration: 0.2, ease: "power2.out" });

  const onLeave = () =>
    gsap.to(ref.current, { scale: 1, y: 0, duration: 0.35, ease: "elastic.out(1,0.6)" });

  // Destructured from props so it doesn't fire twice via the spread below
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.timeline()
      .to(ref.current, { scale: 0.95, duration: 0.1, ease: "power2.in" })
      .to(ref.current, { scale: 1.04, duration: 0.15, ease: "power2.out" })
      .to(ref.current, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.5)" });
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={handleClick}
      className={`relative inline-flex items-center gap-2 font-medium tracking-[-0.01em] rounded-[10px] text-white shadow-glow hover:shadow-glow-lg transition-shadow duration-200 select-none cursor-none ${sizes[size]} ${className}`}
      style={{ background: "linear-gradient(135deg, #7c6fff, #ff6fa8)" }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// ─── OutlineButton ──────────────────────────────────────────────────────────
export function OutlineButton({
  children,
  size = "md",
  className = "",
  ...props
}: GradientButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const sizes = {
    sm: "px-4 py-2 text-[0.8rem]",
    md: "px-6 py-3 text-[0.92rem]",
    lg: "px-8 py-4 text-[1rem]",
  };

  const onEnter = () =>
    gsap.to(ref.current, { y: -2, duration: 0.2, ease: "power2.out" });
  const onLeave = () =>
    gsap.to(ref.current, { y: 0, duration: 0.35, ease: "elastic.out(1,0.6)" });

  return (
    <button
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`inline-flex items-center gap-2 font-normal tracking-[-0.01em] rounded-[10px] text-white border border-white/[0.13] hover:border-violet/50 hover:bg-violet/[0.07] transition-all duration-200 select-none cursor-none ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── GhostButton ───────────────────────────────────────────────────────────
export function GhostButton({
  children,
  size = "md",
  className = "",
  ...props
}: GradientButtonProps) {
  const sizes = {
    sm: "px-3 py-1.5 text-[0.8rem]",
    md: "px-5 py-2.5 text-[0.92rem]",
    lg: "px-7 py-3.5 text-[1rem]",
  };

  return (
    <button
      className={`inline-flex items-center gap-2 font-normal tracking-[-0.01em] rounded-[10px] text-muted2 hover:text-white hover:bg-white/5 transition-all duration-200 select-none cursor-none ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── IconButton ────────────────────────────────────────────────────────────
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  variant?: "filled" | "outline" | "ghost";
}

export function IconButton({
  icon,
  label,
  variant = "outline",
  className = "",
  ...props
}: IconButtonProps) {
  const base = "inline-flex items-center justify-center w-10 h-10 rounded-[10px] transition-all duration-200 select-none cursor-none";
  const variants = {
    filled: "bg-violet text-white shadow-glow hover:shadow-glow-lg",
    outline: "border border-white/[0.13] text-muted2 hover:text-white hover:border-white/25",
    ghost: "text-muted2 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      title={label}
      aria-label={label}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}