-- Universal GARUD AI ERP module layer.
-- Run this after 001_transport_erp_backbone.sql.

create extension if not exists pgcrypto;

create table if not exists erp_module_records (
  id uuid primary key default gen_random_uuid(),
  module_key text not null,
  record_type text not null default 'record',
  title text not null,
  party text,
  vehicle_label text,
  driver_label text,
  amount numeric default 0,
  priority text not null default 'normal',
  status text not null default 'open',
  due_date date,
  notes text,
  created_by text default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp_notifications (
  id uuid primary key default gen_random_uuid(),
  module_key text not null,
  title text not null,
  message text,
  severity text not null default 'info',
  href text not null,
  status text not null default 'unread',
  created_at timestamptz not null default now()
);

create table if not exists erp_approvals (
  id uuid primary key default gen_random_uuid(),
  module_key text not null,
  approval_type text not null,
  reference_label text not null,
  requested_by text default 'admin',
  approver text,
  amount numeric default 0,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

create table if not exists erp_integrations (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  category text not null,
  status text not null default 'planned',
  api_base_url text,
  last_sync_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('erp-documents', 'erp-documents', false)
on conflict (id) do nothing;

alter table erp_module_records enable row level security;
alter table erp_notifications enable row level security;
alter table erp_approvals enable row level security;
alter table erp_integrations enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_module_records'
      and policyname = 'authenticated manage erp module records'
  ) then
    create policy "authenticated manage erp module records"
      on erp_module_records for all to authenticated using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_notifications'
      and policyname = 'authenticated manage erp notifications'
  ) then
    create policy "authenticated manage erp notifications"
      on erp_notifications for all to authenticated using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_approvals'
      and policyname = 'authenticated manage erp approvals'
  ) then
    create policy "authenticated manage erp approvals"
      on erp_approvals for all to authenticated using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'erp_integrations'
      and policyname = 'authenticated manage erp integrations'
  ) then
    create policy "authenticated manage erp integrations"
      on erp_integrations for all to authenticated using (true) with check (true);
  end if;
end $$;

insert into erp_module_records
  (module_key, record_type, title, party, vehicle_label, amount, priority, status, due_date, notes)
values
  ('fastag-management', 'transaction', 'Wrong FASTag deduction review', 'FASTag provider', 'MH04XY5678', 1280, 'high', 'open', current_date + 1, 'Verify toll plaza, trip, and vehicle-wise toll cost.'),
  ('spare-parts', 'stock', 'Brake pad minimum stock alert', 'Fleet Care Parts', null, 18400, 'high', 'open', current_date + 3, 'Create purchase request before workshop shortage.'),
  ('purchase-module', 'approval', 'Tyre purchase approval', 'Highway Tyres', 'MH12PQ7890', 74000, 'medium', 'pending', current_date + 2, 'PO and GRN required after owner approval.'),
  ('vendor-management', 'vendor', 'Workshop vendor rating review', 'Shree Motors', null, 0, 'normal', 'open', current_date + 7, 'Review downtime, bill accuracy, and SLA.'),
  ('fleet-brokerage', 'commission', 'Broker commission settlement', 'Raj Roadlines Broker', null, 18500, 'medium', 'pending', current_date + 5, 'Attached vehicle commission for Jaipur-Delhi lane.'),
  ('claims-incidents', 'claim', 'Cargo damage claim evidence', 'FreshRoute Cold Chain', 'RJ14BT4501', 56000, 'critical', 'open', current_date + 1, 'Attach POD photos, video evidence, FIR if applicable.'),
  ('business-rules', 'rule', 'Block dispatch for expired documents', 'Operations', null, 0, 'critical', 'active', current_date, 'Rule should prevent trip assignment when permit or FC is expired.'),
  ('integrations', 'integration', 'Tally sync setup', 'Accounts', null, 0, 'medium', 'planned', current_date + 10, 'Map invoices, payments, GST, and ledgers.')
on conflict do nothing;
