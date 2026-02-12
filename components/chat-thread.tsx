"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  demoConversations,
  demoProfiles,
  timeAgo,
  type DemoMessage,
  type DemoProfile,
} from "@/lib/demo-data";

function MessageGroup({ messages, isMe }: { messages: DemoMessage[]; isMe: boolean }) {
  return (
    <div className={`flex flex-col gap-[2px] max-w-[75%] ${isMe ? "self-end items-end" : "self-start items-start"}`}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`px-3.5 py-2.5 text-[15px] leading-[1.4] ${
            isMe
              ? "bg-gradient-to-br from-accent to-[#6955E0] text-white rounded-[20px] rounded-br-[6px]"
              : "bg-surface text-primary rounded-[20px] rounded-bl-[6px]"
          }`}
        >
          {msg.content}
        </div>
      ))}
      <span
        className="text-[10px] text-tertiary mt-0.5 px-1"
        style={{ animation: "fade-in 0.3s ease-out" }}
      >
        {timeAgo(messages[messages.length - 1].created_at)}
      </span>
    </div>
  );
}

export default function ChatThread({ conversationId }: { conversationId: string }) {
  const searchParams = useSearchParams();
  const otherProfileId = searchParams.get("otherProfileId");

  // Find demo conversation or profile
  const demoConv = demoConversations.find((c) => c.id === conversationId);
  const otherProfile: DemoProfile | undefined =
    demoConv?.profile ||
    (otherProfileId ? demoProfiles.find((p) => p.id === otherProfileId) : undefined);

  const [messages, setMessages] = useState<DemoMessage[]>(demoConv?.messages ?? []);
  const [input, setInput] = useState("");
  const [supabaseReady, setSupabaseReady] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabaseRef = useRef(createClient());

  // Try loading messages from Supabase
  const loadSupabaseMessages = useCallback(async () => {
    // Only attempt if this looks like a real UUID conversation
    if (conversationId.startsWith("conv-") || conversationId.startsWith("local-")) return;

    try {
      const supabase = supabaseRef.current;
      const { data, error } = await supabase
        .from("messages")
        .select("id, content, sender_profile_id, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        const myProfileId = localStorage.getItem("activeProfileId") || "";
        const mapped: DemoMessage[] = data.map((m) => ({
          id: m.id,
          sender: m.sender_profile_id === myProfileId ? "me" : "them",
          content: m.content,
          created_at: m.created_at,
        }));
        setMessages(mapped);
        setSupabaseReady(true);
      }
    } catch {
      // Supabase tables may not exist yet — stay with demo data
    }
  }, [conversationId]);

  // Load on mount
  useEffect(() => {
    loadSupabaseMessages();
  }, [loadSupabaseMessages]);

  // Realtime subscription for Supabase conversations
  useEffect(() => {
    if (!supabaseReady && !conversationId.match(/^[0-9a-f-]{36}$/)) return;

    const supabase = supabaseRef.current;
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const msg = payload.new as { id: string; content: string; sender_profile_id: string; created_at: string };
          const myProfileId = localStorage.getItem("activeProfileId") || "";
          const newMsg: DemoMessage = {
            id: msg.id,
            sender: msg.sender_profile_id === myProfileId ? "me" : "them",
            content: msg.content,
            created_at: msg.created_at,
          };
          setMessages((prev) => {
            // Deduplicate (optimistic insert may already have it)
            if (prev.find((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabaseReady]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!otherProfile && !demoConv) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base">
        <p className="text-secondary">Conversation not found</p>
      </div>
    );
  }

  const displayProfile = otherProfile || demoConv!.profile;

  // Group consecutive messages by sender
  const groups: { sender: "me" | "them"; messages: DemoMessage[] }[] = [];
  messages.forEach((msg) => {
    const last = groups[groups.length - 1];
    if (last && last.sender === msg.sender) {
      last.messages.push(msg);
    } else {
      groups.push({ sender: msg.sender, messages: [msg] });
    }
  });

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const content = input.trim();
    const tempId = `m-${Date.now()}`;
    const now = new Date().toISOString();

    // Optimistic insert
    setMessages((prev) => [
      ...prev,
      { id: tempId, sender: "me", content, created_at: now },
    ]);
    setInput("");

    // Try persisting to Supabase
    if (supabaseReady || conversationId.match(/^[0-9a-f-]{36}$/)) {
      try {
        const supabase = supabaseRef.current;
        const myProfileId = localStorage.getItem("activeProfileId") || "";

        const { data } = await supabase
          .from("messages")
          .insert({
            conversation_id: conversationId,
            sender_profile_id: myProfileId,
            content,
          })
          .select("id")
          .single();

        // Update conversation last_message
        await supabase
          .from("conversations")
          .update({
            last_message_at: now,
            last_message_preview: content.slice(0, 100),
          })
          .eq("id", conversationId);

        // Replace temp ID with real ID
        if (data) {
          setMessages((prev) =>
            prev.map((m) => (m.id === tempId ? { ...m, id: data.id } : m))
          );
        }
      } catch {
        // Message stays in local state even if Supabase fails
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-base">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center gap-3 px-4 pt-12 pb-3 bg-base/80 backdrop-blur-xl border-b border-line">
        <Link href="/chat" className="flex items-center justify-center h-9 w-9 -ml-1 min-w-[44px] min-h-[44px]">
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>

        <img
          src={displayProfile.photo_url}
          alt={displayProfile.display_name}
          className="h-9 w-9 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-semibold text-primary leading-tight">
            {displayProfile.display_name}
          </h2>
          <div className="flex items-center gap-1.5">
            {displayProfile.looking_now && (
              <span className="h-[5px] w-[5px] rounded-full bg-mint" />
            )}
            <span className="text-[11px] text-secondary">
              {displayProfile.looking_now ? "Available now" : displayProfile.role}
              {"distance" in displayProfile && ` · ${displayProfile.distance}`}
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-tertiary text-[14px]">Say something...</p>
          </div>
        )}
        {groups.map((group, i) => (
          <MessageGroup key={i} messages={group.messages} isMe={group.sender === "me"} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 px-4 py-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-base/80 backdrop-blur-xl border-t border-line">
        <form onSubmit={handleSend} className="flex items-center gap-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            className="flex-1 rounded-full bg-surface px-4 py-2.5 text-[15px] text-primary placeholder-tertiary focus:outline-none focus:ring-1 focus:ring-accent/30 min-h-[44px]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white transition-all disabled:opacity-20 active:scale-95 min-w-[44px] min-h-[44px]"
          >
            <svg className="w-[18px] h-[18px] translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
