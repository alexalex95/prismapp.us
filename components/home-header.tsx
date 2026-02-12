"use client";

import ProfileSwitcherHeader from "@/components/profile-switcher-header";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 bg-base/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-5 pt-safe-top pb-3 h-[60px]">
        <h1 className="text-3xl font-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end drop-shadow-sm">
          Nearby
        </h1>
        <ProfileSwitcherHeader />
      </div>
    </header>
  );
}
