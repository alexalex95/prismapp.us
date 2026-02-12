"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
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
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-primary-start/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-accent-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "-3s" }} />

      <div className="w-full max-w-sm relative z-10 glass p-8 rounded-3xl shadow-2xl shadow-black/20 border border-white/10" style={{ animation: "scale-in 0.4s ease-out" }}>
        <div className="space-y-4 mb-8 text-center">
          <h1 className="text-4xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end drop-shadow-sm">
            Get in.<br />Get close.
          </h1>
          <p className="text-text-secondary text-base font-medium">No games. Just vibes.</p>
        </div>

        {sent ? (
          <div className="space-y-6 text-center" style={{ animation: "fade-in 0.3s ease-out" }}>
            <div className="w-16 h-16 bg-gradient-to-br from-status-online to-teal-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-status-online/30">
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
              className="text-sm font-bold text-accent-primary hover:text-white transition-colors"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="block w-full rounded-2xl bg-black/20 px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-start/50 transition-all border border-white/5 hover:bg-black/30"
              />
            </div>
            {error && <p className="text-sm font-bold text-status-busy text-center bg-status-busy/10 py-2 rounded-lg">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-primary-start to-primary-end px-5 py-4 text-base font-bold text-white shadow-lg shadow-primary-start/25 hover:shadow-primary-start/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send me a magic link"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
