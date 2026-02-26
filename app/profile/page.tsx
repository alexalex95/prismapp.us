"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { currentUser } from "@/lib/demo-data";
import Nav from "@/components/nav";

const POSITIONS = [
  { value: "top",    label: "Top",    icon: "⬆️", activeClass: "bg-blue-500/20 text-blue-200 border-blue-500/30 shadow-[0_0_14px_rgba(59,130,246,0.15)]" },
  { value: "bottom", label: "Bottom", icon: "⬇️", activeClass: "bg-pink-500/20 text-pink-200 border-pink-500/30 shadow-[0_0_14px_rgba(236,72,153,0.15)]" },
  { value: "vers",   label: "Vers",   icon: "↕️", activeClass: "bg-violet-500/20 text-violet-200 border-violet-500/30 shadow-[0_0_14px_rgba(139,92,246,0.15)]" },
  { value: "side",   label: "Side",   icon: "🧩", activeClass: "bg-slate-400/20 text-slate-200 border-slate-400/30 shadow-[0_0_10px_rgba(148,163,184,0.12)]" },
];

const INTENTS = [
  { value: "right now", label: "Right Now", icon: "🔥", activeClass: "bg-orange-500/18 text-orange-200 border-orange-500/28 shadow-[0_0_14px_rgba(249,115,22,0.15)]" },
  { value: "tonight",   label: "Tonight",   icon: "🌙", activeClass: "bg-indigo-500/18 text-indigo-200 border-indigo-500/28 shadow-[0_0_14px_rgba(99,102,241,0.15)]" },
  { value: "dates",     label: "Dates",     icon: "🥂", activeClass: "bg-rose-500/18 text-rose-200 border-rose-500/28 shadow-[0_0_14px_rgba(244,63,94,0.12)]" },
  { value: "friends",   label: "Friends",   icon: "🤝", activeClass: "bg-emerald-500/18 text-emerald-200 border-emerald-500/28 shadow-[0_0_14px_rgba(52,211,153,0.12)]" },
];

const chipBase =
  "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold border transition-all duration-150 active:scale-[0.94] select-none cursor-pointer";
const chipInactive =
  "text-text-tertiary border-white/10 hover:text-text-secondary hover:border-white/[0.18]";

export default function ProfilePage() {
  const router = useRouter();
  const [role, setRole] = useState(currentUser.role);
  const [intent, setIntent] = useState(currentUser.intent);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    document.cookie = "demo_session=; path=/; max-age=0";
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen pb-24 bg-base font-body">
      {/* Full-bleed photo */}
      <div className="relative w-full aspect-[3/4] max-h-[55vh] overflow-hidden rounded-b-3xl">
        <img
          src={currentUser.photo_url}
          alt={currentUser.display_name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-4xl font-display font-black tracking-tight leading-none text-white drop-shadow-lg">
              {currentUser.display_name}
            </h1>
            <span className="text-2xl text-white/60 font-medium">{currentUser.age}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-8 space-y-7">

        {/* Position */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            Position
          </p>
          <div className="flex flex-wrap gap-2">
            {POSITIONS.map((p) => {
              const isActive = role === p.value;
              return (
                <button
                  key={p.value}
                  onClick={() => setRole(p.value)}
                  className={`${chipBase} ${isActive ? p.activeClass : chipInactive}`}
                  style={!isActive ? { background: "rgba(255,255,255,0.04)" } : undefined}
                >
                  <span className="text-[13px] leading-none">{p.icon}</span>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Looking for */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-tertiary">
            Looking for
          </p>
          <div className="flex flex-wrap gap-2">
            {INTENTS.map((i) => {
              const isActive = intent === i.value;
              return (
                <button
                  key={i.value}
                  onClick={() => setIntent(i.value)}
                  className={`${chipBase} ${isActive ? i.activeClass : chipInactive}`}
                  style={!isActive ? { background: "rgba(255,255,255,0.04)" } : undefined}
                >
                  <span className="text-[13px] leading-none">{i.icon}</span>
                  {i.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bio */}
        {currentUser.bio && (
          <div className="p-4 glass rounded-2xl border border-white/5">
            <p className="text-base text-text-secondary leading-relaxed">{currentUser.bio}</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => router.push("/profile/edit")}
            className="w-full h-12 rounded-xl glass border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full h-12 rounded-xl border border-status-busy/30 text-status-busy font-bold hover:bg-status-busy/10 transition-colors disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>

      </div>

      <Nav />
    </div>
  );
}
