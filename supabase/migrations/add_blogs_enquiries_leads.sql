-- BLOGS
create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  body text not null,
  image_url text,
  cta_label text,
  cta_url text,
  published boolean default false,
  created_at timestamptz default now()
);

-- GENERAL ENQUIRIES
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  property_type text,
  created_at timestamptz default now()
);

-- PROPERTY-SPECIFIC ENQUIRIES
create table if not exists property_enquiries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete set null,
  property_title text,
  first_name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

-- LEADS (guide downloads)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  mailchimp_synced boolean default false,
  created_at timestamptz default now()
);

-- RLS: allow public inserts, admin reads
alter table blogs enable row level security;
alter table enquiries enable row level security;
alter table property_enquiries enable row level security;
alter table leads enable row level security;

create policy "Public read published blogs" on blogs for select using (published = true);
create policy "Admin all blogs" on blogs for all using (auth.uid() in (select user_id from admin_users));

create policy "Public insert enquiries" on enquiries for insert with check (true);
create policy "Admin read enquiries" on enquiries for select using (auth.uid() in (select user_id from admin_users));
create policy "Admin delete enquiries" on enquiries for delete using (auth.uid() in (select user_id from admin_users));

create policy "Public insert property_enquiries" on property_enquiries for insert with check (true);
create policy "Admin read property_enquiries" on property_enquiries for select using (auth.uid() in (select user_id from admin_users));
create policy "Admin delete property_enquiries" on property_enquiries for delete using (auth.uid() in (select user_id from admin_users));

create policy "Public insert leads" on leads for insert with check (true);
create policy "Admin read leads" on leads for select using (auth.uid() in (select user_id from admin_users));
create policy "Admin delete leads" on leads for delete using (auth.uid() in (select user_id from admin_users));
