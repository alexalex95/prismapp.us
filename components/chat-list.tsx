"use client";

import Link from "next/link";
import { demoConversations, getLastMessage, timeAgo } from "@/lib/demo-data";

export default function ChatList() {
  const sorted = [...demoConversations].sort((a, b) => {
    const aTime = new Date(getLastMessage(a).created_at).getTime();
    const bTime = new Date(getLastMessage(b).created_at).getTime();
    return bTime - aTime;
  });

  return (
    <div>
      {sorted.map((conv, i) => {
        const last = getLastMessage(conv);
        const isFromMe = last.sender === "me";

        return (
          <Link
            key={conv.id}
            href={`/chat/${conv.id}`}
            className="flex items-center gap-3.5 px-4 py-3.5 transition-colors duration-100 active:bg-elevated min-h-[64px]"
            style={{ animation: `fade-in 0.2s ease-out ${i * 0.04}s both` }}
          >
            {/* Avatar with presence */}
            <div className="relative flex-shrink-0">
              <img
                src={conv.profile.photo_url}
                alt={conv.profile.display_name}
                className="h-12 w-12 rounded-full object-cover"
              />
              {conv.profile.looking_now && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-mint ring-2 ring-base" />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[14px] font-semibold text-primary truncate">
                  {conv.profile.display_name}
                </span>
                <span className="text-[10px] text-tertiary flex-shrink-0">
                  {timeAgo(last.created_at)}
                </span>
              </div>
              <p className="text-[13px] text-secondary truncate mt-0.5 leading-snug">
                {isFromMe && <span className="text-tertiary">You: </span>}
                {last.content}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
