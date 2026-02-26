"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/demo-data";

export default function EditProfilePage() {
  const router = useRouter();

  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    display_name: currentUser.display_name,
    bio: currentUser.bio,
    intent: currentUser.intent,
  });

  const handleSave = () => {
    router.back();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-base pb-24">
      <header className="sticky top-0 z-50 bg-base/90 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-white font-bold p-2 -ml-2">
          Cancel
        </button>
        <h1 className="text-[17px] font-bold text-white">Edit Profile</h1>
        <button onClick={handleSave} className="text-accent font-bold p-2 -mr-2">
          Done
        </button>
      </header>

      <div className="p-5 space-y-8">
        {/* Cover Photo */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest pl-1">
            Cover Photo
          </label>
          <div
            className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden bg-surface group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {coverPhoto || currentUser.photo_url ? (
              <img
                src={coverPhoto || currentUser.photo_url}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5">
                <span className="text-text-tertiary">No photo</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-xs font-bold text-white">Upload Photo</span>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>

        {/* Basic Fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest pl-1">Display Name</label>
            <input
              type="text"
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
              className="w-full bg-surface rounded-xl px-4 py-3 text-white font-bold border border-transparent focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-text-tertiary uppercase tracking-widest pl-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="w-full bg-surface rounded-xl px-4 py-3 text-white text-[15px] leading-relaxed border border-transparent focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
