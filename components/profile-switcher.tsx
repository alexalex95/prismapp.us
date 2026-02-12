"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MiniProfile = {
  id: string;
  display_name: string;
  active: boolean;
};

export default function ProfileSwitcher() {
  const [profiles, setProfiles] = useState<MiniProfile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("mini_profiles")
        .select("id, display_name, active")
        .eq("user_id", user.id)
        .order("created_at");

      if (data) {
        setProfiles(data);
        const active = data.find((p) => p.active);
        if (active) setActiveId(active.id);
      }
    }
    load();
  }, []);

  async function switchProfile(id: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("mini_profiles").update({ active: false }).eq("user_id", user.id);
    await supabase.from("mini_profiles").update({ active: true }).eq("id", id);
    setActiveId(id);
    setProfiles((prev) => prev.map((p) => ({ ...p, active: p.id === id })));
  }

  if (profiles.length <= 1) return null;

  return (
    <div className="flex items-center gap-1">
      {profiles.map((p) => (
        <button
          key={p.id}
          onClick={() => switchProfile(p.id)}
          className={`rounded-lg px-2.5 py-1 text-[12px] font-medium transition-colors duration-150 ${
            p.id === activeId
              ? "text-accent bg-accent-soft"
              : "text-faint hover:text-muted"
          }`}
        >
          {p.display_name}
        </button>
      ))}
    </div>
  );
}
