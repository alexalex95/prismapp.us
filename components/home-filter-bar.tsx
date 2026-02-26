"use client";

import { useState } from "react";
import FilterSheet, { FilterState, INITIAL_FILTERS } from "@/components/filter-sheet";

type StatusFilter = "online" | "ready_now" | "tonight" | "browsing" | null;

interface HomeFilterBarProps {
  onFiltersChange: (filters: FilterState & { statusFilter: StatusFilter }) => void;
}

const ROLE_PILLS: Array<{ value: string; label: string; activeClass: string }> = [
  {
    value: "all",
    label: "All",
    activeClass: "bg-white/12 text-white border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.06)]",
  },
  {
    value: "top",
    label: "⬆ Top",
    activeClass: "bg-blue-500/18 text-blue-200 border-blue-500/28 shadow-[0_0_12px_rgba(59,130,246,0.14)]",
  },
  {
    value: "bottom",
    label: "⬇ Bottom",
    activeClass: "bg-pink-500/18 text-pink-200 border-pink-500/28 shadow-[0_0_12px_rgba(236,72,153,0.14)]",
  },
  {
    value: "vers",
    label: "↕ Vers",
    activeClass: "bg-violet-500/18 text-violet-200 border-violet-500/28 shadow-[0_0_12px_rgba(139,92,246,0.14)]",
  },
];

const STATUS_PILLS: Array<{ value: StatusFilter; label: string; activeClass: string }> = [
  {
    value: "online",
    label: "🟢 Online",
    activeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25 shadow-[0_0_10px_rgba(52,211,153,0.12)]",
  },
  {
    value: "ready_now",
    label: "🔥 Ready Now",
    activeClass: "bg-orange-500/15 text-orange-300 border-orange-500/25 shadow-[0_0_10px_rgba(249,115,22,0.12)]",
  },
  {
    value: "tonight",
    label: "🌙 Tonight",
    activeClass: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25 shadow-[0_0_10px_rgba(99,102,241,0.12)]",
  },
  {
    value: "browsing",
    label: "👀 Browsing",
    activeClass: "bg-violet-500/15 text-violet-300 border-violet-500/25 shadow-[0_0_10px_rgba(139,92,246,0.12)]",
  },
];

export default function HomeFilterBar({ onFiltersChange }: HomeFilterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(null);

  const updateParent = (newFilters: FilterState, newStatus: StatusFilter) => {
    onFiltersChange({ ...newFilters, statusFilter: newStatus });
  };

  const handleRoleSelect = (role: string) => {
    const newFilters = { ...filters, role };
    setFilters(newFilters);
    updateParent(newFilters, statusFilter);
  };

  const handleStatusToggle = (status: StatusFilter) => {
    const newStatus = statusFilter === status ? null : status;
    setStatusFilter(newStatus);
    updateParent(filters, newStatus);
  };

  const handleSheetApply = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateParent(newFilters, statusFilter);
  };

  const activeFilterCount =
    (filters.role !== "all" ? 1 : 0) +
    (filters.intent !== "all" ? 1 : 0) +
    (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 60 ? 1 : 0) +
    (filters.heightRange[0] !== 160 || filters.heightRange[1] !== 200 ? 1 : 0);

  const inactiveClass =
    "bg-transparent text-text-tertiary border-white/10 hover:bg-white/5 hover:text-text-secondary";

  return (
    <>
      <div className="sticky top-[56px] z-40 bg-base/80 backdrop-blur-md pb-1 border-b border-white/5">
        <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar mask-gradient-right">

          {/* ✨ Filter Your Type */}
          <button
            onClick={() => setSheetOpen(true)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all text-[13px] font-semibold border ${
              activeFilterCount > 0
                ? "bg-accent/12 text-accent border-accent/22 shadow-[0_0_14px_rgba(142,92,244,0.12)]"
                : "bg-white/5 text-text-secondary border-white/10 hover:bg-white/8 hover:text-text-primary"
            }`}
          >
            <span className="text-[14px] leading-none">✨</span>
            <span className="tracking-tight whitespace-nowrap">Filter Your Type</span>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center h-4 w-4 rounded-full bg-accent text-white text-[9px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="w-px h-5 bg-white/10 shrink-0" />

          {/* Role filter pills */}
          {ROLE_PILLS.map((pill) => (
            <button
              key={pill.value}
              onClick={() => handleRoleSelect(pill.value)}
              className={`shrink-0 px-3.5 py-2 text-[13px] font-semibold rounded-full transition-all border whitespace-nowrap ${
                filters.role === pill.value ? pill.activeClass : inactiveClass
              }`}
            >
              {pill.label}
            </button>
          ))}

          <div className="w-px h-5 bg-white/10 shrink-0" />

          {/* Status filter pills */}
          {STATUS_PILLS.map((pill) => (
            <button
              key={pill.value}
              onClick={() => handleStatusToggle(pill.value)}
              className={`shrink-0 px-3.5 py-2 text-[13px] font-semibold rounded-full transition-all border whitespace-nowrap ${
                statusFilter === pill.value ? pill.activeClass : inactiveClass
              }`}
            >
              {pill.label}
            </button>
          ))}

        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        onApply={handleSheetApply}
      />
    </>
  );
}
