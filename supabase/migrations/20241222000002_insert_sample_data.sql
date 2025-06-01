-- Insert user into auth.users first
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'alex.johnson@example.com',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{}',
  '{}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (id, name, email, avatar, level, cefr_level, level_number, streak, total_hours, join_date, user_id) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Alex Johnson', 'alex.johnson@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', 'Intermediate', 'B1-B2 CEFR', 4, 15, 42, '2023-03-01', '550e8400-e29b-41d4-a716-446655440000');

INSERT INTO language_stats (id, profile_id, english_fluency, english_vocabulary, english_grammar, english_pronunciation, spanish_fluency, spanish_vocabulary, spanish_grammar, spanish_pronunciation) VALUES
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 68, 72, 65, 70, 45, 52, 40, 48);

INSERT INTO recent_activities (id, profile_id, activity, date, duration, score) VALUES
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Business English Conversation', '2 hours ago', '25 min', 85),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Travel Vocabulary Practice', 'Yesterday', '15 min', 92),
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Grammar Challenge', '3 days ago', '20 min', 78),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'Pronunciation Exercise', '5 days ago', '10 min', 88);

INSERT INTO performance_data (id, profile_id, name, score) VALUES
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Week 1', 65),
('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Week 2', 68),
('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Week 3', 72),
('880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'Week 4', 75),
('880e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', 'Week 5', 70),
('880e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', 'Week 6', 78),
('880e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', 'Week 7', 82);

INSERT INTO upcoming_lessons (id, profile_id, title, date, duration) VALUES
('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Advanced Conversation Techniques', 'Tomorrow, 3:00 PM', '45 min'),
('990e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Idiomatic Expressions Workshop', 'Friday, 5:30 PM', '30 min');

INSERT INTO subscriptions (id, profile_id, plan, status, renewal_date, billing_cycle, next_payment, features) VALUES
('aa0e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Premium Plan', 'Active', 'June 15, 2023', 'Monthly', '$19.99', ARRAY['Unlimited AI conversation practice', 'All language topics access']);