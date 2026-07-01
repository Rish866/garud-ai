alter table if exists garud_customer_users
  add column if not exists phone text,
  add column if not exists department text,
  add column if not exists branch text;

create index if not exists garud_customer_users_role_idx
  on garud_customer_users(role);

create index if not exists garud_customer_users_status_idx
  on garud_customer_users(status);

alter table if exists garud_customer_users
  drop constraint if exists garud_customer_users_role_check;

alter table if exists garud_customer_users
  add constraint garud_customer_users_role_check
  check (role in ('owner', 'admin', 'operations', 'finance', 'safety', 'viewer'));

alter table if exists garud_customer_users
  drop constraint if exists garud_customer_users_status_check;

alter table if exists garud_customer_users
  add constraint garud_customer_users_status_check
  check (status in ('active', 'inactive'));
