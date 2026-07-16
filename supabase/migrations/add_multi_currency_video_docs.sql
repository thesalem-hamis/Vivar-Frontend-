-- Add multi-currency price fields
alter table properties add column if not exists price_usd numeric default null;
alter table properties add column if not exists price_eur numeric default null;

-- Change documents to text array for multiple selections
alter table properties add column if not exists documents_list text[] default '{}';

-- Add video URL field
alter table properties add column if not exists video_url text default null;
