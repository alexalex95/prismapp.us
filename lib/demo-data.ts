/**
 * Demo seed data for development.
 * Remove this file once real users exist.
 */

export type DemoProfile = {
  id: string;
  display_name: string;
  role: string;
  intent: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  looking_now: boolean;
  photo_url: string;
  photos: string[];
  bio: string;
  distance: string;
};

// Custom "DL" Discreet placeholder path
const DL_PLACEHOLDER = "/dl_placeholder.png";

// Reliable masculine Unsplash IDs:
// 1506794778202-cad84cf45f1d (Man face)
// 1500648767791-00dcc994a43e (Man face)
// 1539571696357-5a69c17a67c6 (Man)
// 1492562080023-ab3db95bfbce (Man)
// 1519085360753-af0119f7cbe7 (Man suit)
// 1507003211169-0a1dd7228f2d (Man)
// 1504257432389-52343af06ae3 (Man)

export const demoProfiles: DemoProfile[] = [
  {
    id: "demo-1",
    display_name: "Marco",
    role: "top",
    intent: "right now",
    age: 28,
    height: 185,
    weight: 88,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1067&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1067&fit=crop"
    ],
    bio: "6'1. Training. Into fitness and outdoors.",
    distance: "0.3 mi",
  },
  {
    id: "demo-2",
    display_name: "DL",
    role: "bottom",
    intent: "tonight",
    age: 25,
    height: 175,
    weight: 70,
    looking_now: true,
    photo_url: DL_PLACEHOLDER,
    photos: [DL_PLACEHOLDER],
    bio: "Discreet only. No pic no chat.",
    distance: "0.5 mi",
  },
  {
    id: "demo-3",
    display_name: "Jordan",
    role: "vers",
    intent: "right now",
    age: 31,
    height: 183,
    weight: 82,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&h=1067&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1067&fit=crop"
    ],
    bio: "Full body. Hosting in Midtown.",
    distance: "0.7 mi",
  },
  {
    id: "demo-4",
    display_name: "Andre",
    role: "side",
    intent: "dating",
    age: 41,
    height: 178,
    weight: 75,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1067&fit=crop"
    ],
    bio: "Looking for meaningful connections.",
    distance: "1.2 mi",
  },
  {
    id: "demo-5",
    display_name: "Kai",
    role: "top",
    intent: "tonight",
    age: 24,
    height: 188,
    weight: 85,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1067&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1067&fit=crop"
    ],
    bio: "Shirtless. Gym rat. 6'2.",
    distance: "0.9 mi",
  },
  {
    id: "demo-6",
    display_name: "Dex",
    role: "vers",
    intent: "right now",
    age: 33,
    height: 176,
    weight: 72,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&h=1067&fit=crop"
    ],
    bio: "Midtown. Can travel.",
    distance: "1.5 mi",
  },
  {
    id: "demo-7",
    display_name: "Nico",
    role: "bottom",
    intent: "dating",
    age: 22,
    height: 170,
    weight: 65,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1067&fit=crop"
    ],
    bio: "New in town. Show me the best spots.",
    distance: "2.1 mi",
  },
  {
    id: "demo-8",
    display_name: "DL_Discreet",
    role: "top",
    intent: "right now",
    age: 36,
    height: 182,
    weight: 88,
    looking_now: true,
    photo_url: DL_PLACEHOLDER,
    photos: [DL_PLACEHOLDER],
    bio: "Married, DL. Total privacy.",
    distance: "0.4 mi",
  },
  {
    id: "demo-9",
    display_name: "Rafe",
    role: "vers",
    intent: "tonight",
    age: 29,
    height: 179,
    weight: 77,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1067&fit=crop"
    ],
    bio: "Active lifestyle. DM me.",
    distance: "0.6 mi",
  },
  {
    id: "demo-10",
    display_name: "Soren",
    role: "top",
    intent: "right now",
    age: 26,
    height: 185,
    weight: 80,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1067&fit=crop"
    ],
    bio: "Can host. Clean and discreet.",
    distance: "0.2 mi",
  },
  {
    id: "demo-11",
    display_name: "Ezra",
    role: "bottom",
    intent: "right now",
    age: 23,
    height: 168,
    weight: 60,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1067&fit=crop"
    ],
    bio: "Slim. Ready now.",
    distance: "0.8 mi",
  },
  {
    id: "demo-12",
    display_name: "Dante",
    role: "top",
    intent: "dating",
    age: 34,
    height: 190,
    weight: 95,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1067&fit=crop"
    ],
    bio: "Looking for someone shared weekends.",
    distance: "3.0 mi",
  },
  {
    id: "demo-13",
    display_name: "Jace",
    role: "vers",
    intent: "friends",
    age: 27,
    height: 177,
    weight: 73,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&h=1067&fit=crop"
    ],
    bio: "New here. Need gym buddies.",
    distance: "1.8 mi",
  },
  {
    id: "demo-14",
    display_name: "Cole",
    role: "bottom",
    intent: "tonight",
    age: 30,
    height: 174,
    weight: 68,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1067&fit=crop"
    ],
    bio: "Free after 10.",
    distance: "1.1 mi",
  },
  {
    id: "demo-15",
    display_name: "DL_Guy",
    role: "side",
    intent: "right now",
    age: 38,
    height: 178,
    weight: 80,
    looking_now: true,
    photo_url: DL_PLACEHOLDER,
    photos: [DL_PLACEHOLDER],
    bio: "DL. Prompt.",
    distance: "0.5 mi",
  },
  {
    id: "demo-16",
    display_name: "Felix",
    role: "vers",
    intent: "right now",
    age: 21,
    height: 172,
    weight: 66,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1067&fit=crop"
    ],
    bio: "Young, fit. Hosting now.",
    distance: "0.1 mi",
  },
  {
    id: "demo-17",
    display_name: "Oscar",
    role: "top",
    intent: "friends",
    age: 45,
    height: 186,
    weight: 92,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1067&fit=crop"
    ],
    bio: "Into active friends.",
    distance: "4.2 mi",
  },
  {
    id: "demo-18",
    display_name: "Milo",
    role: "bottom",
    intent: "right now",
    age: 26,
    height: 173,
    weight: 69,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1067&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1067&fit=crop"
    ],
    bio: "Hosting tonight. East side.",
    distance: "0.3 mi",
  },
];

