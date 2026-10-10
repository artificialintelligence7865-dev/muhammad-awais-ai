# Muhammad Awais - AI Services & Solutions

Premium dark/futuristic multi-page web app: Next.js 14 (App Router) + Tailwind + Framer Motion + Lucide + Supabase (Auth, Postgres, Storage).

## Roadmap

1. **Setup (30 min)**: create a Supabase project, run `supabase/schema.sql` in the SQL editor, copy URL + anon key into `.env.local`.
2. **Install & run**: `npm install && npm run dev`.
3. **Make yourself admin**: sign up on `/auth`, then in Supabase SQL editor run
   `update profiles set role='admin' where email='YOUR_EMAIL';`
4. **Configure content**: open `/admin` -> Site Settings. Edit prices, hero text, contact info and Easypaisa details (defaults are seeded from the schema).
5. **Test a full order**: `/book` -> pay via Easypaisa -> submit TRX ID + screenshot -> in `/admin` set status to In Progress -> add delivery link -> Delivered -> check `/dashboard`.
6. **Deploy**: push to GitHub, import in Vercel, add the two env vars. In Supabase Auth settings add your domain to Site URL and Redirect URLs (needed for password reset: `https://yourdomain/auth?mode=update`).
7. **Later improvements**: email notifications (Supabase Edge Function + Resend), WhatsApp notify button, Stripe/JazzCash, invoices, reviews.

## Routes

| Route | File | Access |
|---|---|---|
| `/` | `app/page.js` | public |
| `/services` | `app/services/page.js` | public |
| `/book` | `app/book/page.js` | logged-in |
| `/dashboard` | `app/dashboard/page.js` | logged-in |
| `/auth` | `app/auth/page.js` | public |
| `/admin` | `app/admin/page.js` | admin only (enforced by RLS + UI check) |

## Folder structure

```
muhammad-awais-ai/
├─ app/
│  ├─ layout.js, globals.css
│  ├─ page.js                 Home
│  ├─ services/page.js
│  ├─ book/page.js            4-step booking + Easypaisa
│  ├─ dashboard/page.js       orders + profile
│  ├─ auth/page.js            signup / login / reset
│  └─ admin/page.js           overview, orders, users, CMS, analytics
├─ components/
│  ├─ Navbar.js, Footer.js, PageTracker.js, ui.js
├─ lib/
│  ├─ supabase.js, settings.js, useAuth.js
└─ supabase/schema.sql        tables, RLS, storage, RPC functions
```

## Security notes

- Admin access is enforced in the database by Row Level Security (`is_admin()`), not just hidden in the UI. Never rely on the UI check alone.
- Users can only read their own orders and upload to their own folder in the `payment-proofs` bucket.
- Users cannot change their own `role` (trigger blocks it) or order `status`.
- Payment is manual: always verify the TRX ID and screenshot against your Easypaisa app before moving an order to In Progress.
