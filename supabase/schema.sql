-- BlanketWise Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- =============================================================================
-- PROFILES TABLE (extends auth.users)
-- =============================================================================
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  location_lat decimal,
  location_lng decimal,
  location_name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- =============================================================================
-- USER SETTINGS TABLE (flattened for easier queries)
-- =============================================================================
create table user_settings (
  user_id uuid references auth.users on delete cascade primary key,
  use_feels_like boolean default true,
  rain_priority boolean default true,
  exercise_adjustment boolean default true,
  temp_buffer integer default 0,
  liner_include_in_recommendations boolean default true,
  liner_show_combined_weight boolean default true,
  notifications_blanket_change boolean default true,
  notifications_severe_weather boolean default true,
  notifications_daily_summary boolean default false,
  show_confidence boolean default false,
  current_blanket_id uuid,  -- Stores the user's currently selected blanket for UI
  location_lat decimal,
  location_lng decimal,
  location_name text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- =============================================================================
-- HORSES TABLE
-- =============================================================================
create table horses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  breed text,
  age integer,
  coat_growth integer default 50,
  cold_tolerance integer default 50,
  is_clipped boolean default false,
  is_senior boolean default false,
  is_thin_keeper boolean default false,
  is_foal boolean default false,
  shelter_access text default 'run-in',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- =============================================================================
-- BLANKETS TABLE
-- =============================================================================
create table blankets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  grams integer default 0,
  waterproof boolean default true,
  color text default '#9CAF88',
  currently_on_horse_id uuid references horses(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- =============================================================================
-- LINERS TABLE
-- =============================================================================
create table liners (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  grams integer default 100,
  color text default '#E8D4C4',
  paired_with_blanket_id uuid references blankets(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- =============================================================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================================================
alter table profiles enable row level security;
alter table user_settings enable row level security;
alter table horses enable row level security;
alter table blankets enable row level security;
alter table liners enable row level security;

-- =============================================================================
-- RLS POLICIES - PROFILES
-- =============================================================================
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- =============================================================================
-- RLS POLICIES - USER SETTINGS
-- =============================================================================
create policy "Users can view own settings"
  on user_settings for select
  using (auth.uid() = user_id);

create policy "Users can update own settings"
  on user_settings for update
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on user_settings for insert
  with check (auth.uid() = user_id);

-- =============================================================================
-- RLS POLICIES - HORSES
-- =============================================================================
create policy "Users can view own horses"
  on horses for select
  using (auth.uid() = user_id);

create policy "Users can insert own horses"
  on horses for insert
  with check (auth.uid() = user_id);

create policy "Users can update own horses"
  on horses for update
  using (auth.uid() = user_id);

create policy "Users can delete own horses"
  on horses for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- RLS POLICIES - BLANKETS
-- =============================================================================
create policy "Users can view own blankets"
  on blankets for select
  using (auth.uid() = user_id);

create policy "Users can insert own blankets"
  on blankets for insert
  with check (auth.uid() = user_id);

create policy "Users can update own blankets"
  on blankets for update
  using (auth.uid() = user_id);

create policy "Users can delete own blankets"
  on blankets for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- RLS POLICIES - LINERS
-- =============================================================================
create policy "Users can view own liners"
  on liners for select
  using (auth.uid() = user_id);

create policy "Users can insert own liners"
  on liners for insert
  with check (auth.uid() = user_id);

create policy "Users can update own liners"
  on liners for update
  using (auth.uid() = user_id);

create policy "Users can delete own liners"
  on liners for delete
  using (auth.uid() = user_id);

-- =============================================================================
-- FUNCTION: Auto-create profile and settings on signup
-- =============================================================================
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));

  insert into user_settings (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

-- =============================================================================
-- TRIGGER: On auth user created
-- =============================================================================
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- =============================================================================
-- FUNCTION: Auto-update updated_at timestamp
-- =============================================================================
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =============================================================================
-- TRIGGERS: Auto-update updated_at
-- =============================================================================
create trigger set_profiles_updated_at
  before update on profiles
  for each row execute procedure handle_updated_at();

create trigger set_user_settings_updated_at
  before update on user_settings
  for each row execute procedure handle_updated_at();

create trigger set_horses_updated_at
  before update on horses
  for each row execute procedure handle_updated_at();

create trigger set_blankets_updated_at
  before update on blankets
  for each row execute procedure handle_updated_at();

create trigger set_liners_updated_at
  before update on liners
  for each row execute procedure handle_updated_at();

-- =============================================================================
-- ENABLE REALTIME (run these in Supabase Dashboard > Database > Replication)
-- Or use the SQL below if your Supabase version supports it:
-- =============================================================================
-- alter publication supabase_realtime add table horses;
-- alter publication supabase_realtime add table blankets;
-- alter publication supabase_realtime add table liners;
-- alter publication supabase_realtime add table user_settings;
