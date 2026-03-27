# Token Gate System — atnocost.cc

## Overview

The site has two token-gated routes:

| Gate | URL | Purpose |
|------|-----|---------|
| **Ekthesis** | `atnocost.cc/ekthesis?token=XXXX` | Business case / investor deck |
| **Brief** | `atnocost.cc/brief?token=XXXX` | Creative brief (future use) |

Visitors without a valid token see a gate page instead of the content.

---

## How It Works

1. Visitor hits `/ekthesis` or `/brief`
2. Middleware checks the `?token=` query parameter
3. Token is validated against **Vercel KV** first, then **environment variables** as fallback
4. Valid token → content loads. Invalid/missing → gate page (`/ekthesis/gate` or `/brief/gate`)

---

## Token Generator (Admin UI)

**URL:** `https://atnocost.cc/internal/tokens`

### Access

The `/internal` section is password-protected.

1. Go to `https://atnocost.cc/internal/tokens`
2. You'll be redirected to the login page
3. Enter the password (see "Setting the Password" below)
4. Once authenticated, you can generate, view, and revoke tokens

### Using the Generator

- **Select a gate** (ekthesis or brief) using the toggle buttons
- **Enter a contact name** (e.g., "Alphonse Pierre") — this is for your reference only
- **Click Generate** — creates a 12-character token stored in Vercel KV
- **Copy URL** — copies the full shareable link to clipboard
- **Revoke** — permanently deletes the token; the link stops working immediately

### URL Format

```
https://atnocost.cc/ekthesis?token=abc123def456
https://atnocost.cc/brief?token=abc123def456
```

---

## Setting the Password

The internal admin password is controlled by the `INTERNAL_AUTH_TOKEN` environment variable in Vercel.

### To set or change it:

1. Go to [Vercel Dashboard](https://vercel.com) → Project → Settings → Environment Variables
2. Add or update: `INTERNAL_AUTH_TOKEN` = `(your chosen password)`
3. Apply to **Production**, **Preview**, and **Development**
4. Redeploy for changes to take effect: `npx vercel deploy --prod`

The password you set here is what you enter on the `/internal/login` page.

---

## Environment Variables (Complete List)

| Variable | Purpose | Required |
|----------|---------|----------|
| `INTERNAL_AUTH_TOKEN` | Password for /internal admin pages | Yes |
| `KV_REST_API_URL` | Vercel KV Redis endpoint (auto-set when KV is linked) | Yes (for token generator) |
| `KV_REST_API_TOKEN` | Vercel KV auth token (auto-set when KV is linked) | Yes (for token generator) |
| `EKTHESIS_TOKENS` | Comma-separated fallback tokens (e.g., `6958,another`) | Optional |
| `BRIEF_TOKENS` | Comma-separated fallback tokens | Optional |

### Fallback Tokens (Env Vars)

Static tokens set via `EKTHESIS_TOKENS` or `BRIEF_TOKENS` always work alongside KV tokens. These don't appear in the admin UI and can't be revoked from it — they're managed directly in Vercel's environment variable settings.

Current env var token for ekthesis: `6958`

---

## Technical Architecture

```
Visitor → middleware.ts
            ├── Check ?token= param
            ├── Validate against env vars (instant)
            ├── Validate against Vercel KV via REST API
            └── Rewrite to /gate if invalid

Admin → /internal/tokens (React UI)
            ├── GET  /api/tokens?gate=ekthesis  → list tokens
            ├── POST /api/tokens {gate, contact} → create token
            └── DELETE /api/tokens {gate, token} → revoke token

Storage: Vercel KV (Redis)
  Key: gate:ekthesis  → Hash of { token: JSON metadata }
  Key: gate:brief     → Hash of { token: JSON metadata }
```

### Key Files

| File | Role |
|------|------|
| `middleware.ts` | Intercepts requests, validates tokens |
| `lib/tokens.ts` | Token CRUD operations (KV + env var fallback) |
| `app/api/tokens/route.ts` | REST API for admin UI |
| `app/internal/tokens/page.tsx` | Admin UI |
| `app/internal/login/page.tsx` | Login page |
| `app/api/internal-auth/route.ts` | Login authentication |

---

## Quick Start

1. Set `INTERNAL_AUTH_TOKEN` in Vercel env vars (this is your admin password)
2. Deploy: `npx vercel deploy --prod`
3. Go to `https://atnocost.cc/internal/tokens`
4. Log in with your password
5. Select gate, enter contact name, click Generate
6. Share the copied URL with your contact
