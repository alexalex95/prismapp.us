"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const ROLES = [
  { value: "all", label: "All" },
  { value: "top", label: "Top" },
  { value: "bottom", label: "Btm" },
  { value: "vers", label: "Vers" },
  { value: "side", label: "Side" },
];

const INTENTS = [
  { value: "all", label: "All" },
  { value: "right now", label: "Now" },
  { value: "tonight", label: "Tonight" },
  { value: "dating", label: "Chat" },
  { value: "friends", label: "Friends" },
];

function FilterBar({
  items,
  active,
  onSelect,
}: {
  items: { value: string; label: string }[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-elevated/80 backdrop-blur-md p-[2px]">
      {items.map((item) => {
        const selected = active === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onSelect(item.value)}
            className={`relative px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all duration-150 min-w-[44px] ${
              selected
                ? "text-accent"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {selected && (
              <span className="absolute inset-0 rounded-md bg-accent/10 border border-accent/20" />
            )}
            <span className="relative">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function GridFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = searchParams.get("role") ?? "all";
  const intent = searchParams.get("intent") ?? "all";
  const lookingNow = searchParams.get("looking_now") === "true";

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all" || value === "false") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`/home?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
      <FilterBar items={ROLES} active={role} onSelect={(v) => setFilter("role", v)} />
      <FilterBar items={INTENTS} active={intent} onSelect={(v) => setFilter("intent", v)} />

      <button
        onClick={() => setFilter("looking_now", lookingNow ? "false" : "true")}
        className={`flex-shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all duration-150 min-h-[32px] ${
          lookingNow
            ? "bg-status-online/15 text-status-online border border-status-online/25"
            : "bg-elevated/80 text-text-tertiary hover:text-text-secondary"
        }`}
      >
        <span
          className={`h-[5px] w-[5px] rounded-full ${lookingNow ? "bg-status-online" : "bg-text-tertiary"}`}
          style={lookingNow ? { animation: "glow 2s ease-in-out infinite" } : undefined}
        />
        Now
      </button>
    </div>
  );
}
