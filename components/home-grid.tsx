"use client";

import { useState } from "react";
import ProfileCard from "@/components/profile-card";
import type { DemoProfile } from "@/lib/demo-data";

type Profile = DemoProfile | {
  id: string;
  display_name: string;
  role: string;
  intent: string;
  age: number;
  looking_now: boolean;
  photo_url?: string;
};

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
  { value: "dating", label: "Dates" },
  { value: "friends", label: "Friends" },
];

export default function HomeGrid({ allProfiles }: { allProfiles: Profile[] }) {
  const [role, setRole] = useState("all");
  const [intent, setIntent] = useState("all");
  const [lookingNow, setLookingNow] = useState(false);

  const filtered = allProfiles.filter((p) => {
    if (role !== "all" && p.role !== role) return false;
    if (intent !== "all" && p.intent !== intent) return false;
    if (lookingNow && !p.looking_now) return false;
    return true;
  });

  return (
    <>
      <div className="sticky top-[56px] z-40 backdrop-blur-xl bg-base/50 pb-2 border-b border-white/5">
        {/* Inline filter bar */}
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {/* Role pills */}
          {ROLES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRole(role === r.value && r.value !== "all" ? "all" : r.value)}
              className={`shrink-0 px-4 py-1.5 text-[13px] font-bold rounded-full transition-all duration-300 transform ${role === r.value
                  ? "bg-gradient-to-r from-primary-start to-primary-end text-white shadow-lg shadow-primary-start/20 scale-105"
                  : "glass-pill text-text-secondary hover:bg-white/10"
                }`}
            >
              {r.label}
            </button>
          ))}

          {/* Divider */}
          <span className="shrink-0 h-4 w-px bg-white/10 mx-1" />

          {/* Now toggle */}
          <button
            onClick={() => setLookingNow(!lookingNow)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-bold rounded-full transition-all duration-300 ${lookingNow
                ? "bg-gradient-to-r from-status-online to-teal-400 text-base shadow-lg shadow-status-online/20"
                : "glass-pill text-text-secondary hover:bg-white/10"
              }`}
          >
            <span className={`h-2 w-2 rounded-full ${lookingNow ? "bg-base" : "bg-status-online"}`} />
            Online
          </button>
        </div>

        {/* Intent row */}
        <div className="flex items-center gap-2 px-4 pb-2 overflow-x-auto no-scrollbar">
          {INTENTS.map((i) => (
            <button
              key={i.value}
              onClick={() => setIntent(intent === i.value && i.value !== "all" ? "all" : i.value)}
              className={`shrink-0 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-lg transition-all ${intent === i.value
                  ? "text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/30"
                  : "text-text-tertiary border border-transparent hover:border-white/10"
                }`}
            >
              {i.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-3 py-3 min-h-[calc(100vh-200px)]">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="animate-in fade-in fill-mode-both"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <ProfileCard
                  id={p.id}
                  display_name={p.display_name}
                  role={p.role}
                  intent={p.intent}
                  age={p.age}
                  looking_now={p.looking_now}
                  photo_url={"photo_url" in p ? p.photo_url : undefined}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-32 text-center animate-pulse-glow">
            <div className="w-16 h-16 rounded-full bg-surface mb-4 flex items-center justify-center text-3xl">
              👻
            </div>
            <p className="text-text-secondary font-display font-bold text-lg">No matches found</p>
            <p className="text-text-tertiary text-sm mt-1">Try expanding your search to other tribes</p>
          </div>
        )}
      </div>
    </>
  );
}
