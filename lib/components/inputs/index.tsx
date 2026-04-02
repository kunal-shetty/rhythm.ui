"use client";

import { useState, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

// ─── TextInput ──────────────────────────────────────────────────────────────
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function TextInput({
  label,
  hint,
  error,
  icon,
  iconRight,
  className = "",
  ...props
}: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[0.8rem] font-medium text-muted2 tracking-[-0.005em]">
          {label}
        </label>
      )}
      <div className={`relative flex items-center gap-2 bg-surface2 rounded-[10px] border transition-all duration-200 px-3 py-2.5 ${error ? "border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.12)]" : focused ? "border-violet/60 shadow-[0_0_12px_rgba(124,111,255,0.15)]" : "border-white/[0.07]"}`}>
        {icon && <span className="text-muted shrink-0">{icon}</span>}
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`flex-1 bg-transparent text-white text-[0.88rem] tracking-[-0.005em] placeholder:text-muted outline-none min-w-0 ${className}`}
          {...props}
        />
        {iconRight && <span className="text-muted shrink-0">{iconRight}</span>}
      </div>
      {(hint || error) && (
        <p className={`text-[0.75rem] ${error ? "text-red-400" : "text-muted"}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

// ─── SearchInput ────────────────────────────────────────────────────────────
export function SearchInput({
  placeholder = "Search...",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`flex items-center gap-2 bg-surface2 rounded-[10px] border transition-all duration-200 px-3 py-2.5 ${focused ? "border-violet/60 shadow-[0_0_12px_rgba(124,111,255,0.15)]" : "border-white/[0.07]"}`}>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <circle cx="5.5" cy="5.5" r="3.5" stroke={focused ? "#7c6fff" : "#5858a0"} strokeWidth="1.2" />
        <path d="M8.5 8.5l3 3" stroke={focused ? "#7c6fff" : "#5858a0"} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white text-[0.88rem] placeholder:text-muted outline-none min-w-0"
        {...props}
      />
    </div>
  );
}

// ─── Textarea ───────────────────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[0.8rem] font-medium text-muted2 tracking-[-0.005em]">{label}</label>
      )}
      <textarea
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`bg-surface2 rounded-[10px] border px-3 py-2.5 text-white text-[0.88rem] placeholder:text-muted outline-none resize-none transition-all duration-200 min-h-[100px] ${error ? "border-red-500/50" : focused ? "border-violet/60 shadow-[0_0_12px_rgba(124,111,255,0.15)]" : "border-white/[0.07]"} ${className}`}
        {...props}
      />
      {error && <p className="text-[0.75rem] text-red-400">{error}</p>}
    </div>
  );
}
