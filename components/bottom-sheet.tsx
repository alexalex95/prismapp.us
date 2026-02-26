"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export default function BottomSheet({
  open,
  onClose,
  title,
  subtitle,
  footer,
  children,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        style={{ animation: "fade-in 0.18s ease-out", backdropFilter: "blur(4px)" }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 flex flex-col rounded-t-[28px] max-h-[88vh]"
        style={{
          background: "linear-gradient(175deg, rgba(22, 15, 38, 0.97) 0%, rgba(11, 9, 21, 0.99) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(139, 92, 246, 0.2)",
          boxShadow: "0 -20px 80px rgba(0,0,0,0.6), 0 -2px 0 rgba(99,60,180,0.1)",
          animation: "slide-up 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Grab handle */}
        <div className="flex justify-center pt-3.5 pb-1 shrink-0">
          <span className="h-[3px] w-10 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-start justify-between px-5 pb-4 pt-2 shrink-0">
            <div className="flex flex-col">
              <h2 className="text-[20px] font-display font-bold text-white tracking-tight leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-[13px] text-text-secondary mt-1">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full text-text-secondary hover:text-white transition-all ml-4 mt-0.5 shrink-0"
              style={{ background: "rgba(255,255,255,0.07)" }}
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="1" y1="1" x2="11" y2="11" />
                <line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            </button>
          </div>
        )}

        {/* Divider below header */}
        <div className="shrink-0 mx-5" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* Scrollable content */}
        <div
          className={`flex-1 overflow-y-auto overscroll-contain px-5 min-h-0 ${
            footer ? "pb-4" : "pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
          }`}
        >
          {children}
        </div>

        {/* Footer (always visible, outside scroll) */}
        {footer && (
          <div
            className="shrink-0 px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "linear-gradient(180deg, rgba(14,10,24,1) 0%, rgba(11,9,21,1) 100%)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
