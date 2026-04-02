"use client";

import { HTMLAttributes } from "react";

type BadgeVariant = "violet" | "pink" | "mint" | "muted" | "red" | "yellow";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulse?: boolean;
}

const variantMap: Record<BadgeVariant, string> = {
  violet: "text-violet border-violet/30 bg-violet/10",
  pink:   "text-pink border-pink/30 bg-pink/10",
  mint:   "text-mint border-mint/30 bg-mint/10",
  muted:  "text-muted2 border-white/[0.13] bg-white/[0.04]",
  red:    "text-red-400 border-red-500/30 bg-red-500/10",
  yellow: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
};

const dotMap: Record<BadgeVariant, string> = {
  violet: "bg-violet",
  pink:   "bg-pink",
  mint:   "bg-mint",
  muted:  "bg-muted2",
  red:    "bg-red-400",
  yellow: "bg-yellow-400",
};

const sizeMap: Record<BadgeSize, string> = {
  sm: "text-[0.65rem] px-2 py-0.5",
  md: "text-[0.72rem] px-2.5 py-1",
  lg: "text-[0.8rem] px-3 py-1.5",
};

export function Badge({
  children,
  variant = "violet",
  size = "md",
  dot = false,
  pulse = false,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantMap[variant]} ${sizeMap[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotMap[variant]} ${pulse ? "animate-pulse" : ""}`} />
      )}
      {children}
    </span>
  );
}

// ─── StatusBadge ───────────────────────────────────────────────────────────
type Status = "online" | "offline" | "busy" | "away";

const statusConfig: Record<Status, { label: string; variant: BadgeVariant }> = {
  online:  { label: "Online",  variant: "mint"   },
  offline: { label: "Offline", variant: "muted"  },
  busy:    { label: "Busy",    variant: "red"    },
  away:    { label: "Away",    variant: "yellow" },
};

export function StatusBadge({ status }: { status: Status }) {
  const { label, variant } = statusConfig[status];
  return (
    <Badge variant={variant} dot pulse={status === "online"}>
      {label}
    </Badge>
  );
}

// ─── CountBadge ────────────────────────────────────────────────────────────
export function CountBadge({
  count,
  max = 99,
  variant = "violet",
}: {
  count: number;
  max?: number;
  variant?: BadgeVariant;
}) {
  const display = count > max ? `${max}+` : count;
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 rounded-full text-[0.65rem] font-bold px-1.5 border ${variantMap[variant]}`}
    >
      {display}
    </span>
  );
}
