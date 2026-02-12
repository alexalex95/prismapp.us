"use client";

import { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { demoProfiles, demoConversations } from "@/lib/demo-data";
import { useActiveProfile } from "@/lib/active-profile";
import { createClient } from "@/lib/supabase/client";

const intentLabels: Record<string, string> = {
  "right now": "Right Now",
  tonight: "Tonight",
  dating: "Dates",
  friends: "Friends",
};

export default function ProfileDetailPage() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;
  const profile = demoProfiles.find((p) => p.id === profileId);
  const { activeProfile } = useActiveProfile();

  const [photoIndex, setPhotoIndex] = useState(0);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [messaging, setMessaging] = useState(false);
  const touchStartY = useRef(0);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base">
        <p className="text-text-secondary font-medium">Profile not found</p>
      </div>
    );
  }

  const photos = profile.photos.length > 0 ? profile.photos : [profile.photo_url];

  function handleTouchStart(e: React.TouchEvent) {
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) setSheetExpanded(true);
    if (diff < -50) setSheetExpanded(false);
  }

  async function handleMessage() {
    setMessaging(true);

    // Check if a demo conversation already exists with this profile
    const existingConv = demoConversations.find((c) => c.profile.id === profileId);
    if (existingConv) {
      router.push(`/chat/${existingConv.id}`);
      return;
    }

    // Try to find/create in Supabase
    try {
      const supabase = createClient();
      const myProfileId = activeProfile.id;

      // Check existing conversation (either direction)
      const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .or(`and(profile_a_id.eq.${myProfileId},profile_b_id.eq.${profileId}),and(profile_a_id.eq.${profileId},profile_b_id.eq.${myProfileId})`)
        .maybeSingle();

      if (existing) {
        router.push(`/chat/${existing.id}`);
        return;
      }

      // Create new conversation
      const { data: newConv, error } = await supabase
        .from("conversations")
        .insert({ profile_a_id: myProfileId, profile_b_id: profileId })
        .select("id")
        .single();

      if (newConv) {
        router.push(`/chat/${newConv.id}`);
        return;
      }

      // If Supabase fails (no tables yet), create a local demo conversation ID
      if (error) {
        const localId = `local-${myProfileId}-${profileId}`;
        router.push(`/chat/${localId}?otherProfileId=${profileId}`);
      }
    } catch {
      // Fallback: route with query param so chat thread can look up the profile
      const localId = `local-${activeProfile.id}-${profileId}`;
      router.push(`/chat/${localId}?otherProfileId=${profileId}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-base z-50 flex flex-col overflow-hidden animate-in fade-in duration-300">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-safe-top pb-3 pointer-events-none">
        <button
          onClick={() => router.back()}
          className="pointer-events-auto flex items-center justify-center h-10 w-10 rounded-full glass hover:bg-white/10 transition-all active:scale-95 shadow-lg shadow-black/20"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="pointer-events-auto flex items-center justify-center h-10 w-10 rounded-full glass hover:bg-white/10 transition-all active:scale-95 shadow-lg shadow-black/20">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </button>
      </div>

      {/* Photo area — top 60% */}
      <div className="relative w-full transition-all duration-500 ease-out-expo" style={{ height: sheetExpanded ? "45%" : "65%" }}>
        <img
          src={photos[photoIndex]}
          alt={profile.display_name}
          className="h-full w-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/30 to-transparent opacity-90" />

        {/* Photo carousel dots */}
        {photos.length > 1 && (
          <div className="absolute top-20 left-0 right-0 flex justify-center gap-1.5 z-20">
            {photos.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 shadow-sm ${i === photoIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Tap zones for carousel */}
        {photos.length > 1 && (
          <>
            <button
              className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
              onClick={() => setPhotoIndex((i) => (i > 0 ? i - 1 : photos.length - 1))}
            />
            <button
              className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
              onClick={() => setPhotoIndex((i) => (i < photos.length - 1 ? i + 1 : 0))}
            />
          </>
        )}
      </div>

      {/* Bottom sheet info panel */}
      <div
        className="flex-1 glass bg-base/90 border-t border-white/5 overflow-y-auto -mt-10 rounded-t-[32px] relative shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-4">
          <span className="h-1.5 w-12 rounded-full bg-white/20" />
        </div>

        <div className="px-6 pb-safe-bottom space-y-6">
          {/* Name + age + status */}
          <div>
            <div className="flex items-end gap-3 mb-1">
              <h1 className="text-4xl font-display font-black tracking-tight text-white drop-shadow-md">{profile.display_name}</h1>
              <span className="text-2xl text-text-secondary font-medium mb-1">{profile.age}</span>
            </div>

            <div className="flex items-center gap-4 mt-3">
              {profile.looking_now && (
                <div className="flex items-center gap-2 bg-status-online/10 px-3 py-1.5 rounded-full border border-status-online/20">
                  <span
                    className="h-2 w-2 rounded-full bg-status-online shadow-[0_0_8px_rgba(46,229,157,0.8)]"
                    style={{ animation: "glow 2s ease-in-out infinite" }}
                  />
                  <span className="text-sm font-bold text-status-online">
                    {intentLabels[profile.intent] || "Available"}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-text-tertiary flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {profile.distance}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/90 glass-pill px-3 py-1.5 rounded-lg shadow-sm border border-white/5">
              {profile.role}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-white/90 glass-pill px-3 py-1.5 rounded-lg shadow-sm border border-white/5">
              {intentLabels[profile.intent] || profile.intent}
            </span>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="glass p-4 rounded-2xl border border-white/5 bg-white/5">
              <p className="text-base text-text-secondary leading-relaxed font-medium">"{profile.bio}"</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button className="flex items-center justify-center h-14 w-14 rounded-2xl glass hover:bg-white/10 transition-all active:scale-[0.95] shadow-lg border border-white/10 group">
              <svg className="w-7 h-7 text-status-busy group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </button>

            <button
              onClick={handleMessage}
              disabled={messaging}
              className="flex-1 rounded-2xl bg-gradient-to-r from-primary-start to-primary-end h-14 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-primary-start/30 hover:shadow-primary-start/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {messaging ? (
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Message"
              )}
            </button>

            <button className="flex items-center justify-center h-14 w-14 rounded-2xl glass hover:bg-white/10 transition-all active:scale-[0.95] shadow-lg border border-white/10 group">
              <svg className="w-7 h-7 text-status-away group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 0 1-4.5 0Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
