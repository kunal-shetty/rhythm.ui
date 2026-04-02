"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Modal ──────────────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  footer?: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  footer,
}: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const widths = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg" };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto w-full ${widths[size]} bg-surface border border-white/[0.13] rounded-[20px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden`}
            >
              <div className="flex items-center justify-between p-6 pb-4 border-b border-white/[0.07]">
                <div>
                  {title && <h3 className="text-[1rem] font-semibold tracking-[-0.035em]">{title}</h3>}
                  {description && <p className="text-muted2 text-[0.82rem] mt-0.5">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-white hover:bg-white/5 transition-all cursor-none ml-4 shrink-0"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {children && <div className="p-6">{children}</div>}
              {footer && <div className="px-6 pb-6 flex justify-end gap-2.5">{footer}</div>}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── AlertDialog ────────────────────────────────────────────────────────────
interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
}

export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: AlertDialogProps) {
  const confirmColors = {
    danger:  "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20",
    default: "bg-violet text-white shadow-glow hover:shadow-glow-lg",
  }[variant];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-[0.84rem] text-muted2 hover:text-white bg-surface2 rounded-[8px] transition-all border border-white/[0.07] hover:border-white/20 cursor-none"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`px-4 py-2 text-[0.84rem] rounded-[8px] transition-all cursor-none ${confirmColors}`}
          >
            {confirmLabel}
          </button>
        </>
      }
    />
  );
}
