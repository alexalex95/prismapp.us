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
  looking_now: boolean;
  photo_url: string;
  photos: string[];
  bio: string;
  distance: string;
};

export const demoProfiles: DemoProfile[] = [
  {
    id: "demo-1",
    display_name: "Marco",
    role: "top",
    intent: "right now",
    age: 28,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Downtown. Can host.",
    distance: "0.3 mi",
  },
  {
    id: "demo-2",
    display_name: "Luis",
    role: "bottom",
    intent: "tonight",
    age: 25,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "New in town. Show me around?",
    distance: "0.5 mi",
  },
  {
    id: "demo-3",
    display_name: "Jordan",
    role: "vers",
    intent: "right now",
    age: 31,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Hosting. Clean. HMU.",
    distance: "0.7 mi",
  },
  {
    id: "demo-4",
    display_name: "Andre",
    role: "side",
    intent: "dating",
    age: 41,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Good convo first, always.",
    distance: "1.2 mi",
  },
  {
    id: "demo-5",
    display_name: "Kai",
    role: "top",
    intent: "tonight",
    age: 24,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "6'2. Into masc guys.",
    distance: "0.9 mi",
  },
  {
    id: "demo-6",
    display_name: "Dex",
    role: "vers",
    intent: "right now",
    age: 33,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&h=800&fit=crop&crop=face",
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
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Let's get a drink first.",
    distance: "2.1 mi",
  },
  {
    id: "demo-8",
    display_name: "Ty",
    role: "top",
    intent: "right now",
    age: 36,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Discreet. No pic no chat.",
    distance: "0.4 mi",
  },
  {
    id: "demo-9",
    display_name: "Rafe",
    role: "vers",
    intent: "tonight",
    age: 29,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Fit. Vers. DM me.",
    distance: "0.6 mi",
  },
  {
    id: "demo-10",
    display_name: "Soren",
    role: "top",
    intent: "right now",
    age: 26,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Looking for right now. Can host.",
    distance: "0.2 mi",
  },
  {
    id: "demo-11",
    display_name: "Ezra",
    role: "bottom",
    intent: "right now",
    age: 23,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Slim. Smooth. Ready.",
    distance: "0.8 mi",
  },
  {
    id: "demo-12",
    display_name: "Dante",
    role: "top",
    intent: "dating",
    age: 34,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Looking for something real.",
    distance: "3.0 mi",
  },
  {
    id: "demo-13",
    display_name: "Jace",
    role: "vers",
    intent: "friends",
    age: 27,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Just moved here. Need friends.",
    distance: "1.8 mi",
  },
  {
    id: "demo-14",
    display_name: "Cole",
    role: "bottom",
    intent: "tonight",
    age: 30,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Free after 10. HMU.",
    distance: "1.1 mi",
  },
  {
    id: "demo-15",
    display_name: "River",
    role: "side",
    intent: "right now",
    age: 38,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Oral only. Can travel.",
    distance: "0.5 mi",
  },
  {
    id: "demo-16",
    display_name: "Felix",
    role: "vers",
    intent: "right now",
    age: 21,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Vers. Fit. Hosting now.",
    distance: "0.1 mi",
  },
  {
    id: "demo-17",
    display_name: "Oscar",
    role: "top",
    intent: "friends",
    age: 45,
    looking_now: false,
    photo_url: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Gym buddy? Hiking?",
    distance: "4.2 mi",
  },
  {
    id: "demo-18",
    display_name: "Milo",
    role: "bottom",
    intent: "right now",
    age: 26,
    looking_now: true,
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=533&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=800&fit=crop&crop=face",
    ],
    bio: "Can host. East side.",
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

// ── "My" profiles for profile switching ──
export type DemoMiniProfile = {
  id: string;
  display_name: string;
  role: string;
  intent: string;
  age: number;
  looking_now: boolean;
  bio: string;
  photo_url: string;
};

export const demoMyProfiles: DemoMiniProfile[] = [
  {
    id: "my-1",
    display_name: "Alex",
    role: "vers",
    intent: "dating",
    age: 27,
    looking_now: false,
    bio: "Just vibing. Let's see what happens.",
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=520&fit=crop&crop=face",
  },
  {
    id: "my-2",
    display_name: "A",
    role: "top",
    intent: "right now",
    age: 27,
    looking_now: true,
    bio: "Hosting tonight. DM me.",
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=520&fit=crop&crop=face",
  },
  {
    id: "my-3",
    display_name: "Alex_alt",
    role: "bottom",
    intent: "tonight",
    age: 27,
    looking_now: true,
    bio: "Looking for later tonight.",
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=520&fit=crop&crop=face",
  },
];

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
