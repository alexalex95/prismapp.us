"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { demoMyProfiles, type DemoMiniProfile } from "@/lib/demo-data";

// Role-based default visible roles
const ROLE_DEFAULTS: Record<string, string[]> = {
  top: ["bottom", "vers"],
  bottom: ["top", "vers"],
  vers: ["top", "bottom", "vers", "side"],
  side: ["side", "vers"],
};

type ActiveProfileContextType = {
  activeProfile: DemoMiniProfile;
  profiles: DemoMiniProfile[];
  switchProfile: (id: string) => void;
  defaultVisibleRoles: string[];
};

const ActiveProfileContext = createContext<ActiveProfileContextType | null>(null);

export function ActiveProfileProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeProfileId") || demoMyProfiles[0].id;
    }
    return demoMyProfiles[0].id;
  });

  const activeProfile = demoMyProfiles.find((p) => p.id === activeId) || demoMyProfiles[0];
  const defaultVisibleRoles = ROLE_DEFAULTS[activeProfile.role] || ["top", "bottom", "vers", "side"];

  const switchProfile = useCallback((id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("activeProfileId", id);
    }
  }, []);

  // Sync on mount
  useEffect(() => {
    const stored = localStorage.getItem("activeProfileId");
    if (stored && demoMyProfiles.find((p) => p.id === stored)) {
      setActiveId(stored);
    }
  }, []);

  return (
    <ActiveProfileContext.Provider
      value={{
        activeProfile,
        profiles: demoMyProfiles,
        switchProfile,
        defaultVisibleRoles,
      }}
    >
      {children}
    </ActiveProfileContext.Provider>
  );
}

export function useActiveProfile() {
  const ctx = useContext(ActiveProfileContext);
  if (!ctx) throw new Error("useActiveProfile must be used within ActiveProfileProvider");
  return ctx;
}
