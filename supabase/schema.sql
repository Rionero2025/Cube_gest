create extension if not exists pgcrypto;

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  ragione_sociale text not null,
  partita_iva text,
  codice_fiscale text,
  telefono text,
  email text,
  status text not null default 'IN_PROVA',
  plan_name text not null default 'Free',
  created_at timestamptz not null default now()
);

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete set null,
  username text not null unique,
  email text unique,
  password_hash text not null,
  nome text not null,
  cognome text,
  ruolo text not null,
  status text not null default 'ATTIVO',
  created_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  price_monthly numeric not null default 0,
  max_users integer not null,
  max_clients integer not null,
  max_contracts integer not null,
  features jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null unique references public.tenants(id) on delete cascade,
  plan_id uuid not null references public.plans(id) on delete restrict,
  status text not null default 'IN_PROVA',
  started_at timestamptz not null default now(),
  trial_ends_at timestamptz
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  ragione_sociale text not null,
  partita_iva text,
  codice_fiscale text,
  telefono text,
  email text,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  title text not null,
  total_net numeric not null default 0,
  vat_rate numeric not null default 22,
  status text not null default 'BOZZA',
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  total_amount numeric not null default 0,
  status text not null default 'DA_PAGARE',
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  number text,
  total_amount numeric not null default 0,
  status text not null default 'Bozza',
  created_at timestamptz not null default now()
);

create table if not exists public.work_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  title text not null,
  file_url text,
  created_at timestamptz not null default now()
);

alter table public.tenants enable row level security;
alter table public.app_users enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.clients enable row level security;
alter table public.contracts enable row level security;
alter table public.payments enable row level security;
alter table public.invoices enable row level security;
alter table public.work_logs enable row level security;
alter table public.documents enable row level security;
