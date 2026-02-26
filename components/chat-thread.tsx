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
    <div className={`flex flex-col gap-1 max-w-[75%] ${isMe ? "self-end items-end" : "self-start items-start"}`}>
      {messages.map((msg, i) => (
        <div
          key={msg.id}
          className={`px-4 py-3 text-[15px] leading-relaxed tracking-wide ${isMe
            ? "bg-gradient-to-br from-[#FF5C8D] to-[#8E5CF4] text-white rounded-[16px]"
            : "bg-[#25232C] text-white rounded-[16px]"
            }`}
        >
          {msg.content}
        </div>
      ))}
      <span
        className="text-[10px] text-text-tertiary px-1 opacity-60"
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

  const demoConv = demoConversations.find((c) => c.id === conversationId);
  const otherProfile: DemoProfile | undefined =
    demoConv?.profile ||
    (otherProfileId ? demoProfiles.find((p) => p.id === otherProfileId) : undefined);

  const [messages, setMessages] = useState<DemoMessage[]>(demoConv?.messages ?? []);
  const [input, setInput] = useState("");
  const [supabaseReady, setSupabaseReady] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadSupabaseMessages = useCallback(async () => {
    if (conversationId.startsWith("conv-") || conversationId.startsWith("local-")) return;

    try {
      const supabase = createClient();
      if (!supabase) return;

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
      // Supabase tables may not exist yet
    }
  }, [conversationId]);

  useEffect(() => {
    loadSupabaseMessages();
  }, [loadSupabaseMessages]);

  useEffect(() => {
    if (!supabaseReady && !conversationId.match(/^[0-9a-f-]{36}$/)) return;

    const supabase = createClient();
    if (!supabase) return;

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
        <p className="text-text-secondary">Conversation not found</p>
      </div>
    );
  }

  const displayProfile = otherProfile || demoConv!.profile;

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

    setMessages((prev) => [
      ...prev,
      { id: tempId, sender: "me", content, created_at: now },
    ]);
    setInput("");

    if (supabaseReady || conversationId.match(/^[0-9a-f-]{36}$/)) {
      try {
        const supabase = createClient();
        if (!supabase) return;

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

        await supabase
          .from("conversations")
          .update({
            last_message_at: now,
            last_message_preview: content.slice(0, 100),
          })
          .eq("id", conversationId);

        if (data) {
          setMessages((prev) =>
            prev.map((m) => (m.id === tempId ? { ...m, id: data.id } : m))
          );
        }
      } catch {
        // Message stays in local state
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-base">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center gap-3 px-4 pt-12 pb-3 bg-base/90 backdrop-blur-xl border-b border-white/5 z-20">
        <Link href="/chat" className="flex items-center justify-center h-10 w-10 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>

        <img
          src={displayProfile.photo_url}
          alt={displayProfile.display_name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
        />

        <div className="flex-1 min-w-0">
          <h2 className="text-[16px] font-bold text-white leading-tight">
            {displayProfile.display_name}
          </h2>
          <div className="flex items-center gap-1.5 h-4">
            {displayProfile.looking_now && (
              <span className="h-1.5 w-1.5 rounded-full bg-status-online shadow-[0_0_5px_rgba(46,229,157,0.5)]" />
            )}
            <span className="text-[12px] font-medium text-text-secondary truncate">
              {displayProfile.looking_now ? "Online" : "Away"}
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center opacity-50">
            <span className="text-4xl mb-2">👋</span>
            <p className="text-text-tertiary text-[14px]">Start the conversation...</p>
          </div>
        )}
        {groups.map((group, i) => (
          <MessageGroup key={i} messages={group.messages} isMe={group.sender === "me"} />
        ))}
        <div ref={bottomRef} className="h-1" />
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 px-3 py-3 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-surface/80 backdrop-blur-xl border-t border-white/5">
        <form onSubmit={handleSend} className="flex items-center gap-2">

          {/* Quick Actions */}
          <button type="button" className="p-2.5 rounded-full bg-elevated text-accent hover:bg-white/10 transition-colors active:scale-95">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button type="button" className="p-2.5 rounded-full bg-elevated text-accent hover:bg-white/10 transition-colors active:scale-95">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-elevated px-4 py-3 text-[16px] text-white placeholder-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
          />

          {input.trim() && (
            <button
              type="submit"
              className="p-2.5 rounded-full bg-accent text-white transition-all hover:bg-accent-hover active:scale-95 animate-in fade-in zoom-in"
            >
              <svg className="w-5 h-5 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
