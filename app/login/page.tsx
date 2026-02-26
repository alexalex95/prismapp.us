"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import PrismLogo from "@/components/prism-logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password) {
      try {
        const res = await fetch("/api/auth/demo-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          if (typeof window !== "undefined") {
            localStorage.setItem("activeProfileId", "user-alex95");
          }
          window.location.href = "/home";
          return;
        } else {
          setError(data.error || "Invalid credentials");
          setLoading(false);
          return;
        }
      } catch {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    }

    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setSent(true);
      }
    } else {
      setError("Supabase is not configured. Redirecting to demo mode...");
      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px]" />

      {/* Logo mark */}
      <div className="flex flex-col items-center gap-2 mb-8 relative z-10" style={{ animation: "scale-in 0.35s ease-out" }}>
        <PrismLogo size={56} />
        <span
          className="text-[28px] font-display font-black tracking-tight"
          style={{
            background: "linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 60%, #6d28d9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          prism
        </span>
      </div>

      <div className="w-full max-w-sm relative z-10 glass p-8 rounded-3xl shadow-2xl shadow-black/20 border border-white/10" style={{ animation: "scale-in 0.4s ease-out" }}>
        <div className="space-y-2 mb-8 text-center">
          <h1 className="text-2xl font-display font-black tracking-tight text-white">
            Find your people.
          </h1>
          <p className="text-text-secondary text-sm font-medium">No games. Just vibes.</p>
        </div>

        {sent ? (
          <div className="space-y-6 text-center" style={{ animation: "fade-in 0.3s ease-out" }}>
            <div className="w-16 h-16 bg-status-online rounded-full flex items-center justify-center mx-auto shadow-lg shadow-status-online/30">
              <svg className="w-8 h-8 text-base" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-white">Check your inbox</p>
              <p className="text-text-secondary text-sm">
                We sent a magic link to<br />
                <span className="text-white font-semibold">{email}</span>
              </p>
            </div>
            <button
              onClick={() => setSent(false)}
              className="text-sm font-bold text-accent hover:text-white transition-colors"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or username"
                className="block w-full rounded-2xl bg-black/20 px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all border border-white/5 hover:bg-black/30"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (optional)"
                className="block w-full rounded-2xl bg-black/20 px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all border border-white/5 hover:bg-black/30"
              />
            </div>
            {error && <p className="text-sm font-bold text-status-busy text-center bg-status-busy/10 py-2 rounded-lg">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-accent px-5 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                password ? "Log In" : "Log In"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
