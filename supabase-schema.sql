-- Run in Supabase: SQL Editor → New query → paste → Run
-- Then add env vars to .env.local and Vercel (see .env.example)

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('Oversized Tees', 'Jerseys')),
  price_inr integer not null check (price_inr > 0),
  description text not null default '',
  highlights jsonb not null default '[]'::jsonb,
  rating numeric not null default 4.5,
  review_count integer not null default 0,
  badge text,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Public catalog read (anon key used by storefront)
create policy "products_select_public"
  on public.products for select
  using (true);

-- Writes use SUPABASE_SERVICE_ROLE_KEY from your API route (bypasses RLS).

create index if not exists products_slug_idx on public.products (slug);

-- Profiles table for user roles
create table if not exists public.profiles (
  id uuid references auth.users(id) primary key,
  email text not null,
  full_name text,
  phone text,
  addresses jsonb not null default '[]'::jsonb,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- Admins can read all profiles
create policy "profiles_select_admin"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Users can insert their own profile
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Trigger to create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
