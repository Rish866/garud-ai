create table if not exists erp_accounting_entries (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references garud_tenants(id),
  entry_date date not null default current_date,
  entry_type text not null,
  voucher_no text,
  party_name text,
  ledger_name text,
  item_name text,
  quantity numeric default 0,
  unit text,
  rate numeric default 0,
  amount numeric not null default 0,
  tax_amount numeric default 0,
  payment_mode text,
  bank_name text,
  reference_no text,
  status text not null default 'open',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists erp_inventory_items (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references garud_tenants(id),
  item_name text not null,
  sku text,
  category text,
  unit text not null default 'bag',
  opening_stock numeric default 0,
  current_stock numeric default 0,
  purchase_rate numeric default 0,
  selling_rate numeric default 0,
  reorder_level numeric default 0,
  location text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create index if not exists erp_accounting_entries_tenant_id_idx on erp_accounting_entries(tenant_id);
create index if not exists erp_accounting_entries_entry_type_idx on erp_accounting_entries(entry_type);
create index if not exists erp_inventory_items_tenant_id_idx on erp_inventory_items(tenant_id);
