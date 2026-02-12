"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BottomSheet from "@/components/bottom-sheet";

const ROLES = [
  { value: "all", label: "All" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "vers", label: "Vers" },
  { value: "side", label: "Side" },
];

const INTENTS = [
  { value: "all", label: "All" },
  { value: "right now", label: "Now" },
  { value: "tonight", label: "Tonight" },
  { value: "dating", label: "Chatting" },
  { value: "friends", label: "Friends" },
];

export default function FilterSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // Local state for sheet (only applies on "Apply")
  const [role, setRole] = useState(searchParams.get("role") ?? "all");
  const [intent, setIntent] = useState(searchParams.get("intent") ?? "all");
  const [lookingNow, setLookingNow] = useState(searchParams.get("looking_now") === "true");

  // Sync local state when sheet opens
  const handleOpen = useCallback(() => {
    setRole(searchParams.get("role") ?? "all");
    setIntent(searchParams.get("intent") ?? "all");
    setLookingNow(searchParams.get("looking_now") === "true");
    setOpen(true);
  }, [searchParams]);

  function handleApply() {
    const params = new URLSearchParams();
    if (role !== "all") params.set("role", role);
    if (intent !== "all") params.set("intent", intent);
    if (lookingNow) params.set("looking_now", "true");
    router.push(`/home?${params.toString()}`);
    setOpen(false);
  }

  function handleReset() {
    setRole("all");
    setIntent("all");
    setLookingNow(false);
    router.push("/home");
    setOpen(false);
  }

  // Current active filter count for badge
  const activeCount = [
    searchParams.get("role") && searchParams.get("role") !== "all",
    searchParams.get("intent") && searchParams.get("intent") !== "all",
    searchParams.get("looking_now") === "true",
  ].filter(Boolean).length;

  return (
    <>
      {/* Compact filter trigger */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-1.5 rounded-lg bg-elevated/80 backdrop-blur-md px-3 py-1.5 text-[12px] font-semibold transition-all min-h-[34px] active:scale-[0.97]"
      >
        <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        <span className="text-secondary">Filters</span>
        {activeCount > 0 && (
          <span className="flex items-center justify-center h-[18px] min-w-[18px] rounded-full bg-accent text-white text-[10px] font-bold px-1">
            {activeCount}
          </span>
        )}
      </button>

      {/* Now toggle — always visible inline */}
      <button
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          if (searchParams.get("looking_now") === "true") {
            params.delete("looking_now");
          } else {
            params.set("looking_now", "true");
          }
          router.push(`/home?${params.toString()}`);
        }}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all min-h-[34px] ${
          searchParams.get("looking_now") === "true"
            ? "bg-mint/15 text-mint border border-mint/25"
            : "bg-elevated/80 text-tertiary hover:text-secondary"
        }`}
      >
        <span
          className={`h-[5px] w-[5px] rounded-full ${
            searchParams.get("looking_now") === "true" ? "bg-mint" : "bg-tertiary"
          }`}
          style={searchParams.get("looking_now") === "true" ? { animation: "glow 2s ease-in-out infinite" } : undefined}
        />
        Now
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="Filters">
        <div className="space-y-6 pt-2">
          {/* Role */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-semibold text-tertiary uppercase tracking-widest">Role</label>
            <div className="flex items-center gap-1.5 rounded-xl bg-surface p-[3px]">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`flex-1 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 ${
                    role === r.value
                      ? "bg-accent/15 text-accent shadow-sm"
                      : "text-tertiary hover:text-secondary"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Intent */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-semibold text-tertiary uppercase tracking-widest">Intent</label>
            <div className="flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <button
                  key={i.value}
                  onClick={() => setIntent(i.value)}
                  className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-150 ${
                    intent === i.value
                      ? "bg-accent/15 text-accent ring-1 ring-accent/25"
                      : "bg-surface text-tertiary hover:text-secondary"
                  }`}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          {/* Looking Now toggle */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-semibold text-tertiary uppercase tracking-widest">Status</label>
            <button
              onClick={() => setLookingNow(!lookingNow)}
              className={`flex items-center gap-2.5 w-full px-4 py-3 rounded-lg transition-all ${
                lookingNow
                  ? "bg-mint/15 text-mint ring-1 ring-mint/25"
                  : "bg-surface text-tertiary hover:text-secondary"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${lookingNow ? "bg-mint" : "bg-tertiary"}`}
                style={lookingNow ? { animation: "glow 2s ease-in-out infinite" } : undefined}
              />
              <span className="text-[14px] font-medium">Free right now</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-3 text-[14px] font-medium text-secondary rounded-xl bg-surface hover:bg-hover transition-all active:scale-[0.98]"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-3 text-[14px] font-semibold text-white rounded-xl bg-accent hover:bg-accent-hover transition-all active:scale-[0.98]"
            >
              Apply
            </button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
