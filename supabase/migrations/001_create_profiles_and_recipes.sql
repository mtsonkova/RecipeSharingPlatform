-- ============================================
-- Migration: Create profiles and recipes tables
-- ============================================

-- PROFILES TABLE
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique not null,
  fullname text,
  email text,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger function to update updated_at timestamp
create or replace function public.set_current_timestamp_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at on profiles
drop trigger if exists set_timestamp_on_profiles on public.profiles;

create trigger set_timestamp_on_profiles
before update on public.profiles
for each row
execute procedure public.set_current_timestamp_updated_at();

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- RLS Policies for profiles

-- Anyone can read profiles
create policy "Profiles are viewable by everyone"
on public.profiles
for select
using (true);

-- Users can insert their own profile
create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- ============================================

-- RECIPES TABLE
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  ingredients text not null,
  instructions text not null,
  cooking_time int,
  difficulty text,
  category text
);

-- Enable RLS on recipes
alter table public.recipes enable row level security;

-- RLS Policies for recipes

-- Everyone can read recipes (public by default)
create policy "Anyone can view public recipes"
on public.recipes
for select
using (true);

-- Authenticated users can insert recipes for themselves
create policy "Users can insert their own recipes"
on public.recipes
for insert
with check (auth.uid() = user_id);

-- Owners can update their recipes
create policy "Users can update their own recipes"
on public.recipes
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Owners can delete their recipes
create policy "Users can delete their own recipes"
on public.recipes
for delete
using (auth.uid() = user_id);
