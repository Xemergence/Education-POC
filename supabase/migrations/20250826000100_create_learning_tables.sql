create extension if not exists pgcrypto;

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level text,
  duration text,
  thumbnail text,
  instructor text,
  created_at timestamptz default now()
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  "order" int,
  video_url text,
  description text,
  transcript text,
  created_at timestamptz default now()
);

create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete cascade,
  title text,
  type text,
  url text,
  created_at timestamptz default now()
);

create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id uuid references lessons(id) on delete cascade,
  status text not null,
  last_viewed_at timestamptz default now(),
  unique (user_id, lesson_id)
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id uuid references lessons(id) on delete cascade,
  user_input text,
  model_response text,
  created_at timestamptz default now()
);

alter publication supabase_realtime add table courses;
alter publication supabase_realtime add table lessons;
alter publication supabase_realtime add table materials;
alter publication supabase_realtime add table user_progress;
alter publication supabase_realtime add table conversations;

with c as (
  insert into courses (title, description, level, duration, thumbnail, instructor)
  values (
    'Numbers 1–10',
    'Learn to count from 1 to 10 with pronunciation tips and simple practice.',
    'Beginner',
    '10m',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
    'Lingua Team'
  )
  on conflict do nothing
  returning id
), l as (
  insert into lessons (course_id, title, "order", video_url, description, transcript)
  select id,
    'Counting from 1 to 10',
    1,
    'https://www.youtube.com/watch?v=jzLAmPG22pE',
    'A short introduction to numbers one through ten with examples.',
    'Numbers and pronunciation:\n1 One (wʌn)\n2 Two (tuː)\n3 Three (θriː)\n4 Four (fɔːr)\n5 Five (faɪv)\n6 Six (sɪks)\n7 Seven (ˈsɛv.ən)\n8 Eight (eɪt)\n9 Nine (naɪn)\n10 Ten (tɛn)'
  from c
  returning id
)
insert into materials (lesson_id, title, type, url)
select id, 'Numbers 1–10 Worksheet', 'pdf', 'https://example.com/numbers-worksheet.pdf' from l;