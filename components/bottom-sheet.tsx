"use client";

import { useEffect, useRef, type ReactNode } from "react";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        style={{ animation: "fade-in 0.15s ease-out" }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 glass bg-base/90 border-t border-white/10 rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-2xl shadow-black/50"
        style={{ animation: "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <span className="h-1 w-12 rounded-full bg-white/20" />
        </div>

        {title && (
          <div className="px-6 pb-4 pt-1">
            <h2 className="text-xl font-display font-bold text-white">{title}</h2>
          </div>
        )}

        <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>
  );
}
