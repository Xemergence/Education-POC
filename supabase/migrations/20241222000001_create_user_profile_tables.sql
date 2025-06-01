CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  level TEXT,
  cefr_level TEXT,
  level_number INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  total_hours INTEGER DEFAULT 0,
  join_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS language_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  english_fluency INTEGER DEFAULT 0,
  english_vocabulary INTEGER DEFAULT 0,
  english_grammar INTEGER DEFAULT 0,
  english_pronunciation INTEGER DEFAULT 0,
  spanish_fluency INTEGER DEFAULT 0,
  spanish_vocabulary INTEGER DEFAULT 0,
  spanish_grammar INTEGER DEFAULT 0,
  spanish_pronunciation INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recent_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity TEXT NOT NULL,
  date TEXT,
  duration TEXT,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS upcoming_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS performance_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  plan TEXT,
  status TEXT,
  renewal_date TEXT,
  billing_cycle TEXT,
  next_payment TEXT,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_language_stats_profile_id ON language_stats(profile_id);
CREATE INDEX IF NOT EXISTS idx_recent_activities_profile_id ON recent_activities(profile_id);
CREATE INDEX IF NOT EXISTS idx_upcoming_lessons_profile_id ON upcoming_lessons(profile_id);
CREATE INDEX IF NOT EXISTS idx_performance_data_profile_id ON performance_data(profile_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_profile_id ON subscriptions(profile_id);

alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table language_stats;
alter publication supabase_realtime add table recent_activities;
alter publication supabase_realtime add table upcoming_lessons;
alter publication supabase_realtime add table performance_data;
alter publication supabase_realtime add table subscriptions;