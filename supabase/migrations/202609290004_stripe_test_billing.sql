create table public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  livemode boolean not null default false check (livemode = false),
  processed_at timestamptz not null default now()
);

alter table public.stripe_webhook_events enable row level security;

create table public.stripe_usage_events (
  request_id uuid primary key,
  user_id uuid not null references auth.users on delete cascade,
  units integer not null default 1 check (units > 0),
  created_at timestamptz not null default now(),
  delivered_at timestamptz
);

create index stripe_usage_pending_idx on public.stripe_usage_events(created_at) where delivered_at is null;
alter table public.stripe_usage_events enable row level security;

insert into public.plans(key, name, active)
values ('adventurer', 'Adventurer', true)
on conflict (key) do update set name = excluded.name;

create or replace function public.apply_stripe_subscription_event(
  p_event_id text,
  p_event_type text,
  p_user_id uuid,
  p_plan_key text,
  p_customer_id text,
  p_subscription_id text,
  p_status text,
  p_period_end timestamptz
) returns boolean language plpgsql security definer set search_path = '' as $$
declare v_plan_id uuid;
begin
  if p_event_id !~ '^evt_' or p_customer_id !~ '^cus_' or p_subscription_id !~ '^sub_' then
    raise exception 'Invalid Stripe identifier';
  end if;
  if p_status not in ('incomplete','incomplete_expired','trialing','active','past_due','canceled','unpaid','paused') then
    raise exception 'Invalid subscription status';
  end if;
  insert into public.stripe_webhook_events(event_id, event_type, livemode)
  values (p_event_id, p_event_type, false)
  on conflict do nothing;
  if not found then return false; end if;

  select id into v_plan_id from public.plans where key = p_plan_key and active = true;
  if not found then raise exception 'Unknown or inactive plan'; end if;

  insert into public.subscriptions(user_id, plan_id, provider_customer_id, provider_subscription_id, status, period_end, updated_at)
  values (p_user_id, v_plan_id, p_customer_id, p_subscription_id, p_status, p_period_end, now())
  on conflict (user_id) do update set
    plan_id = excluded.plan_id,
    provider_customer_id = excluded.provider_customer_id,
    provider_subscription_id = excluded.provider_subscription_id,
    status = excluded.status,
    period_end = excluded.period_end,
    updated_at = now();
  return true;
end;
$$;

revoke all on function public.apply_stripe_subscription_event(text,text,uuid,text,text,text,text,timestamptz) from public;
grant execute on function public.apply_stripe_subscription_event(text,text,uuid,text,text,text,text,timestamptz) to service_role;

create or replace function public.meter_api_request(
  p_key_hash text,
  p_product_slug text,
  p_status_code integer,
  p_latency_ms integer default null
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_key public.developer_api_keys%rowtype;
  v_product public.api_products%rowtype;
  v_window timestamptz := date_trunc('hour', now());
  v_used integer;
  v_request_id uuid := gen_random_uuid();
begin
  select * into v_key from public.developer_api_keys where key_hash = p_key_hash and revoked_at is null for update;
  if not found then raise exception 'Invalid or revoked API key'; end if;
  select * into v_product from public.api_products where slug = p_product_slug and status = 'active';
  if not found then raise exception 'API product is unavailable'; end if;
  insert into public.api_quota_windows(key_id, product_id, window_start, used)
  values (v_key.id, v_product.id, v_window, 1)
  on conflict (key_id, product_id, window_start) do update set used = public.api_quota_windows.used + 1
  returning used into v_used;
  if v_used > v_key.quota_limit then raise exception 'API quota exceeded'; end if;
  insert into public.api_usage(key_id, product_id, status_code, latency_ms, request_id)
  values (v_key.id, v_product.id, p_status_code, p_latency_ms, v_request_id);
  insert into public.stripe_usage_events(request_id, user_id, units) values (v_request_id, v_key.user_id, 1);
  update public.developer_api_keys set last_used_at = now() where id = v_key.id;
  return jsonb_build_object('keyId', v_key.id, 'userId', v_key.user_id, 'requestId', v_request_id, 'used', v_used, 'limit', v_key.quota_limit);
end;
$$;

revoke all on function public.meter_api_request(text, text, integer, integer) from public;
grant execute on function public.meter_api_request(text, text, integer, integer) to service_role;
