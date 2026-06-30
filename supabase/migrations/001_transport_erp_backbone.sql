-- GARUD AI Transport ERP backbone
-- Run this in Supabase SQL editor before enabling full production workflows.

create extension if not exists pgcrypto;

create table if not exists erp_action_log (
  id uuid primary key default gen_random_uuid(),
  module_key text not null,
  module_title text not null,
  record_label text,
  action_type text not null,
  status text not null default 'open',
  note text,
  assigned_to text,
  created_by text default 'system',
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists erp_issues (
  id uuid primary key default gen_random_uuid(),
  module_key text not null,
  record_label text,
  severity text not null default 'medium',
  title text not null,
  description text,
  owner text,
  status text not null default 'open',
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp_documents (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id text,
  entity_label text not null,
  document_type text not null,
  document_number text,
  issue_date date,
  expiry_date date,
  file_url text,
  status text not null default 'pending',
  verified_by text,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists erp_maintenance_jobs (
  id uuid primary key default gen_random_uuid(),
  vehicle_label text not null,
  job_type text not null,
  issue text not null,
  priority text not null default 'medium',
  odometer_km numeric,
  estimated_cost numeric default 0,
  actual_cost numeric default 0,
  vendor_name text,
  status text not null default 'open',
  opened_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists erp_tyre_records (
  id uuid primary key default gen_random_uuid(),
  vehicle_label text not null,
  tyre_serial text not null,
  axle_position text not null,
  tread_percent numeric,
  pressure_psi numeric,
  cost numeric default 0,
  status text not null default 'active',
  next_action text,
  recorded_at timestamptz not null default now()
);

create table if not exists erp_trip_expenses (
  id uuid primary key default gen_random_uuid(),
  trip_label text not null,
  category text not null,
  amount numeric not null default 0,
  recoverable boolean not null default false,
  proof_url text,
  approval_status text not null default 'pending',
  approved_by text,
  created_at timestamptz not null default now()
);

create table if not exists erp_driver_settlements (
  id uuid primary key default gen_random_uuid(),
  driver_label text not null,
  period_label text not null,
  base_salary numeric not null default 0,
  trip_bata numeric not null default 0,
  advance_deduction numeric not null default 0,
  incentive numeric not null default 0,
  penalty numeric not null default 0,
  net_payable numeric generated always as
    (base_salary + trip_bata + incentive - advance_deduction - penalty) stored,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists erp_billing_packs (
  id uuid primary key default gen_random_uuid(),
  trip_label text not null,
  customer_label text not null,
  invoice_label text,
  includes_pod boolean not null default false,
  includes_gps boolean not null default false,
  includes_expenses boolean not null default false,
  includes_video boolean not null default false,
  status text not null default 'draft',
  share_url text,
  created_at timestamptz not null default now()
);

create table if not exists erp_safety_events (
  id uuid primary key default gen_random_uuid(),
  vehicle_label text not null,
  driver_label text,
  event_type text not null,
  severity text not null default 'medium',
  gps_location text,
  clip_url text,
  coaching_required boolean not null default false,
  status text not null default 'open',
  occurred_at timestamptz not null default now()
);

create table if not exists erp_video_requests (
  id uuid primary key default gen_random_uuid(),
  vehicle_label text not null,
  trip_label text,
  requested_by text not null,
  reason text not null,
  from_time timestamptz,
  to_time timestamptz,
  status text not null default 'requested',
  export_url text,
  created_at timestamptz not null default now()
);

create table if not exists erp_route_plans (
  id uuid primary key default gen_random_uuid(),
  lane_label text not null,
  origin text not null,
  destination text not null,
  planned_km numeric,
  planned_hours numeric,
  toll_estimate numeric default 0,
  fuel_estimate numeric default 0,
  risk_level text not null default 'normal',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists erp_report_exports (
  id uuid primary key default gen_random_uuid(),
  report_name text not null,
  module_key text,
  format text not null default 'csv',
  requested_by text default 'admin',
  status text not null default 'generated',
  created_at timestamptz not null default now()
);

alter table erp_action_log enable row level security;
alter table erp_issues enable row level security;
alter table erp_documents enable row level security;
alter table erp_maintenance_jobs enable row level security;
alter table erp_tyre_records enable row level security;
alter table erp_trip_expenses enable row level security;
alter table erp_driver_settlements enable row level security;
alter table erp_billing_packs enable row level security;
alter table erp_safety_events enable row level security;
alter table erp_video_requests enable row level security;
alter table erp_route_plans enable row level security;
alter table erp_report_exports enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_action_log'
      and policyname = 'authenticated read erp action log'
  ) then
    create policy "authenticated read erp action log"
      on erp_action_log for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_action_log'
      and policyname = 'authenticated write erp action log'
  ) then
    create policy "authenticated write erp action log"
      on erp_action_log for insert to authenticated with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_issues'
      and policyname = 'authenticated read erp issues'
  ) then
    create policy "authenticated read erp issues"
      on erp_issues for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_issues'
      and policyname = 'authenticated write erp issues'
  ) then
    create policy "authenticated write erp issues"
      on erp_issues for all to authenticated using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_documents'
      and policyname = 'authenticated read erp documents'
  ) then
    create policy "authenticated read erp documents"
      on erp_documents for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_documents'
      and policyname = 'authenticated write erp documents'
  ) then
    create policy "authenticated write erp documents"
      on erp_documents for all to authenticated using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_report_exports'
      and policyname = 'authenticated read erp reports'
  ) then
    create policy "authenticated read erp reports"
      on erp_report_exports for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_report_exports'
      and policyname = 'authenticated write erp reports'
  ) then
    create policy "authenticated write erp reports"
      on erp_report_exports for insert to authenticated with check (true);
  end if;
end $$;
