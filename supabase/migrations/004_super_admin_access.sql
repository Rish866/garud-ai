create table if not exists garud_super_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  password_hash text not null,
  status text not null default 'active',
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists garud_super_users_email_idx on garud_super_users(email);
