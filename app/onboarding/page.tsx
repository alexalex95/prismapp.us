"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ROLES = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "vers", label: "Vers" },
  { value: "side", label: "Side" },
] as const;

const INTENTS = [
  { value: "right now", label: "Right now", desc: "Looking to meet ASAP" },
  { value: "tonight", label: "Tonight", desc: "Making plans for later" },
  { value: "dating", label: "Dates", desc: "Just want to talk" },
  { value: "friends", label: "Friends", desc: "Keeping it platonic" },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ role: "", intent: "", display_name: "", age: "" });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleFinish() {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Not authenticated"); setLoading(false); return; }

    const { error: profileError } = await supabase.from("profiles").upsert({ id: user.id, email: user.email! });
    if (profileError) { setError(profileError.message); setLoading(false); return; }

    const { error: miniError } = await supabase.from("mini_profiles").insert({
      user_id: user.id, display_name: form.display_name, role: form.role,
      intent: form.intent, bio: "", age: parseInt(form.age, 10),
    });
    if (miniError) { setError(miniError.message); setLoading(false); return; }
    router.push("/home");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-base">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-primary-start/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-accent-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "-2s" }} />

      {/* Progress */}
      <div className="fixed top-safe-top left-0 right-0 flex justify-center gap-2 pt-4 z-20">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-500 ease-spring ${s === step ? "w-8 bg-gradient-to-r from-primary-start to-primary-end shadow-[0_0_10px_rgba(255,110,196,0.5)]" : s < step ? "w-2 bg-text-secondary" : "w-2 bg-white/10"
              }`}
          />
        ))}
      </div>

      <div className="w-full max-w-sm relative z-10">
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300" key="step1">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Your role?
              </h1>
              <p className="text-text-secondary text-base">You can change this anytime.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => { update("role", r.value); setTimeout(() => setStep(2), 150); }}
                  className={`rounded-2xl py-6 text-center text-lg font-bold transition-all duration-200 active:scale-95 border ${form.role === r.value
                      ? "bg-gradient-to-br from-primary-start to-primary-end text-white border-transparent shadow-lg shadow-primary-start/30 scale-105"
                      : "glass text-text-primary hover:bg-white/10 border-white/5"
                    }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300" key="step2">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                What's the vibe?
              </h1>
              <p className="text-text-secondary text-base">What are you looking for right now?</p>
            </div>
            <div className="space-y-3">
              {INTENTS.map((i) => (
                <button
                  key={i.value}
                  onClick={() => { update("intent", i.value); setTimeout(() => setStep(3), 150); }}
                  className={`w-full rounded-2xl px-6 py-5 text-left transition-all duration-200 active:scale-[0.98] border group ${form.intent === i.value
                      ? "bg-gradient-to-r from-status-online/20 to-teal-500/20 border-status-online/50 shadow-[0_0_20px_rgba(46,229,157,0.2)]"
                      : "glass hover:bg-white/5 border-white/5"
                    }`}
                >
                  <span className={`text-lg font-bold block group-hover:text-white transition-colors ${form.intent === i.value ? "text-status-online" : "text-text-primary"}`}>
                    {i.label}
                  </span>
                  <span className="text-sm text-text-secondary font-medium">{i.desc}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="w-full text-center text-sm font-bold text-text-tertiary hover:text-white transition-colors">Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300" key="step3">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Almost there
              </h1>
              <p className="text-text-secondary text-base">What should we call you?</p>
            </div>
            <div className="space-y-4">
              <input
                type="text" required maxLength={30} value={form.display_name}
                onChange={(e) => update("display_name", e.target.value)}
                placeholder="Display name"
                className="block w-full rounded-2xl bg-black/20 px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-start/50 transition-all border border-white/5 hover:bg-black/30 text-lg font-medium"
              />
              <input
                type="number" required min={18} max={99} value={form.age}
                onChange={(e) => update("age", e.target.value)}
                placeholder="Age"
                className="block w-full rounded-2xl bg-black/20 px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-start/50 transition-all border border-white/5 hover:bg-black/30 text-lg font-medium"
              />
            </div>
            {error && <p className="text-sm font-bold text-status-busy text-center bg-status-busy/10 py-2 rounded-lg">{error}</p>}
            <button
              onClick={handleFinish}
              disabled={loading || !form.display_name || !form.age}
              className="w-full rounded-2xl bg-gradient-to-r from-primary-start to-primary-end px-5 py-4 text-lg font-bold text-white shadow-lg shadow-primary-start/25 hover:shadow-primary-start/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Setting up...
                </span>
              ) : (
                "Let's go"
              )}
            </button>
            <button onClick={() => setStep(2)} className="w-full text-center text-sm font-bold text-text-tertiary hover:text-white transition-colors">Back</button>
          </div>
        )}
      </div>
    </div>
  );
}
