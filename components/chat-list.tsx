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
    <div className="divide-y divide-white/5">
      {sorted.map((conv, i) => {
        const last = getLastMessage(conv);
        const isFromMe = last.sender === "me";

        return (
          <Link
            key={conv.id}
            href={`/chat/${conv.id}`}
            className="flex items-center gap-4 px-5 h-[80px] transition-all duration-200 active:bg-white/5 hover:bg-white/5"
            style={{ animation: `fade-in 0.3s ease-out ${i * 0.05}s both` }}
          >
            {/* Avatar with presence */}
            <div className="relative flex-shrink-0">
              <img
                src={conv.profile.photo_url}
                alt={conv.profile.display_name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/5"
              />
              {conv.profile.looking_now && (
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-status-online ring-2 ring-base shadow-[0_0_8px_rgba(46,229,157,0.5)]" />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-bold text-white truncate">
                  {conv.profile.display_name}
                </span>
                <span className="text-[11px] font-medium text-text-tertiary flex-shrink-0">
                  {timeAgo(last.created_at)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-text-secondary truncate leading-snug max-w-[85%] opacity-80">
                  {isFromMe && <span className="text-text-tertiary">You: </span>}
                  {last.content}
                </p>
                {/* Optional: Unread count badge could go here */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
