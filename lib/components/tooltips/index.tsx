"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
}

const placementStyles: Record<TooltipPlacement, { tooltip: string; arrow: string }> = {
  top:    { tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2", arrow: "top-full left-1/2 -translate-x-1/2 border-t-[#1e1e36] border-x-transparent border-b-transparent" },
  bottom: { tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",   arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-[#1e1e36] border-x-transparent border-t-transparent" },
  left:   { tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",  arrow: "left-full top-1/2 -translate-y-1/2 border-l-[#1e1e36] border-y-transparent border-r-transparent" },
  right:  { tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",   arrow: "right-full top-1/2 -translate-y-1/2 border-r-[#1e1e36] border-y-transparent border-l-transparent" },
};

const animVariants: Record<TooltipPlacement, { initial: object; animate: object }> = {
  top:    { initial: { opacity: 0, y: 6  }, animate: { opacity: 1, y: 0  } },
  bottom: { initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0  } },
  left:   { initial: { opacity: 0, x: 6  }, animate: { opacity: 1, x: 0  } },
  right:  { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0  } },
};

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = 0,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { tooltip, arrow } = placementStyles[placement];
  const anim = animVariants[placement];

  const show = () => {
    if (delay) { timer.current = setTimeout(() => setVisible(true), delay); }
    else setVisible(true);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  };

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            initial={anim.initial}
            animate={anim.animate}
            exit={anim.initial}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 pointer-events-none ${tooltip}`}
          >
            <div className="bg-[#1e1e36] border border-white/[0.1] rounded-[8px] px-3 py-1.5 text-white text-[0.78rem] font-normal tracking-[-0.005em] whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              {content}
            </div>
            <div className={`absolute w-0 h-0 border-4 ${arrow}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
