alter table if exists garud_tenants
  add column if not exists logo_url text,
  add column if not exists brand_color text default '#22d3ee',
  add column if not exists portal_title text,
  add column if not exists enabled_modules jsonb not null default '[]'::jsonb,
  add column if not exists workflow_template text not null default 'standard_tms';