// ── Conversations ──
export type DemoMessage = {
  id: string;
  sender: "me" | "them";
  content: string;
  created_at: string;
};

export type DemoConversation = {
  id: string;
  profile: DemoProfile;
  messages: DemoMessage[];
};

function minutesAgo(m: number): string {
  return new Date(Date.now() - m * 60 * 1000).toISOString();
}

export const demoConversations: DemoConversation[] = [
  {
    id: "conv-1",
    profile: demoProfiles[0],
    messages: [
      { id: "m1", sender: "them", content: "Hey", created_at: minutesAgo(45) },
      { id: "m2", sender: "me", content: "Hey, what's up?", created_at: minutesAgo(43) },
      { id: "m3", sender: "them", content: "Free right now?", created_at: minutesAgo(40) },
      { id: "m4", sender: "me", content: "Yeah where are you", created_at: minutesAgo(38) },
      { id: "m5", sender: "them", content: "Downtown. Can host", created_at: minutesAgo(35) },
      { id: "m6", sender: "me", content: "Send the addy", created_at: minutesAgo(2) },
    ],
  },
  {
    id: "conv-2",
    profile: demoProfiles[2],
    messages: [
      { id: "m7", sender: "them", content: "What neighborhood?", created_at: minutesAgo(120) },
      { id: "m8", sender: "me", content: "Midtown, you?", created_at: minutesAgo(118) },
      { id: "m9", sender: "them", content: "East side. 10 min", created_at: minutesAgo(115) },
      { id: "m10", sender: "me", content: "What are you into?", created_at: minutesAgo(110) },
      { id: "m11", sender: "them", content: "Just vibes. Hosting?", created_at: minutesAgo(60) },
    ],
  },
  {
    id: "conv-3",
    profile: demoProfiles[4],
    messages: [
      { id: "m12", sender: "them", content: "Still around?", created_at: minutesAgo(180) },
      { id: "m13", sender: "me", content: "Yeah what's good", created_at: minutesAgo(175) },
      { id: "m14", sender: "them", content: "Tryna link tonight", created_at: minutesAgo(170) },
    ],
  },
  {
    id: "conv-4",
    profile: demoProfiles[5],
    messages: [
      { id: "m15", sender: "me", content: "Hey, saw you're nearby", created_at: minutesAgo(300) },
      { id: "m16", sender: "them", content: "Yeah I'm around. Pics?", created_at: minutesAgo(295) },
      { id: "m17", sender: "me", content: "Check my profile", created_at: minutesAgo(290) },
      { id: "m18", sender: "them", content: "Nice. Free later?", created_at: minutesAgo(285) },
    ],
  },
  {
    id: "conv-5",
    profile: demoProfiles[1],
    messages: [
      { id: "m19", sender: "them", content: "Hey handsome", created_at: minutesAgo(15) },
      { id: "m20", sender: "me", content: "Hey what's up", created_at: minutesAgo(12) },
      { id: "m21", sender: "them", content: "Looking for tonight. You?", created_at: minutesAgo(10) },
    ],
  },
];

// ── Current user (single profile, no switching) ──
export const currentUser = {
  id: "user-me",
  display_name: "Alex",
  role: "vers",
  intent: "friends",
  age: 27,
  looking_now: true,
  bio: "Just vibing. Let's see what happens.",
  photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=520&fit=crop",
};

// ── Helpers ──
export function timeAgo(isoString: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60) return "now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function getLastMessage(conv: DemoConversation): DemoMessage {
  return conv.messages[conv.messages.length - 1];
}
