"use client";

import { useState } from "react";
import ProfileCard from "@/components/profile-card";
import HomeFilterBar from "@/components/home-filter-bar";
import { FilterState, INITIAL_FILTERS } from "@/components/filter-sheet";
import type { DemoProfile } from "@/lib/demo-data";

type Profile = DemoProfile;
type StatusFilter = "online" | "ready_now" | "tonight" | "browsing" | null;

// Per-role background gradient overlays
const ROLE_GRADIENTS: Record<string, string> = {
  all: [
    "radial-gradient(ellipse 110% 70% at 8% 4%, rgba(89, 42, 159, 0.13) 0%, transparent 55%)",
    "radial-gradient(ellipse 70% 50% at 88% 88%, rgba(60, 20, 100, 0.07) 0%, transparent 50%)",
  ].join(", "),
  top: "radial-gradient(ellipse 100% 65% at 12% 0%, rgba(59, 130, 246, 0.17) 0%, transparent 60%)",
  bottom: "radial-gradient(ellipse 100% 65% at 88% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)",
  vers: "radial-gradient(ellipse 100% 65% at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
};

export default function HomeGrid({ allProfiles }: { allProfiles: Profile[] }) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(null);

  const handleFiltersChange = (vals: FilterState & { statusFilter: StatusFilter }) => {
    setFilters({
      role: vals.role,
      intent: vals.intent,
      ageRange: vals.ageRange,
      heightRange: vals.heightRange,
      weightRange: vals.weightRange,
    });
    setStatusFilter(vals.statusFilter);
  };

  // Apply filters
  const filtered = allProfiles.filter((p) => {
    // Role
    if (filters.role !== "all" && p.role !== filters.role) return false;

    // Intent
    if (filters.intent !== "all" && p.intent !== filters.intent) return false;

    // Age
    if (p.age < filters.ageRange[0] || p.age > filters.ageRange[1]) return false;

    // Height
    if (p.height < filters.heightRange[0] || p.height > filters.heightRange[1]) return false;

    // Weight
    if (p.weight < filters.weightRange[0] || p.weight > filters.weightRange[1]) return false;

    // Status filter (exclusive quick filter)
    if (statusFilter === "online" && !p.looking_now) return false;
    if (statusFilter === "ready_now" && p.intent !== "right now") return false;
    if (statusFilter === "tonight" && p.intent !== "tonight") return false;
    if (statusFilter === "browsing" && p.intent !== "dates" && p.intent !== "friends") return false;

    return true;
  });

  const activeRole = filters.role in ROLE_GRADIENTS ? filters.role : "all";
  // Key change triggers the grid-in animation on filter updates
  const gridKey = `${filters.role}-${filters.intent}-${statusFilter}`;

  return (
    <>
      {/* Dynamic background gradient overlays (fixed, behind all content) */}
      {(Object.keys(ROLE_GRADIENTS) as string[]).map((role) => (
        <div
          key={role}
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: ROLE_GRADIENTS[role],
            opacity: activeRole === role ? 1 : 0,
            transition: "opacity 0.65s ease",
          }}
        />
      ))}

      <HomeFilterBar onFiltersChange={handleFiltersChange} />

      <div className="px-3 py-3 min-h-[calc(100vh-200px)] relative z-[1]">
        {filtered.length > 0 ? (
          <div
            key={gridKey}
            className="grid grid-cols-3 gap-1.5 sm:gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 animate-grid-in"
          >
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="animate-in fade-in fill-mode-both"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <ProfileCard
                  id={p.id}
                  display_name={p.display_name}
                  role={p.role}
                  intent={p.intent}
                  age={p.age}
                  looking_now={p.looking_now}
                  photo_url={p.photo_url}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-32 text-center">
            <div className="w-16 h-16 rounded-full bg-surface mb-4 flex items-center justify-center text-3xl">
              👻
            </div>
            <p className="text-text-secondary font-display font-bold text-lg">No matches found</p>
            <p className="text-text-tertiary text-sm mt-1">Try relaxing your filters</p>
          </div>
        )}
      </div>
    </>
  );
}
