-- Run this once in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste this -> Run)

create table if not exists site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table site_content enable row level security;

-- Drop old policies if this script has been run before (safe to re-run)
drop policy if exists "Public can read site content" on site_content;
drop policy if exists "Public can upsert site content" on site_content;
drop policy if exists "Public can update site content" on site_content;
drop policy if exists "Authenticated users can insert site content" on site_content;
drop policy if exists "Authenticated users can update site content" on site_content;

-- Anyone can read site content (so the live site loads for all visitors)
create policy "Public can read site content"
  on site_content for select
  using (true);

-- Only signed-in admins (via Supabase Auth) can write. This replaces the
-- earlier "anyone with the anon key can write" policy now that real auth
-- exists — writes require a valid logged-in session, not just the key.
create policy "Authenticated users can insert site content"
  on site_content for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update site content"
  on site_content for update
  to authenticated
  using (true);

-- Seed the initial rows with the site's current default content
insert into site_content (key, value) values
  ('projects', '[
    {"title":"Cinematic Wedding Film","category":"Video Editing","description":"A breathtaking wedding video with cinematic color grading and emotional storytelling.","tag":"Video","icon":"Film","color":"from-red-500/20 to-orange-500/20","iconColor":"text-red-400"},
    {"title":"E-Commerce Platform","category":"Web Development","description":"Full-stack online store with payment integration and inventory management.","tag":"Web","icon":"Globe","color":"from-purple-500/20 to-pink-500/20","iconColor":"text-purple-400"},
    {"title":"School Security System","category":"Cyber Safety","description":"Complete cybersecurity infrastructure for an educational institution.","tag":"Security","icon":"Shield","color":"from-green-500/20 to-emerald-500/20","iconColor":"text-green-400"},
    {"title":"Brand Social Campaign","category":"Social Media","description":"Viral social media campaign that increased engagement by 300%.","tag":"Marketing","icon":"Megaphone","color":"from-yellow-500/20 to-amber-500/20","iconColor":"text-yellow-400"},
    {"title":"Product Launch Video","category":"Video Editing","description":"Dynamic product showcase with motion graphics and 3D animations.","tag":"Video","icon":"Film","color":"from-red-500/20 to-orange-500/20","iconColor":"text-red-400"},
    {"title":"Restaurant Website","category":"Web Development","description":"Beautiful website with online ordering and table reservation system.","tag":"Web","icon":"Globe","color":"from-purple-500/20 to-pink-500/20","iconColor":"text-purple-400"}
  ]'::jsonb),
  ('team', '[
    {"name":"Rawo","role":"Video Editing Lead","description":"Master of cinematic storytelling and post-production wizardry.","icon":"Video","gradient":"from-red-500 to-orange-500"},
    {"name":"Talhew","role":"Cyber Safety Expert","description":"Guardian of digital security and threat prevention specialist.","icon":"Shield","gradient":"from-green-500 to-emerald-500"},
    {"name":"Uzains","role":"IT Consultant","description":"Hardware and software troubleshooting maestro.","icon":"Code","gradient":"from-blue-500 to-cyan-500"},
    {"name":"Abi","role":"Web Developer","description":"Crafting beautiful, responsive websites that convert.","icon":"PenTool","gradient":"from-purple-500 to-pink-500"},
    {"name":"Rehan","role":"Web Developer","description":"Full-stack developer with a passion for e-commerce solutions.","icon":"Code","gradient":"from-violet-500 to-purple-500"},
    {"name":"Few","role":"Social Media Manager","description":"Strategic content creator and brand growth specialist.","icon":"Camera","gradient":"from-yellow-500 to-amber-500"},
    {"name":"Ari","role":"Marketing Strategist","description":"Creative campaign designer with viral marketing expertise.","icon":"BarChart","gradient":"from-teal-500 to-green-500"},
    {"name":"Faz","role":"Content Creator","description":"Visual storyteller with a keen eye for engaging content.","icon":"Camera","gradient":"from-pink-500 to-rose-500"}
  ]'::jsonb),
  ('stats', '[
    {"number":"50+","label":"Projects Done"},
    {"number":"30+","label":"Happy Clients"},
    {"number":"6","label":"Services"},
    {"number":"24/7","label":"Support"}
  ]'::jsonb),
  ('social', '{"instagram":"","linkedin":""}'::jsonb)
on conflict (key) do nothing;
