-- MiMa core schema for one store.
-- The 4×35 / 140-shelf seed below is a placeholder. Public geometry lives in
-- src/data/store-layout.ts. Exact inventory is OPEN.
-- Apply when a Supabase project is connected. Not wired at runtime yet.
-- Interval: half-open [start_date, end_date).

create extension if not exists btree_gist;

create type public.booking_status as enum (
  'draft',
  'pending_payment',
  'confirmed',
  'cancelled',
  'expired'
);

create type public.payment_status as enum ('unpaid', 'paid', 'refunded');

create type public.seller_status as enum ('active', 'suspended');

create type public.product_status as enum (
  'draft',
  'active',
  'sold',
  'removed',
  'expired'
);

create type public.product_category as enum (
  'mode',
  'accessoires',
  'wohnen',
  'buecher',
  'sonstiges'
);

create type public.payout_status as enum ('pending', 'approved', 'completed');

create type public.user_role as enum ('seller', 'employee', 'admin');

create type public.sale_payment_method as enum ('cash', 'card', 'other');

create type public.sale_source as enum ('manual', 'pos');

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city text not null,
  timezone text not null default 'Europe/Berlin'
);

create table public.store_settings (
  store_id uuid primary key references public.stores (id) on delete cascade,
  commission_bps integer not null default 0 check (commission_bps between 0 and 10000),
  barcode_prefix text not null default 'MM'
);

create table public.zones (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores (id) on delete cascade,
  code text not null,
  name text not null,
  sort_order integer not null,
  map_col integer not null default 0,
  map_row integer not null default 0,
  columns integer not null,
  rows integer not null,
  unique (store_id, code)
);

create table public.shelves (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores (id) on delete cascade,
  zone_id uuid not null references public.zones (id) on delete cascade,
  label text not null,
  grid_col integer not null,
  grid_row integer not null,
  size text not null default 'standard',
  active boolean not null default true,
  hint text,
  unique (store_id, label)
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'seller',
  display_name text,
  phone text
);

create table public.sellers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  email text unique not null,
  display_name text not null,
  phone text,
  status public.seller_status not null default 'active'
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers (id) on delete restrict,
  shelf_id uuid not null references public.shelves (id) on delete restrict,
  plan_id text not null,
  start_date date not null,
  end_date date not null,
  status public.booking_status not null default 'pending_payment',
  payment_status public.payment_status not null default 'unpaid',
  price_cents integer not null check (price_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_date < end_date)
);

-- Occupying bookings on the same shelf cannot overlap.
-- pending_payment is included so a hold blocks a second customer.
create index bookings_shelf_range_idx on public.bookings (shelf_id, start_date, end_date);

alter table public.bookings
  add constraint bookings_no_overlap
  exclude using gist (
    shelf_id with =,
    daterange(start_date, end_date, '[)') with &&
  )
  where (status in ('pending_payment', 'confirmed'));

create table public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers (id) on delete restrict,
  shelf_id uuid references public.shelves (id) on delete set null,
  title text not null,
  description text,
  category public.product_category not null,
  brand text,
  size text,
  price_cents integer not null check (price_cents >= 0),
  image_path text,
  barcode text unique not null,
  status public.product_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sales (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete restrict,
  seller_id uuid not null references public.sellers (id) on delete restrict,
  shelf_id uuid references public.shelves (id) on delete set null,
  gross_cents integer not null check (gross_cents >= 0),
  fee_cents integer not null check (fee_cents >= 0),
  seller_cents integer not null check (seller_cents >= 0),
  payment_method public.sale_payment_method not null,
  sold_at timestamptz not null default now(),
  employee_id uuid references public.profiles (id),
  source public.sale_source not null default 'manual',
  check (fee_cents + seller_cents = gross_cents)
);

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers (id) on delete restrict,
  amount_cents integer not null check (amount_cents >= 0),
  status public.payout_status not null default 'pending',
  period_start date not null,
  period_end date not null
);

-- ---------------------------------------------------------------------------
-- Seed: Lübeck + 4 zones × 35 shelves = 140
-- ---------------------------------------------------------------------------

insert into public.stores (id, slug, name, city, timezone)
values (
  '00000000-0000-4000-8000-000000000001',
  'luebeck',
  'MiMa Second Hand',
  'Lübeck',
  'Europe/Berlin'
);

insert into public.store_settings (store_id, commission_bps, barcode_prefix)
values ('00000000-0000-4000-8000-000000000001', 0, 'MM');

insert into public.zones (id, store_id, code, name, sort_order, map_col, map_row, columns, rows)
values
  ('00000000-0000-4000-8000-0000000000a1', '00000000-0000-4000-8000-000000000001', 'A', 'Zone A', 1, 0, 0, 7, 5),
  ('00000000-0000-4000-8000-0000000000b1', '00000000-0000-4000-8000-000000000001', 'B', 'Zone B', 2, 1, 0, 7, 5),
  ('00000000-0000-4000-8000-0000000000c1', '00000000-0000-4000-8000-000000000001', 'C', 'Zone C', 3, 0, 1, 7, 5),
  ('00000000-0000-4000-8000-0000000000d1', '00000000-0000-4000-8000-000000000001', 'D', 'Zone D', 4, 1, 1, 7, 5);

insert into public.shelves (store_id, zone_id, label, grid_col, grid_row)
select
  z.store_id,
  z.id,
  z.code || '-' || lpad(n::text, 2, '0'),
  (n - 1) % z.columns,
  (n - 1) / z.columns
from public.zones z
cross join generate_series(1, 35) as n;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.stores enable row level security;
alter table public.store_settings enable row level security;
alter table public.zones enable row level security;
alter table public.shelves enable row level security;
alter table public.profiles enable row level security;
alter table public.sellers enable row level security;
alter table public.bookings enable row level security;
alter table public.products enable row level security;
alter table public.sales enable row level security;
alter table public.payouts enable row level security;

create or replace function public.is_staff()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.role in ('admin', 'employee')
  );
$$;

create or replace function public.current_seller_id()
returns uuid
language sql
stable
as $$
  select s.id from public.sellers s where s.auth_user_id = auth.uid();
$$;

-- Public read of store geometry (no occupancy).
create policy stores_public_read on public.stores for select using (true);
create policy zones_public_read on public.zones for select using (true);
create policy shelves_public_read on public.shelves for select using (true);
create policy settings_staff_read on public.store_settings
  for select using (public.is_staff());

create policy sellers_self on public.sellers
  for select using (auth_user_id = auth.uid() or public.is_staff());

create policy bookings_self on public.bookings
  for select using (seller_id = public.current_seller_id() or public.is_staff());

create policy products_self on public.products
  for select using (seller_id = public.current_seller_id() or public.is_staff());

create policy products_self_write on public.products
  for all using (seller_id = public.current_seller_id() or public.is_staff())
  with check (seller_id = public.current_seller_id() or public.is_staff());

create policy sales_self on public.sales
  for select using (seller_id = public.current_seller_id() or public.is_staff());

create policy payouts_self on public.payouts
  for select using (seller_id = public.current_seller_id() or public.is_staff());

create policy profiles_self on public.profiles
  for select using (id = auth.uid() or public.is_staff());
