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
