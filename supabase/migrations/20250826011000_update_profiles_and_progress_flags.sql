alter table profiles add column if not exists preferred_language text;
alter table profiles add column if not exists proficiency_level text;
alter table profiles add column if not exists learning_goals text[];

alter table user_progress add column if not exists watched_video boolean default false;
alter table user_progress add column if not exists viewed_materials boolean default false;
alter table user_progress add column if not exists read_transcript boolean default false;
alter table user_progress add column if not exists practiced_script boolean default false;
alter table user_progress add column if not exists practiced_open boolean default false;