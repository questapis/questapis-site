# Academy integration contract

Status: proposed persistence design, not an applied migration. Reconcile with the existing database before writing executable DDL. `/learn` is public discovery; `/academy` will hold authenticated progress. Use the existing identity provider and stable user ID.

## Records and constraints

| Record | Purpose and constraints |
| --- | --- |
| courses, modules, lessons, lesson_versions | Ordered curriculum; stable IDs, published versions, prerequisite references and entitlement key. Submitted work binds to the version actually served. |
| assessment_items, attempts | Server-only answer/rubric, authenticated user, version, validated answers, score and timestamps. Never send paid content or authoritative answer keys before authorization. |
| completions | Unique (user_id, lesson_id, reward_version); server validated, references accepted attempt. Configure repeat rewards explicitly. |
| player_profiles | Unique identity FK; username, owned equipped cosmetics; XP/gold projections, timezone and last learning date. Browser cannot write balances. |
| level_thresholds, reward_rules | Versioned cumulative XP thresholds and activity rewards; nonnegative integer amounts; publish validated configurations. |
| reward_ledger | Immutable user, source, unique idempotency key, rule version, XP/gold deltas, timestamp. Reconcile projections from ledger. |
| quests, quest_objectives, player_quests | Versioned objective rules and progress based only on verified server events. |
| achievements, player_achievements | Configurable criteria, unique unlock per user/achievement, linked reward ledger event. Titles and badges are unlocks. |
| streak_rules, player_learning_days | Unique (user_id, learning_date); server clock and documented timezone change policy; milestone reward has unique source. |
| areas, area_requirements | Prerequisite achievements/lessons/level; server checks unlocks. |
| academy_shop_items, player_inventory, purchases | Frame, avatar, icon, nameplate, theme or pet; configurable gold price and entitlement; unique nonconsumable ownership. |
| boost_definitions, player_boosts | Configurable duration, eligible activity, stacking policy and caps; server activation and expiry. |
| entitlement_definitions, plan_entitlements, user_grants | Capability/limit by verified plan or explicit grant; expiry and provenance; default deny unknown capability. |
| promotion_definitions, promotion_redemptions | Credits, elevated quota or discount; duration, eligibility, cap, start/end; unique redemption per user/promotion. Discounts require billing integration. |
| api_usage, playground_usage | Atomic window counters tied to identity/key; integrate with existing meter rather than parallel uncoordinated counters. |
| event_outbox | Transactional events for analytics and downstream work; consumers deduplicate by event ID; exclude tokens and submitted secrets. |

## Service boundaries

`submitAttempt(identity, lessonVersion, answers)` authorizes and validates on the server. In one database transaction: lock user progress, insert completion if new, derive rewards from published rules, append ledger, update balances/unlocks/streak, add outbox event. Replays return the original result; concurrent submissions cannot double reward. Clients supply neither user IDs for ownership nor reward amounts. Quizzes award mastery once; retries do not farm perfect-score bonuses.

`purchaseCosmetic(identity, itemId)` locks wallet/item pricing, checks entitlement and stock/ownership, conditionally debits sufficient gold, inserts purchase and inventory, then commits together. Equip only an owned item of the correct slot. Refunds are compensating ledger entries.

`resolveEntitlements(identity, capability, now)` uses verified billing state and unexpired grants. Billing webhooks need signature verification, unique event IDs and out-of-order handling. Gold cannot grant paid access unless an explicit product rule authorizes it.

`redeemIntroduction(identity)` checks eligibility and atomically issues one expiring configured grant. Sign-in cannot extend it. No guessed prices or automatic live credits in this phase.

`executePlayground(identity, exerciseId, inputs)` resolves a server-owned endpoint/method allowlist and JSON schema; checks entitlement and atomic quota before dispatch. Never accept an arbitrary destination URL, forward credentials to redirects or return upstream secrets. Enforce timeouts, size limits, safe fixture accounts and restricted writes. User input cannot reach administrative reward endpoints.

## Authorization and rollout

Enforce ownership and RLS (if Supabase is confirmed); ordinary authenticated clients can read only their own progress and cannot directly mutate ledger, currency, inventory or entitlements. Keep service credentials exclusively on the server. Validate sessions server-side on every protected request and enforce same-origin/CSRF protection on cookie-authenticated mutations. Rate-limit submissions and redemption attempts.

Migrations must be additive, reviewed against a schema snapshot and tested against staging with backup/restore verification. Gate academy activation server-side until auth, schema and policies are ready. Test anonymous access, cross-user IDs, replayed attempts, concurrent spending, expired promotions, entitlement revocation and forged webhook events. Disable the feature to roll back; preserve earned data.

## Design handoff

Proposed boundaries: `lib/academy` will own curriculum/domain data; `components/academy` will own presentation and preview interactions. Designers can change components and CSS without changing IDs, assessments or persistence contracts. The public preview should be stateless and grant no XP, currency or paid access. Production player UI must consume server-returned view models rather than calculate authoritative balances locally. These modules are not implemented in this discovery phase.
