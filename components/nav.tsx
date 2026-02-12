"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/home", label: "Nearby" },
  { href: "/chat", label: "Chat" },
  { href: "/profile", label: "You" },
] as const;

function GridIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-6 h-6 transition-transform duration-300" viewBox="0 0 24 24" fill={filled ? "url(#grad-icon)" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={2}>
      <defs>
        <linearGradient id="grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6EC4" />
          <stop offset="100%" stopColor="#FF9E80" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
    </svg>
  );
}

function ChatIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-6 h-6 transition-transform duration-300" viewBox="0 0 24 24" fill={filled ? "url(#grad-icon)" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
    </svg>
  );
}

function UserIcon({ filled }: { filled: boolean }) {
  return (
    <svg className="w-6 h-6 transition-transform duration-300" viewBox="0 0 24 24" fill={filled ? "url(#grad-icon)" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

const iconMap: Record<string, (filled: boolean) => React.ReactNode> = {
  "/home": (f) => <GridIcon filled={f} />,
  "/chat": (f) => <ChatIcon filled={f} />,
  "/profile": (f) => <UserIcon filled={f} />,
};

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pointer-events-none">
      <div className="mx-auto max-w-[280px] pointer-events-auto">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-purple-900/20">
          {tabs.map(({ href, label }) => {
            const active = pathname === href || (href !== "/profile" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`group flex flex-col items-center justify-center gap-1 transition-all duration-300 ${active ? "-translate-y-1" : "hover:-translate-y-0.5"
                  }`}
              >
                <div className={`relative ${active ? "animate-[bounce_0.5s_infinite]" : ""}`}>
                  {iconMap[href](active)}
                  {active && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-primary-start to-primary-end" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
