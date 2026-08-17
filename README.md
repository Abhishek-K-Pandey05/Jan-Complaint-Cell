# Jan Complaint Cell — Phases 1–2

**Phase 1**: TypeScript setup, Tailwind v4 design tokens, shared UI primitives,
layout, and the homepage.

**Phase 2**: Supabase auth (email/password only — no Google OAuth), route
protection middleware, login/register pages, `useAuth`/`useProfile` hooks,
and the citizen dashboard shell.

Note: Phase 2's code assumes the `profiles` table and its `handle_new_user`
trigger from **Phase 3** — until that migration is applied to your Supabase
project, registration will create an auth user but no profile row will exist
yet, and the dashboard will show a friendly "couldn't load profile" warning
instead of your name. That's expected; it resolves itself once Phase 3 lands.

Phases 3–6 (DB schema/RLS/storage, complaint filing, admin dashboard, public
dashboard/map) aren't included yet — they need a live connection to your
Supabase project, which this sandboxed environment doesn't have (no network,
no Supabase MCP).

## Decisions locked in for this build
- **Auth**: email/password only — Google OAuth intentionally excluded.
- **Abuse prevention**: Cloudflare Turnstile. Add your site key / secret to `.env.local`.
- **Supabase**: `.env.example` uses your project URL (`umeiaqrcbfgsfgpkpsjm`) with
  placeholder keys — fill in the real anon key and service role key yourself,
  they're never committed.

## Setup
```bash
cd complaint
npm install
cp .env.example .env.local   # then fill in real Supabase + Turnstile keys
npm run dev
```
Open http://localhost:3000.

## What's included
- `tsconfig.json`, Tailwind v4 tokens in `app/globals.css` (Ashoka Blue / Saffron
  palette, Newsreader display + Inter body + JetBrains Mono for complaint IDs)
- `types/index.ts` — all shared domain types matching the Phase 3 DB schema
- `lib/i18n/` — English/Hindi dictionaries + language context (toggle in navbar)
- `components/ui/` — Button, Badge, Card, Input, Textarea, Select, Modal,
  Spinner, Alert, StatusBadge, StepIndicator, Timeline
- `components/navbar`, `components/footer`
- `app/layout.tsx`, `app/page.tsx` — full homepage (hero, 12 categories, how it
  works, transparency stats, dashboard/map preview, trust & safety)
- `next.config.ts` — baseline security headers (CSP to be finalized in Phase 6)

## Next steps (Phases 3–6)
Best done with **Claude Code** pointed at this folder, since it needs:
- Supabase MCP (or CLI) to apply the Phase 3 schema/RLS/storage migrations
- npm install with real network access
- Your real `.env.local` values

Hand it the original implementation plan and say "continue with Phase 3" —
the auth clients, hooks, and middleware here are already wired to expect the
Phase 3 `profiles`/`complaints`/etc. tables, so the schema migration is the
next unblocking step.
