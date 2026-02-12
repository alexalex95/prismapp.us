"use client";

import ProfileSwitcherHeader from "@/components/profile-switcher-header";

export default function ChatHeader() {
  return (
    <header className="sticky top-0 z-40 bg-base/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 pt-12 pb-3">
        <h1 className="text-[22px] font-bold tracking-tight">Chat</h1>
        <ProfileSwitcherHeader />
      </div>
    </header>
  );
}
