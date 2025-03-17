create table public.profiles (
  id uuid not null,
  nickname text null,
  birth_date date null,
  gender text null,
  created_at timestamp with time zone not null default now(),
  occupation text null,
  location text null,
  hobby text null,
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;