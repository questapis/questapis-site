# Phase 1.5 validation record

Use this record only against the isolated v2 staging environment. Never substitute a production or legacy project.

## Environment evidence

- Vercel staging project and URL:
- Supabase staging project reference:
- Git revision and deployment ID:
- Migration versions applied:
- Backup/snapshot identifier and restore target:

## Required scenarios

1. Create two unique test users. Verify email, finish onboarding, refresh the session, log out/in, reset one password, and log in with the new password.
2. With user A, complete `what-is-an-api`; record the completion, reward-ledger, profile XP/gold, and dashboard values. Repeat and concurrently replay the request; all repeats must return `awarded: false` with unchanged balances.
3. Purchase and equip `mosswood-frame`. Repeat and concurrently replay the purchase. Attempt insufficient balance, an unknown item, a browser-supplied price, a browser-supplied balance, and user B's item. Only the server-owned valid transaction may change state.
4. Create a Grove key, copy the raw value once, call the API, verify usage/quota/dashboard updates, create a replacement, revoke the first key, and confirm the revoked key returns 401. Confirm the database contains only prefix and hash.
5. As user A, attempt reads and writes using user B's IDs across profiles, attempts, completions, ledger, achievements, inventory, purchases, subscriptions, grants, keys, usage, quota, equipment, and notifications. Expect no rows or authorization failures.
6. Attempt direct client mutations of profile role/XP/gold, rewards, achievements, inventory, subscriptions, grants, promotions, API quota, and content. Expect authorization failure.
7. Verify a normal user receives 403 from `/api/admin/catalog`. As an explicit staging admin, update one lesson status, API product, achievement, and announcement; return each to its original state.
8. Run desktop and mobile checks for home, Academy, dashboard, playground, login/signup/reset, shop, help, FAQ, and error states. Complete keyboard-only navigation and check for layout shift.
9. Run `npm run lint`, `npm run test`, `npm run build`, and `npm audit --omit=dev`. Record results and timings.

## Stop conditions

Stop validation immediately if a request crosses projects, a production hostname appears in a write path, a secret is logged, reward/shop concurrency changes a balance twice, or a user can access another user's private record. Fix and repeat the entire affected scenario before considering Phase 1.5 complete.

