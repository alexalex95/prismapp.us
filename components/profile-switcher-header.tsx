"use client";

import { useState } from "react";
import { useActiveProfile } from "@/lib/active-profile";
import BottomSheet from "@/components/bottom-sheet";

export default function ProfileSwitcherHeader() {
  const { activeProfile, profiles, switchProfile } = useActiveProfile();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 pl-1 pr-3 py-1 rounded-full glass hover:bg-white/10 transition-all active:scale-95 border border-white/10"
      >
        <div className="relative">
          <img
            src={activeProfile.photo_url}
            alt={activeProfile.display_name}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-primary-start/50 transition-all"
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10" />
        </div>
        <span className="text-sm font-bold text-white max-w-[100px] truncate">
          {activeProfile.display_name}
        </span>
        <svg className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="Switch profile">
        <div className="space-y-2 pt-2 pb-6">
          {profiles.map((p) => {
            const isActive = p.id === activeProfile.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  switchProfile(p.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all min-h-[64px] group ${isActive
                    ? "bg-gradient-to-r from-primary-start/10 to-primary-end/10 ring-1 ring-primary-start/30"
                    : "hover:bg-white/5"
                  }`}
              >
                <div className="relative">
                  <img
                    src={p.photo_url}
                    alt={p.display_name}
                    className={`h-12 w-12 rounded-full object-cover transition-all ${isActive ? "ring-2 ring-primary-start shadow-lg shadow-primary-start/20" : "opacity-80 group-hover:opacity-100"
                      }`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <span className={`text-[15px] font-bold block ${isActive ? "text-white" : "text-white/80"}`}>
                    {p.display_name}
                  </span>
                  <span className="text-xs font-medium text-text-secondary capitalize mt-0.5">
                    {p.role} · {p.intent}
                  </span>
                </div>
                {isActive && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-start to-primary-end flex items-center justify-center shadow-lg shadow-primary-start/30">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </BottomSheet>
    </>
  );
}
