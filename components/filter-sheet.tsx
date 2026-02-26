"use client";

import { useState, useEffect } from "react";
import BottomSheet from "@/components/bottom-sheet";
import { Slider } from "@/components/ui/slider";

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  role: string;
  intent: string;
  ageRange: number[];
  heightRange: number[];
  weightRange: number[];
}

export const INITIAL_FILTERS: FilterState = {
  role: "all",
  intent: "all",
  ageRange: [18, 60],
  heightRange: [160, 200],
  weightRange: [60, 100],
};

const ROLES = [
  { value: "all",    label: "All",    icon: ""   },
  { value: "top",    label: "Top",    icon: "⬆️" },
  { value: "bottom", label: "Bottom", icon: "⬇️" },
  { value: "vers",   label: "Vers",   icon: "🔄" },
  { value: "side",   label: "Side",   icon: "🧩" },
];

const INTENTS = [
  { value: "all",       label: "All",       icon: ""   },
  { value: "right now", label: "Right Now", icon: "🔥" },
  { value: "dates",     label: "Dates",     icon: "🥂" },
  { value: "friends",   label: "Friends",   icon: "🤝" },
];

// Chip base classes (shared)
const chipBase = "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all duration-150 active:scale-[0.94] select-none cursor-pointer border";
const chipInactive = "text-text-secondary border-white/10 hover:text-text-primary hover:border-white/[0.18]";
const chipActiveRole = "text-white border-accent/40 shadow-[0_0_18px_rgba(142,92,244,0.22)]";
const chipActiveIntent = "text-accent border-accent/25 shadow-[0_0_12px_rgba(142,92,244,0.12)]";

export default function FilterSheet({ open, onClose, filters, onApply }: FilterSheetProps) {
  const [local, setLocal] = useState<FilterState>(filters);

  useEffect(() => {
    setLocal(filters);
  }, [filters, open]);

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  const handleReset = () => setLocal(INITIAL_FILTERS);

  const footer = (
    <div>
      <p className="text-center text-[11px] text-text-tertiary mb-3 tracking-wide">
        Results update when you tap Show Results
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 py-3.5 text-[14px] font-semibold text-text-secondary rounded-2xl transition-all active:scale-[0.97] border border-white/10 hover:border-white/[0.18] hover:text-text-primary"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-[2] py-3.5 text-[14px] font-bold text-white rounded-2xl transition-all active:scale-[0.97] hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.32)",
          }}
        >
          Show Results
        </button>
      </div>
    </div>
  );

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Refine"
      subtitle="Pick what you're into ✨"
      footer={footer}
    >
      <div className="space-y-7 pt-5 pb-2">

        {/* Identity */}
        <section className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            Identity
          </p>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => {
              const isActive = local.role === r.value;
              return (
                <button
                  key={r.value}
                  onClick={() => setLocal({ ...local, role: r.value })}
                  className={`${chipBase} ${isActive ? chipActiveRole : `${chipInactive}`}`}
                  style={isActive ? { background: "rgba(124,58,237,0.85)" } : { background: "rgba(255,255,255,0.05)" }}
                >
                  {r.icon && <span className="text-[12px] leading-none">{r.icon}</span>}
                  {r.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Looking For */}
        <section className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            Looking For
          </p>
          <div className="flex flex-wrap gap-2">
            {INTENTS.map((i) => {
              const isActive = local.intent === i.value;
              return (
                <button
                  key={i.value}
                  onClick={() => setLocal({ ...local, intent: i.value })}
                  className={`${chipBase} ${isActive ? chipActiveIntent : `${chipInactive}`}`}
                  style={isActive ? { background: "rgba(124,58,237,0.12)" } : { background: "rgba(255,255,255,0.05)" }}
                >
                  {i.icon && <span className="text-[12px] leading-none">{i.icon}</span>}
                  {i.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* Sliders */}
        <section className="space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-tertiary -mb-2">
            Preferences
          </p>

          {/* Age */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold text-text-secondary">Age</span>
              <span className="text-[13px] font-bold tabular-nums text-accent">
                {local.ageRange[0]}–{local.ageRange[1]}
              </span>
            </div>
            <Slider
              min={18}
              max={80}
              value={local.ageRange}
              onValueChange={(val) => setLocal({ ...local, ageRange: val })}
            />
          </div>

          {/* Height */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold text-text-secondary">Height</span>
              <span className="text-[13px] font-bold tabular-nums text-accent">
                {local.heightRange[0]}–{local.heightRange[1]} cm
              </span>
            </div>
            <Slider
              min={150}
              max={220}
              value={local.heightRange}
              onValueChange={(val) => setLocal({ ...local, heightRange: val })}
            />
          </div>

          {/* Weight */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-semibold text-text-secondary">Weight</span>
              <span className="text-[13px] font-bold tabular-nums text-accent">
                {local.weightRange[0]}–{local.weightRange[1]} kg
              </span>
            </div>
            <Slider
              min={50}
              max={150}
              value={local.weightRange}
              onValueChange={(val) => setLocal({ ...local, weightRange: val })}
            />
          </div>
        </section>

      </div>
    </BottomSheet>
  );
}
