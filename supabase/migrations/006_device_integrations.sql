create table if not exists erp_device_mappings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references garud_tenants(id),
  vehicle_number text not null,
  provider text not null,
  device_type text not null,
  device_id text,
  imei text,
  sim_number text,
  camera_channels text,
  status text not null default 'pending',
  last_seen_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists erp_device_mappings_tenant_id_idx
  on erp_device_mappings(tenant_id);

create index if not exists erp_device_mappings_vehicle_number_idx
  on erp_device_mappings(vehicle_number);

alter table if exists erp_integrations
  add column if not exists tenant_id uuid references garud_tenants(id),
  add column if not exists auth_type text,
  add column if not exists credential_reference text,
  add column if not exists webhook_url text,
  add column if not exists health_status text default 'not_checked';

create index if not exists erp_integrations_tenant_id_idx
  on erp_integrations(tenant_id);
