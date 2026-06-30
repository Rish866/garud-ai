create extension if not exists pgcrypto;

create table if not exists garud_tenants (
  id uuid primary key default gen_random_uuid(),
  tenant_code text unique not null,
  company_name text not null,
  transporter_type text not null default 'fleet_owner',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists garud_customer_users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references garud_tenants(id) on delete cascade,
  email text unique not null,
  full_name text not null,
  role text not null default 'owner',
  password_hash text not null,
  status text not null default 'active',
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists garud_customer_users_tenant_id_idx on garud_customer_users(tenant_id);
create index if not exists garud_customer_users_email_idx on garud_customer_users(email);

alter table if exists vehicles add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists drivers add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists customers add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists trips add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists invoices add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists payments add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists fuel_logs add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_action_log add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_issues add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_documents add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_maintenance_jobs add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_tyre_records add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_trip_expenses add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_driver_settlements add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_billing_packs add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_safety_events add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_video_requests add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_route_plans add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_report_exports add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_module_records add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_notifications add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_approvals add column if not exists tenant_id uuid references garud_tenants(id);
alter table if exists erp_integrations add column if not exists tenant_id uuid references garud_tenants(id);
