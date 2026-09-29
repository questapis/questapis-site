# QuestAPIs v2

The isolated Phase 1 foundation for a beginner-first API Academy and professional API platform. This checkout does not modify the current production deployment at `questapis.dev`.

## Local setup

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Core routes include `/learn`, `/playground`, `/dashboard`, `/apis`, `/docs`, `/pricing`, `/shop`, `/help`, `/changelog`, `/status`, `/login`, and `/signup`. The Grove demo API is available at `/api/v1/demo/grove`; it allows keyless access only outside production when no key hash is configured.

## Documentation

- `docs/architecture.md` — system boundaries and decisions.
- `docs/academy-architecture.md` — authoritative progression contracts.
- `docs/operations.md` — content management, deployment, and launch.
- `docs/phase-1-5-validation.md` — staging evidence and adversarial test checklist.
- `supabase/migrations/` — additive PostgreSQL/RLS foundation.
- `legacy/beta-landing/` — standalone closed-beta landing page for the existing beta-only Vercel project.
- `.env.example` — variable names and inert placeholders only.
- `CHANGELOG.md` — shipped changes, security notes, and known limitations.

## Validation

Run `npm run check` for lint, unit tests, TypeScript, and production build. Never commit credentials or point local development at the production database.
