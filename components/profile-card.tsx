"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ProfileCardProps = {
  id: string;
  display_name: string;
  role: string;
  intent: string;
  age: number;
  looking_now: boolean;
  photo_url?: string;
  className?: string;
};

const ROLE_EMOJI: Record<string, string> = {
  top: "⬆️",
  bottom: "⬇️",
  vers: "↕️",
  side: "◐",
};

const ROLE_COLORS: Record<string, string> = {
  top: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  bottom: "bg-pink-500/15 text-pink-300 border-pink-500/20",
  vers: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  side: "bg-slate-400/15 text-slate-300 border-slate-400/20",
};

function isUrgentIntent(intent: string): boolean {
  return ["right now", "tonight"].includes(intent.toLowerCase());
}

function intentLabel(intent: string): { text: string; emoji: string } {
  switch (intent.toLowerCase()) {
    case "right now":
      return { text: "Right Now", emoji: "🔥" };
    case "tonight":
      return { text: "Tonight", emoji: "🌙" };
    default:
      return { text: "", emoji: "" };
  }
}

export default function ProfileCard({
  id,
  display_name,
  role,
  intent,
  age,
  looking_now,
  photo_url,
  className,
}: ProfileCardProps) {
  const urgent = isUrgentIntent(intent);
  const label = intentLabel(intent);

  return (
    <Link
      href={`/profile/${id}`}
      className={cn(
        "relative overflow-hidden rounded-2xl block w-full aspect-[3/4] card-themed",
        className
      )}
    >
      {/* Background Image */}
      {photo_url ? (
        <img
          src={photo_url}
          alt={display_name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full bg-surface flex items-center justify-center">
          <span className="text-4xl font-bold text-white/20">
            {display_name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {/* Glass gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,4,18,0.88)] via-[rgba(8,4,18,0.22)] to-transparent" />

      {/* Urgent intent badge — top right */}
      {urgent && looking_now && (
        <div className="absolute top-2 right-2 z-10">
          <span className="tag-urgent px-2.5 py-1 text-[10px] tracking-wide flex items-center gap-1">
            {label.emoji} {label.text}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 pt-6 flex flex-col justify-end">
        {/* Name & Age */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-white tracking-tight leading-none drop-shadow-md">
            {display_name}
          </span>
          <span className="text-sm font-medium text-white/60">{age}</span>
        </div>
        {/* Role chip */}
        <div className="mt-1.5">
          <span className={cn(
            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize tracking-wide border",
            ROLE_COLORS[role] || "bg-white/10 text-white/60 border-white/10"
          )}>
            {ROLE_EMOJI[role]} {role}
          </span>
        </div>
      </div>
    </Link>
  );
}
