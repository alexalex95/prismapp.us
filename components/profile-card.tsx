"use client";

import Link from "next/link";

type ProfileCardProps = {
  id: string;
  display_name: string;
  role: string;
  intent: string;
  age: number;
  looking_now: boolean;
  photo_url?: string;
};

export default function ProfileCard({
  id,
  display_name,
  role,
  age,
  looking_now,
  photo_url,
}: ProfileCardProps) {
  return (
    <Link
      href={`/profile/${id}`}
      className="group relative overflow-hidden rounded-3xl block cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Photo — fills card, 3:4 ratio */}
      <div className="aspect-[3/4] relative">
        {photo_url ? (
          <img
            src={photo_url}
            alt={display_name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-surface via-elevated to-surface flex items-center justify-center">
            <span className="text-4xl font-display font-bold text-text-tertiary opacity-50">
              {display_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
      </div>

      {/* Role badge — top left */}
      <div className="absolute top-2 left-2">
        <span className="glass px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/90 shadow-sm border border-white/10">
          {role}
        </span>
      </div>

      {/* Status dot — top right */}
      {looking_now && (
        <span
          className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-status-online shadow-[0_0_10px_rgba(46,229,157,0.6)] animate-pulse-glow"
        />
      )}

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
        <div className="flex items-end gap-1.5">
          <span className="text-base font-display font-bold text-white block leading-tight truncate drop-shadow-md">
            {display_name}
          </span>
          <span className="text-xs font-medium text-white/80 mb-0.5 drop-shadow-md">{age}</span>
        </div>
      </div>
    </Link>
  );
}
