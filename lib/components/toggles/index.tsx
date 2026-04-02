"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ─── Toggle ────────────────────────────────────────────────────────────────
interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Toggle({
  checked: controlled,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
}: ToggleProps) {
  const [internal, setInternal] = useState(false);
  const on = controlled !== undefined ? controlled : internal;

  const handleToggle = () => {
    if (disabled) return;
    const next = !on;
    setInternal(next);
    onChange?.(next);
  };

  const dims = {
    sm: { track: "w-8 h-4", thumb: "w-3 h-3", offset: 17 },
    md: { track: "w-10 h-5", thumb: "w-4 h-4", offset: 21 },
    lg: { track: "w-12 h-6", thumb: "w-5 h-5", offset: 25 },
  }[size];

  return (
    <div
      className={`flex items-center gap-3 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleToggle}
    >
      <div className={`relative ${dims.track} rounded-full transition-colors duration-200 ${on ? "bg-violet" : "bg-surface2 border border-white/[0.13]"} shrink-0`}>
        <motion.div
          className={`absolute top-0.5 ${dims.thumb} rounded-full bg-white shadow-sm`}
          animate={{ x: on ? dims.offset - (size === "sm" ? 15 : size === "md" ? 18 : 22) : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      {(label || description) && (
        <div>
          {label && <p className="text-[0.88rem] font-medium tracking-[-0.01em]">{label}</p>}
          {description && <p className="text-muted text-[0.76rem]">{description}</p>}
        </div>
      )}
    </div>
  );
}

// ─── Checkbox ──────────────────────────────────────────────────────────────
interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ checked: controlled, onChange, label, disabled }: CheckboxProps) {
  const [internal, setInternal] = useState(false);
  const on = controlled !== undefined ? controlled : internal;

  const handle = () => {
    if (disabled) return;
    const next = !on;
    setInternal(next);
    onChange?.(next);
  };

  return (
    <div
      className={`flex items-center gap-2.5 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handle}
    >
      <div className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-all duration-150 ${on ? "bg-violet border-violet" : "bg-transparent border-white/[0.2] hover:border-violet/50"}`}>
        <motion.svg
          width="10" height="8" viewBox="0 0 10 8" fill="none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.5 }}
          transition={{ duration: 0.15 }}
        >
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>
      {label && <span className="text-[0.88rem] text-muted2">{label}</span>}
    </div>
  );
}
