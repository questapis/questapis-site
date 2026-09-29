-- Phase 1.5 hardening: authority-bearing writes are atomic database functions.
-- Apply only to the isolated v2 staging project.

create table public.player_equipment (
  user_id uuid not null references auth.users on delete cascade,
  slot public.inventory_slot not null,
  item_id uuid not null references public.shop_items,
  equipped_at timestamptz not null default now(),
  primary key (user_id, slot)
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  body text not null check (char_length(body) between 1 and 2000),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.api_keys add column quota_limit integer not null default 1000 check (quota_limit > 0);
alter table public.profiles add column onboarding_path text check (onboarding_path in ('I have never coded before','I know a little coding','I want to learn APIs','I want to use APIs','I am building a project'));
alter table public.profiles add column onboarded_at timestamptz;
alter table public.api_usage add constraint api_usage_status_code_check check (status_code between 100 and 599);
alter table public.api_usage add constraint api_usage_latency_check check (latency_ms is null or latency_ms >= 0);
create index completions_user_completed_idx on public.completions(user_id, completed_at desc);
create index reward_ledger_user_created_idx on public.reward_ledger(user_id, created_at desc);
create index purchases_user_created_idx on public.purchases(user_id, created_at desc);
create index attempts_user_created_idx on public.attempts(user_id, created_at desc);

alter table public.regions enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_versions enable row level security;
alter table public.quest_definitions enable row level security;
alter table public.level_thresholds enable row level security;
alter table public.reward_rules enable row level security;
alter table public.achievement_definitions enable row level security;
alter table public.title_definitions enable row level security;
alter table public.shop_items enable row level security;
alter table public.plans enable row level security;
alter table public.entitlement_definitions enable row level security;
alter table public.plan_entitlements enable row level security;
alter table public.promotion_definitions enable row level security;
alter table public.promotion_redemptions enable row level security;
alter table public.api_products enable row level security;
alter table public.api_versions enable row level security;
alter table public.api_quota_windows enable row level security;
alter table public.feedback enable row level security;
alter table public.event_outbox enable row level security;
alter table public.player_equipment enable row level security;
alter table public.announcements enable row level security;

create policy "published regions are readable" on public.regions for select using (status = 'published');
create policy "published courses are readable" on public.courses for select using (status = 'published');
create policy "published lessons are readable" on public.lessons for select using (status = 'published');
create policy "published lesson versions are readable" on public.lesson_versions for select using (published_at is not null);
create policy "published quests are readable" on public.quest_definitions for select using (status = 'published');
create policy "level thresholds are readable" on public.level_thresholds for select using (true);
create policy "published achievements are readable" on public.achievement_definitions for select using (status = 'published');
create policy "titles are readable" on public.title_definitions for select using (true);
create policy "published shop items are readable" on public.shop_items for select using (status = 'published');
create policy "active api products are readable" on public.api_products for select using (status = 'active');
create policy "active api versions are readable" on public.api_versions for select using (active);
create policy "published announcements are readable" on public.announcements for select using (status = 'published' and published_at <= now());
create policy "equipment is self readable" on public.player_equipment for select using (auth.uid() = user_id);
create policy "quota is self readable" on public.api_quota_windows for select using (
  exists (select 1 from public.api_keys k where k.id = key_id and k.user_id = auth.uid())
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function public.touch_updated_at();
create trigger announcements_touch_updated_at before update on public.announcements
for each row execute function public.touch_updated_at();

create or replace function public.create_profile_for_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)), 40))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger auth_user_created after insert on auth.users
for each row execute function public.create_profile_for_user();

