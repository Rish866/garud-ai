create table if not exists erp_stock_movements (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references garud_tenants(id),
  accounting_entry_id uuid references erp_accounting_entries(id) on delete cascade,
  inventory_item_id uuid references erp_inventory_items(id),
  item_name text not null,
  movement_type text not null,
  quantity numeric not null default 0,
  unit text,
  rate numeric default 0,
  amount numeric default 0,
  stock_after numeric,
  source_type text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists erp_ledger_postings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references garud_tenants(id),
  accounting_entry_id uuid references erp_accounting_entries(id) on delete cascade,
  entry_date date not null,
  voucher_no text,
  entry_type text not null,
  party_name text,
  ledger_name text not null,
  debit numeric not null default 0,
  credit numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists erp_stock_movements_tenant_id_idx on erp_stock_movements(tenant_id);
create index if not exists erp_stock_movements_entry_id_idx on erp_stock_movements(accounting_entry_id);
create index if not exists erp_ledger_postings_tenant_id_idx on erp_ledger_postings(tenant_id);
create index if not exists erp_ledger_postings_entry_id_idx on erp_ledger_postings(accounting_entry_id);
