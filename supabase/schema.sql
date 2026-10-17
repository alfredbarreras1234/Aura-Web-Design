create table reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 60),
  rating int not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 5 and 400),
  created_at timestamptz default now()
);
create table contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, subject text not null, message text not null,
  created_at timestamptz default now()
);
alter table reviews enable row level security;
alter table contacts enable row level security;
create policy "leer reseñas" on reviews for select using (true);
create policy "enviar reseñas" on reviews for insert with check (true);
create policy "enviar contacto" on contacts for insert with check (true);
alter publication supabase_realtime add table reviews;
