create table if not exists public.municipalities (
  id bigint primary key,
  name text not null,
  department text,
  country char(2) not null default 'CO',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, department)
);

create table if not exists public.reports (
  id uuid primary key,
  user_id bigint not null,
  category text not null,
  reference text not null,
  description text not null,
  latitude double precision,
  longitude double precision,
  municipality_id bigint,
  status text not null default 'pending' check (status in ('pending', 'verified', 'discarded')),
  created_at timestamptz not null default now()
);

alter table public.reports
  add constraint reports_municipality_id_fkey
  foreign key (municipality_id) references public.municipalities(id);

alter table public.reports enable row level security;

create index if not exists reports_status_created_at_idx
  on public.reports (status, created_at desc);
