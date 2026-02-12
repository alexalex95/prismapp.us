"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useActiveProfile } from "@/lib/active-profile";
import Nav from "@/components/nav";

const intentLabels: Record<string, string> = {
  "right now": "Right Now",
  tonight: "Tonight",
  dating: "Dates",
  friends: "Friends",
};

export default function ProfilePage() {
  const router = useRouter();
  const { activeProfile, profiles, switchProfile } = useActiveProfile();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen pb-24 bg-base font-body">
      {/* Full-bleed photo */}
      <div className="relative w-full aspect-[3/4] max-h-[55vh] overflow-hidden rounded-b-3xl">
        <img
          src={activeProfile.photo_url}
          alt={activeProfile.display_name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />

        {/* Name + age overlaid */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-4xl font-display font-black tracking-tight leading-none text-white drop-shadow-lg">
              {activeProfile.display_name}
            </h1>
            <span className="text-2xl text-white/60 font-medium">{activeProfile.age}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-8 space-y-8">
        {/* Status */}
        <div className="space-y-4">
          {activeProfile.looking_now && (
            <div className="flex items-center gap-3 bg-status-online/10 p-3 rounded-2xl border border-status-online/20">
              <span
                className="h-3 w-3 rounded-full bg-status-online shadow-[0_0_12px_rgba(46,229,157,0.8)]"
                style={{ animation: "glow 2s ease-in-out infinite" }}
              />
              <span className="text-sm font-bold text-status-online">Free right now</span>
            </div>
          )}

          {activeProfile.bio && (
            <div className="p-4 glass rounded-2xl border border-white/5">
              <p className="text-base text-text-secondary leading-relaxed">{activeProfile.bio}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-text-tertiary">
            <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{activeProfile.role}</span>
            <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{intentLabels[activeProfile.intent] || activeProfile.intent}</span>
          </div>
        </div>

        {/* Profile switcher */}
        {profiles.length > 1 && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-text-tertiary uppercase tracking-widest pl-1">
              Switch profile
            </span>
            <div className="flex gap-2 p-1 bg-black/20 rounded-xl overflow-x-auto">
              {profiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => switchProfile(p.id)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap ${p.id === activeProfile.id
                      ? "bg-gradient-to-r from-primary-start to-primary-end text-white shadow-md"
                      : "text-text-tertiary hover:text-white hover:bg-white/10"
                    }`}
                >
                  {p.display_name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button className="w-full h-12 rounded-xl glass border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
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