create or replace function public.complete_lesson(
  p_lesson_slug text,
  p_answers jsonb,
  p_request_key uuid
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_user uuid := auth.uid();
  v_lesson public.lessons%rowtype;
  v_version public.lesson_versions%rowtype;
  v_rule public.reward_rules%rowtype;
  v_attempt uuid;
  v_completion uuid;
  v_awarded boolean := false;
  v_profile public.profiles%rowtype;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if p_request_key is null then raise exception 'Idempotency key required'; end if;

  select * into v_lesson from public.lessons where slug = p_lesson_slug and status = 'published';
  if not found then raise exception 'Lesson is unavailable'; end if;
  select * into v_version from public.lesson_versions
    where lesson_id = v_lesson.id and published_at is not null
    order by version desc limit 1;
  if not found then raise exception 'Lesson version is unavailable'; end if;

  insert into public.attempts(user_id, lesson_version_id, submitted_answers, score, accepted)
  values (v_user, v_version.id, p_answers, case when p_answers = v_version.answer_key then 100 else 0 end, p_answers = v_version.answer_key)
  returning id into v_attempt;
  if p_answers <> v_version.answer_key then raise exception 'Answer validation failed'; end if;

  select rr.* into v_rule from public.quest_definitions q
    join public.reward_rules rr on rr.key = q.reward_rule_key and rr.active
    where q.lesson_id = v_lesson.id and q.status = 'published'
    order by rr.version desc limit 1;
  if not found then raise exception 'Reward rule is unavailable'; end if;

  insert into public.completions(user_id, lesson_id, attempt_id, reward_version)
  values (v_user, v_lesson.id, v_attempt, v_rule.version)
  on conflict (user_id, lesson_id, reward_version) do nothing
  returning id into v_completion;

  if v_completion is not null then
    insert into public.reward_ledger(user_id, source_type, source_id, idempotency_key, rule_key, rule_version, xp_delta, gold_delta)
    values (v_user, 'lesson', v_lesson.id::text, 'lesson:' || v_user || ':' || v_lesson.id || ':' || v_rule.version, v_rule.key, v_rule.version, v_rule.xp, v_rule.gold);
    update public.profiles set xp = xp + v_rule.xp, gold = gold + v_rule.gold where id = v_user;
    insert into public.learning_days(user_id, learning_date) values (v_user, current_date) on conflict do nothing;
    v_awarded := true;
  end if;

  select * into v_profile from public.profiles where id = v_user;
  return jsonb_build_object('accepted', true, 'awarded', v_awarded, 'xp', v_profile.xp, 'gold', v_profile.gold);
end;
$$;

create or replace function public.purchase_cosmetic(p_item_slug text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_user uuid := auth.uid();
  v_item public.shop_items%rowtype;
  v_profile public.profiles%rowtype;
  v_ledger uuid;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  select * into v_item from public.shop_items where slug = p_item_slug and status = 'published';
  if not found then raise exception 'Item is unavailable'; end if;
  select * into v_profile from public.profiles where id = v_user for update;
  if not found then raise exception 'Profile is unavailable'; end if;
  if exists (select 1 from public.player_inventory where user_id = v_user and item_id = v_item.id) then
    return jsonb_build_object('purchased', false, 'alreadyOwned', true, 'gold', v_profile.gold);
  end if;
  if v_profile.gold < v_item.gold_price then raise exception 'Insufficient gold'; end if;
  insert into public.reward_ledger(user_id, source_type, source_id, idempotency_key, rule_key, rule_version, xp_delta, gold_delta)
  values (v_user, 'purchase', v_item.id::text, 'purchase:' || v_user || ':' || v_item.id, 'shop.purchase', 1, 0, -v_item.gold_price)
  returning id into v_ledger;
  update public.profiles set gold = gold - v_item.gold_price where id = v_user;
  insert into public.player_inventory(user_id, item_id) values (v_user, v_item.id);
  insert into public.purchases(user_id, item_id, price_paid, ledger_id) values (v_user, v_item.id, v_item.gold_price, v_ledger);
  return jsonb_build_object('purchased', true, 'alreadyOwned', false, 'gold', v_profile.gold - v_item.gold_price);
end;
$$;

create or replace function public.equip_cosmetic(p_item_slug text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid(); v_item public.shop_items%rowtype;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  select s.* into v_item from public.shop_items s join public.player_inventory i on i.item_id = s.id
    where s.slug = p_item_slug and i.user_id = v_user;
  if not found then raise exception 'Item is not owned'; end if;
  insert into public.player_equipment(user_id, slot, item_id) values (v_user, v_item.slot, v_item.id)
  on conflict (user_id, slot) do update set item_id = excluded.item_id, equipped_at = now();
  return jsonb_build_object('equipped', true, 'slot', v_item.slot, 'item', v_item.slug);
end;
$$;

create or replace function public.create_api_key(p_name text, p_prefix text, p_hash text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid(); v_id uuid;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if char_length(trim(p_name)) not between 1 and 60 or p_hash !~ '^[a-f0-9]{64}$' then raise exception 'Invalid key data'; end if;
  insert into public.api_keys(user_id, name, key_prefix, key_hash) values (v_user, trim(p_name), p_prefix, p_hash) returning id into v_id;
  return jsonb_build_object('id', v_id, 'name', trim(p_name), 'prefix', p_prefix);
end;
$$;

create or replace function public.complete_onboarding(p_path text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  if p_path not in ('I have never coded before','I know a little coding','I want to learn APIs','I want to use APIs','I am building a project') then raise exception 'Invalid onboarding path'; end if;
  update public.profiles set onboarding_path = p_path, onboarded_at = coalesce(onboarded_at, now()) where id = v_user;
  return jsonb_build_object('completed', true);
end;
$$;

create or replace function public.revoke_api_key(p_key_id uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid(); v_count integer;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  update public.api_keys set revoked_at = coalesce(revoked_at, now()) where id = p_key_id and user_id = v_user;
  get diagnostics v_count = row_count;
  return v_count = 1;
end;
$$;

create or replace function public.meter_api_request(
  p_key_hash text,
  p_product_slug text,
  p_status_code integer,
  p_latency_ms integer default null
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_key public.api_keys%rowtype;
  v_product public.api_products%rowtype;
  v_window timestamptz := date_trunc('hour', now());
  v_used integer;
begin
  select * into v_key from public.api_keys where key_hash = p_key_hash and revoked_at is null for update;
  if not found then raise exception 'Invalid or revoked API key'; end if;
  select * into v_product from public.api_products where slug = p_product_slug and status = 'active';
  if not found then raise exception 'API product is unavailable'; end if;
  insert into public.api_quota_windows(key_id, product_id, window_start, used)
  values (v_key.id, v_product.id, v_window, 1)
  on conflict (key_id, product_id, window_start) do update set used = public.api_quota_windows.used + 1
  returning used into v_used;
  if v_used > v_key.quota_limit then raise exception 'API quota exceeded'; end if;
  insert into public.api_usage(key_id, product_id, status_code, latency_ms) values (v_key.id, v_product.id, p_status_code, p_latency_ms);
  update public.api_keys set last_used_at = now() where id = v_key.id;
  return jsonb_build_object('keyId', v_key.id, 'used', v_used, 'limit', v_key.quota_limit);
end;
$$;

revoke all on function public.complete_lesson(text, jsonb, uuid) from public;
revoke all on function public.purchase_cosmetic(text) from public;
revoke all on function public.equip_cosmetic(text) from public;
revoke all on function public.create_api_key(text, text, text) from public;
revoke all on function public.revoke_api_key(uuid) from public;
revoke all on function public.complete_onboarding(text) from public;
revoke all on function public.meter_api_request(text, text, integer, integer) from public;
grant execute on function public.complete_lesson(text, jsonb, uuid) to authenticated;
grant execute on function public.purchase_cosmetic(text) to authenticated;
grant execute on function public.equip_cosmetic(text) to authenticated;
grant execute on function public.create_api_key(text, text, text) to authenticated;
grant execute on function public.revoke_api_key(uuid) to authenticated;
grant execute on function public.complete_onboarding(text) to authenticated;
grant execute on function public.meter_api_request(text, text, integer, integer) to service_role;

insert into public.level_thresholds(level, cumulative_xp) values
  (1,0),(2,100),(3,260),(4,480),(5,760),(6,1100),(7,1510),(8,1990),(9,2540),(10,3160)
on conflict do nothing;
insert into public.profiles(id, display_name)
select id, left(coalesce(raw_user_meta_data ->> 'display_name', split_part(email, '@', 1)), 40) from auth.users
on conflict (id) do nothing;
insert into public.reward_rules(key, version, xp, gold, active) values
  ('starter-grove.intro',1,100,150,true),('shop.purchase',1,0,0,true)
on conflict do nothing;
insert into public.regions(slug,name,description,sort_order,status) values
  ('starter-grove','Starter Grove','A calm introduction to requests and responses.',1,'published')
on conflict (slug) do nothing;
insert into public.courses(slug,region_id,name,description,status)
select 'api-basics',id,'API Basics','Learn how software asks for and receives data.','published' from public.regions where slug='starter-grove'
on conflict (slug) do nothing;
insert into public.lessons(slug,course_id,title,summary,sort_order,status)
select 'what-is-an-api',id,'What is an API?','Understand requests and responses.',1,'published' from public.courses where slug='api-basics'
on conflict (slug) do nothing;
insert into public.lesson_versions(lesson_id,version,content,answer_key,published_at)
select id,1,'{"prompt":"In the weather example, what is the response?"}'::jsonb,'{"answer":"weather-data"}'::jsonb,now()
from public.lessons where slug='what-is-an-api' on conflict (lesson_id,version) do nothing;
insert into public.quest_definitions(lesson_id,name,objective,reward_rule_key,status)
select id,'First request','Identify the response in an API exchange.','starter-grove.intro','published'
from public.lessons where slug='what-is-an-api' and not exists (select 1 from public.quest_definitions where lesson_id=lessons.id);
insert into public.shop_items(slug,name,slot,rarity,gold_price,status) values
  ('mosswood-frame','Mosswood Frame','frame','Common',100,'published'),
  ('firefly-companion','Firefly Companion','companion','Rare',140,'published'),
  ('cyan-trail','Cyan Trail','effect','Uncommon',260,'published'),
  ('api-scout','API Scout','nameplate','Common',160,'published')
on conflict (slug) do nothing;
insert into public.api_products(slug,name,status,description) values ('grove','Grove Development API','active','A safe development API for request and metering validation.') on conflict (slug) do nothing;
insert into public.api_versions(product_id,version,base_path,active)
select id,'v1','/api/v1/demo/grove',true from public.api_products where slug='grove' on conflict (product_id,version) do nothing;
