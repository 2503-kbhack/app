create table public."Diaries" (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  "Author_id" uuid not null,
  contents text null,
  title text null,
  constraint Diaries_pkey primary key (id),
  constraint Diaries_Author_id_fkey foreign KEY ("Author_id") references auth.users (id),
  constraint Diaries_title_check check ((length(title) <= 20))
) TABLESPACE pg_default;