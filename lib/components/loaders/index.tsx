"use client";

// ─── SpinnerLoader ──────────────────────────────────────────────────────────
interface LoaderProps { size?: number; color?: string; className?: string }

export function SpinnerLoader({ size = 24, color = "#7c6fff", className = "" }: LoaderProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeOpacity="0.15" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── PulseLoader ────────────────────────────────────────────────────────────
export function PulseLoader({ size = 8, color = "#7c6fff", className = "" }: LoaderProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-full animate-bounce"
          style={{
            width: size,
            height: size,
            background: color,
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.8s",
          }}
        />
      ))}
    </div>
  );
}

// ─── ProgressBar ────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number; // 0-100
  color?: "violet" | "pink" | "mint";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  color = "violet",
  size = "md",
  showLabel = false,
  animated = true,
  className = "",
}: ProgressBarProps) {
  const colors = {
    violet: "from-violet to-pink",
    pink:   "from-pink to-violet",
    mint:   "from-mint to-violet",
  };
  const heights = { sm: "h-1", md: "h-1.5", lg: "h-2.5" };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-[0.75rem] text-muted2 mb-1.5">
          <span>Progress</span>
          <span className="font-mono text-violet">{Math.round(value)}%</span>
        </div>
      )}
      <div className={`w-full bg-surface2 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full bg-gradient-to-r ${colors[color]} ${animated ? "transition-[width] duration-700 ease-expo" : ""}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

// ─── SkeletonLoader ──────────────────────────────────────────────────────────
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

export function Skeleton({ width = "100%", height = 16, rounded = "8px", className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-surface2 relative overflow-hidden ${className}`}
      style={{ width, height, borderRadius: rounded }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
          animation: "skeleton-sweep 1.5s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes skeleton-sweep { from { transform: translateX(-100%); } to { transform: translateX(100%); } }`}</style>
    </div>
  );
}
