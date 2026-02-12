-- ============================================================
-- Hookup App MVP — Database Schema
-- Run this against your Supabase SQL editor
-- ============================================================

-- 1. Profiles (one per auth user)
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can read own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- 2. Mini-profiles (multiple per user)
create table if not exists mini_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  display_name text not null,
  role text not null check (role in ('top', 'bottom', 'vers', 'side')),
  intent text not null check (intent in ('right now', 'tonight', 'dating', 'friends', 'networking')),
  bio text default '',
  age integer not null check (age >= 18 and age <= 99),
  distance_visibility text not null default 'approximate' check (distance_visibility in ('exact', 'approximate', 'hidden')),
  looking_now boolean not null default true,
  active boolean not null default true,
  default_visible_roles text[] not null default '{}',
  default_intents text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table mini_profiles enable row level security;

create policy "Users can read all mini profiles"
  on mini_profiles for select using (true);

create policy "Users can insert own mini profiles"
  on mini_profiles for insert with check (auth.uid() = user_id);

create policy "Users can update own mini profiles"
  on mini_profiles for update using (auth.uid() = user_id);

create policy "Users can delete own mini profiles"
  on mini_profiles for delete using (auth.uid() = user_id);

-- 3. Mini-profile photos
create table if not exists mini_profile_photos (
  id uuid primary key default gen_random_uuid(),
  mini_profile_id uuid not null references mini_profiles(id) on delete cascade,
  photo_url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table mini_profile_photos enable row level security;

create policy "Anyone can view photos"
  on mini_profile_photos for select using (true);

create policy "Users can insert own photos"
  on mini_profile_photos for insert
  with check (
    exists (
      select 1 from mini_profiles
      where mini_profiles.id = mini_profile_id
        and mini_profiles.user_id = auth.uid()
    )
  );

create policy "Users can delete own photos"
  on mini_profile_photos for delete
  using (
    exists (
      select 1 from mini_profiles
      where mini_profiles.id = mini_profile_id
        and mini_profiles.user_id = auth.uid()
    )
  );

-- 4. Conversations (with last_message tracking)
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  profile_a_id uuid not null references mini_profiles(id) on delete cascade,
  profile_b_id uuid not null references mini_profiles(id) on delete cascade,
  last_message_at timestamptz default now(),
  last_message_preview text default '',
  created_at timestamptz not null default now(),
  constraint unique_conversation unique (profile_a_id, profile_b_id)
);

create index if not exists idx_conversations_last_message on conversations(last_message_at desc);

alter table conversations enable row level security;

create policy "Users can read own conversations"
  on conversations for select
  using (
    exists (
      select 1 from mini_profiles
      where mini_profiles.user_id = auth.uid()
        and mini_profiles.id in (profile_a_id, profile_b_id)
    )
  );

create policy "Users can create conversations"
  on conversations for insert
  with check (
    exists (
      select 1 from mini_profiles
      where mini_profiles.user_id = auth.uid()
        and mini_profiles.id in (profile_a_id, profile_b_id)
    )
  );

create policy "Users can update own conversations"
  on conversations for update
  using (
    exists (
      select 1 from mini_profiles
      where mini_profiles.user_id = auth.uid()
        and mini_profiles.id in (profile_a_id, profile_b_id)
    )
  );

-- 5. Messages (with read receipts)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_profile_id uuid not null references mini_profiles(id) on delete cascade,
  content text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_conversation on messages(conversation_id, created_at asc);

alter table messages enable row level security;

create policy "Users can read messages in own conversations"
  on messages for select
  using (
    exists (
      select 1 from conversations
      join mini_profiles on mini_profiles.id in (conversations.profile_a_id, conversations.profile_b_id)
      where conversations.id = messages.conversation_id
        and mini_profiles.user_id = auth.uid()
    )
  );

create policy "Users can send messages in own conversations"
  on messages for insert
  with check (
    exists (
      select 1 from mini_profiles
      where mini_profiles.id = sender_profile_id
        and mini_profiles.user_id = auth.uid()
    )
    and exists (
      select 1 from conversations
      join mini_profiles on mini_profiles.id in (conversations.profile_a_id, conversations.profile_b_id)
      where conversations.id = conversation_id
        and mini_profiles.user_id = auth.uid()
    )
  );

-- 6. Storage bucket for profile photos
insert into storage.buckets (id, name, public)
values ('profile-photos', 'profile-photos', true)
on conflict (id) do nothing;

create policy "Anyone can view profile photos"
  on storage.objects for select
  using (bucket_id = 'profile-photos');

create policy "Authenticated users can upload photos"
  on storage.objects for insert
  with check (bucket_id = 'profile-photos' and auth.role() = 'authenticated');

create policy "Users can delete own photos"
  on storage.objects for delete
  using (bucket_id = 'profile-photos' and auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================================
-- Migration: Add columns if they don't exist (safe to re-run)
-- ============================================================
-- ALTER TABLE mini_profiles ADD COLUMN IF NOT EXISTS default_visible_roles text[] NOT NULL DEFAULT '{}';
-- ALTER TABLE mini_profiles ADD COLUMN IF NOT EXISTS default_intents text[] NOT NULL DEFAULT '{}';
-- ALTER TABLE conversations ADD COLUMN IF NOT EXISTS last_message_at timestamptz DEFAULT now();
-- ALTER TABLE conversations ADD COLUMN IF NOT EXISTS last_message_preview text DEFAULT '';
-- ALTER TABLE messages ADD COLUMN IF NOT EXISTS read_at timestamptz;

-- Enable realtime on messages table
alter publication supabase_realtime add table messages;
