# PixelOne Visuals — Project Technical Overview

> **Purpose:** Onboarding document for developers and AI assistants.  
> **Last updated:** February 25, 2026.

---

## 1. Project Identity & Stack

| Key             | Value                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| **Name**        | Pixel One Visuals                                                          |
| **Domain**      | `https://www.pixelonevisuals.tech`                                         |
| **Type**        | Multi-page static site with dynamic Supabase backend (no SPA framework)    |
| **Frontend**    | HTML5, Tailwind CSS v4 (CDN), Vanilla JavaScript (ES6+)                    |
| **Icons**       | Font Awesome (CDN)                                                         |
| **Backend**     | Supabase — PostgreSQL, Auth (Google OAuth), Storage, Edge Functions (Deno) |
| **Hosting**     | Vercel                                                                     |
| **i18n**        | Custom 3-language system (FR / EN / AR) via `assets/js/i18n.js`            |
| **Theming**     | Dark/Light mode via class strategy (`assets/js/theme-manager.js`)          |
| **Currency**    | MAD (Moroccan Dirham)                                                      |
| **Package Mgr** | npm — only devDependency is `supabase` CLI                                 |

### File Map

```
├── index.html              → Landing page (hero, services grid, stats, contact)
├── services.html            → Full services catalog
├── service-details.html     → Single service view (?id=)
├── blog.html                → Blog listing
├── blog-details.html        → Single blog post (?slug=)
├── auth.html                → Sign-up / Sign-in (Google OAuth)
├── auth-callback.html       → OAuth redirect handler
├── dashboard.html           → Client dashboard (orders, profile, notifications)
├── admin.html               → Admin panel (all management)
├── privacy.html             → Privacy Policy (rendered from legal-content.js)
├── terms.html               → Terms of Service
├── refund-policy.html       → Refund & Cancellation Policy
├── assets/js/
│   ├── config.js            → Supabase creds, SERVICES fallback array, CATEGORIES
│   ├── i18n.js              → TRANSLATIONS object, setLanguage(), t(), getLang()
│   ├── theme-manager.js     → IIFE, CSS overrides, floating theme button
│   ├── legal-content.js     → i18n legal page content + renderLegalPage()
│   └── supabase-client.js   → Singleton client, auth helpers, WhatsApp link builder
├── database/
│   ├── setup.sql            → Full initial schema
│   └── migrations/          → 001–013 incremental migrations
├── supabase/functions/
│   └── google-shopping-feed/index.ts  → Edge Function for Google Merchant XML
└── icon/                    → Favicons (black & white variants + manifests)
```

### Key JavaScript Modules

| Module               | Exports / Globals                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `config.js`          | `CONFIG` object — Supabase URL/key, SITE_NAME, WHATSAPP_NUMBER, BANK details, SERVICES[], CATEGORIES[]                 |
| `supabase-client.js` | `getSupabaseClient()`, `getCurrentUser()`, `getProfile(userId)`, `requireAuth(adminOnly?)`, `buildWhatsAppLink(order)` |
| `i18n.js`            | `initI18n()`, `setLanguage(lang)`, `getLang()`, `t(key)` — fires `langchange` event                                    |
| `theme-manager.js`   | IIFE — auto-detects preference, injects CSS overrides for light mode, floating suggestion button                       |
| `legal-content.js`   | `LEGAL_CONTENT` object (privacy/terms/refund per language), `renderLegalPage(pageKey)`                                 |

---

## 2. Database Schema (Current Snapshot)

> **Engine:** PostgreSQL via Supabase.  
> **Extension:** `uuid-ossp` enabled.  
> **RLS:** Enabled on all tables.

### 2.1 `profiles`

Linked 1:1 to `auth.users` via trigger `handle_new_user()`.

| Column                | Type          | Default / Notes                                  |
| --------------------- | ------------- | ------------------------------------------------ |
| `id`                  | `uuid` PK     | FK → `auth.users(id)` ON DELETE CASCADE          |
| `full_name`           | `text`        | From Google profile or email prefix              |
| `phone`               | `text`        | Optional, user-editable                          |
| `role`                | `text`        | `'admin'` \| `'client'` — default `'client'`     |
| `is_banned`           | `boolean`     | Default `false` — added in migration 013         |
| `avatar_url`          | `text`        | Public URL from `avatars` bucket — migration 013 |
| `has_agreed_to_terms` | `boolean`     | Default `false` — migration 011                  |
| `agreed_at`           | `timestamptz` | Legal audit timestamp — migration 011            |
| `created_at`          | `timestamptz` | `now()`                                          |

**RLS:** User reads/updates own row. Admin has full access.

### 2.2 `services`

| Column           | Type            | Notes                                     |
| ---------------- | --------------- | ----------------------------------------- |
| `id`             | `bigint` PK     | Auto-identity                             |
| `title`          | `text`          | French title (primary)                    |
| `titles`         | `jsonb`         | `{fr, en, ar}` — i18n titles              |
| `description`    | `text`          | French description                        |
| `descriptions`   | `jsonb`         | `{fr, en, ar}` — i18n descriptions        |
| `category`       | `text`          | CHECK: `'video'` \| `'design'` \| `'web'` |
| `price`          | `numeric(10,2)` | In MAD                                    |
| `features`       | `jsonb`         | Array of feature strings (French)         |
| `features_i18n`  | `jsonb`         | `{fr: [...], en: [...], ar: [...]}`       |
| `image_url`      | `text`          | Unsplash or uploaded image                |
| `is_active`      | `boolean`       | Default `true`                            |
| `is_coming_soon` | `boolean`       | Default `false`                           |
| `sort_order`     | `integer`       | Display ordering                          |
| `delivery_time`  | `text`          | e.g. `"48h"`, `"72h"`                     |
| `revisions`      | `integer`       | Number of included revisions              |
| `created_at`     | `timestamptz`   | `now()`                                   |
| `updated_at`     | `timestamptz`   | Auto-updated via trigger                  |

**RLS:** Public read. Admin-only write.

### 2.3 `orders` (Service Requests)

| Column               | Type          | Notes                                                              |
| -------------------- | ------------- | ------------------------------------------------------------------ |
| `id`                 | `bigint` PK   | Auto-identity                                                      |
| `order_ref`          | `text` UNIQUE | Generated by DB trigger `set_order_ref` via `generate_order_ref()` |
| `user_id`            | `uuid`        | FK → `auth.users(id)` — nullable (anonymous)                       |
| `service_id`         | `bigint`      | FK → `services(id)` ON DELETE SET NULL                             |
| `status`             | `text`        | CHECK: `'pending'` \| `'in_progress'` \| `'review'` \| `'done'`    |
| `details`            | `jsonb`       | Client-provided project details                                    |
| `payment_proof_url`  | `text`        | Public URL of uploaded proof                                       |
| `payment_proof_path` | `text`        | Storage path for deletion                                          |
| `created_at`         | `timestamptz` | `now()`                                                            |
| `updated_at`         | `timestamptz` | Auto-updated via trigger                                           |

**RLS:** Clients see own orders. Anonymous orders visible to anonymous. Admin has full CRUD + delete.

### 2.4 `blog_posts`

| Column         | Type          | Notes                                             |
| -------------- | ------------- | ------------------------------------------------- |
| `id`           | `bigint` PK   | Auto-identity                                     |
| `title`        | `text`        | French title                                      |
| `title_en`     | `text`        | English title — migration 010                     |
| `title_ar`     | `text`        | Arabic title — migration 010                      |
| `slug`         | `text` UNIQUE | URL-friendly identifier                           |
| `image_url`    | `text`        | Cover image                                       |
| `video_url`    | `text`        | YouTube/video embed URL — migration 009           |
| `content`      | `text`        | French Markdown content                           |
| `content_en`   | `text`        | English — migration 010                           |
| `content_ar`   | `text`        | Arabic — migration 010                            |
| `excerpt`      | `text`        | Short preview text                                |
| `author`       | `text`        | Default `'Pixel One'`                             |
| `is_published` | `boolean`     | Default `false` — only published posts are public |
| `view_count`   | `integer`     | Default `0` — incremented on page view            |
| `created_at`   | `timestamptz` | `now()`                                           |
| `updated_at`   | `timestamptz` | Auto-updated via trigger                          |

**RLS:** Public reads published only. Admin has full access.

### 2.5 `blog_comments`

> **⚠️ CRITICAL:** `id` and `parent_id` are **`BIGINT`**, NOT UUID.  
> Never generate client-side IDs for comments — they are auto-incremented by the database.

| Column         | Type            | Notes                                                                            |
| -------------- | --------------- | -------------------------------------------------------------------------------- |
| `id`           | **`BIGINT`** PK | `GENERATED ALWAYS AS IDENTITY` — auto-increment                                  |
| `post_id`      | `bigint`        | FK → `blog_posts(id)` ON DELETE CASCADE                                          |
| `author_name`  | `text`          | Display name of commenter                                                        |
| `author_email` | `text`          | Email of commenter                                                               |
| `content`      | `text`          | Comment body                                                                     |
| `rating`       | `integer`       | 1–5 stars, default `5`                                                           |
| `is_approved`  | `boolean`       | Default `false` (requires moderation)                                            |
| `admin_reply`  | `text`          | Admin response to the comment                                                    |
| `user_id`      | `uuid`          | FK → `auth.users(id)` — links to profile                                         |
| `parent_id`    | **`BIGINT`**    | FK self-ref → `blog_comments(id)` ON DELETE CASCADE — **enables nested replies** |
| `created_at`   | `timestamptz`   | `now()`                                                                          |

**Nested Replies:** A comment with `parent_id = NULL` is a top-level comment. A comment with `parent_id = <some id>` is a reply to that comment. The tree can be recursive.

**RLS:**

- Public can read approved comments (`is_approved = true`).
- Anyone can insert comments (auto-approved by default).
- Admin has full CRUD (approve, delete, reply).

### 2.6 `comment_likes`

| Column       | Type          | Notes                                             |
| ------------ | ------------- | ------------------------------------------------- |
| `user_id`    | `uuid`        | FK → `auth.users(id)` ON DELETE CASCADE           |
| `comment_id` | **`BIGINT`**  | Must match `blog_comments.id` type (**NOT UUID**) |
| `created_at` | `timestamptz` | `now()`                                           |

**PK:** Composite `(user_id, comment_id)` — one like per user per comment.

**RLS:** Anyone can read. Authenticated users insert/delete own likes.

### 2.7 `notifications`

| Column       | Type          | Notes                                            |
| ------------ | ------------- | ------------------------------------------------ |
| `id`         | `uuid` PK     | `uuid_generate_v4()`                             |
| `user_id`    | `uuid`        | FK → `auth.users(id)` ON DELETE CASCADE          |
| `type`       | `text`        | CHECK: `'order_update'` \| `'reply'` \| `'like'` |
| `message`    | `text`        | Human-readable notification text                 |
| `is_read`    | `boolean`     | Default `false`                                  |
| `created_at` | `timestamptz` | `now()`                                          |

**RLS:** Users read/update own. Any authenticated user can insert (for reply/like triggers). Admin manages all.

### 2.8 `site_content`

Key/Value store for dynamic, translatable site text (hero copy, stats, CTA labels, etc.).

| Column        | Type          | Notes                                            |
| ------------- | ------------- | ------------------------------------------------ |
| `id`          | `bigint` PK   | Auto-identity                                    |
| `page`        | `text`        | e.g. `'home'`                                    |
| `section`     | `text`        | e.g. `'hero'`, `'stats'`, `'why'`, `'contact'`   |
| `content_key` | `text`        | e.g. `'title'`, `'description'`, `'cta_primary'` |
| `value_fr`    | `text`        | French value                                     |
| `value_en`    | `text`        | English value                                    |
| `value_ar`    | `text`        | Arabic value                                     |
| `updated_at`  | `timestamptz` | Auto-updated via trigger                         |

**Unique constraint:** `(page, section, content_key)`.

**RLS:** Public read. Admin-only write.

### Storage Buckets

| Bucket           | Public | Purpose                     | Path Pattern           |
| ---------------- | ------ | --------------------------- | ---------------------- |
| `payment-proofs` | No     | Order payment proof uploads | `{user_id}/{filename}` |
| `avatars`        | Yes    | User profile pictures       | `{user_id}/{filename}` |

---

## 3. Key Features & Logic

### 3.1 Authentication System

**Provider:** Google OAuth only, via Supabase Auth.

**Flow:**

1. User clicks "Sign in with Google" on `auth.html`.
2. Supabase redirects to Google → consent → redirects to `auth-callback.html`.
3. `auth-callback.html` captures the session tokens from the URL hash.
4. The DB trigger `handle_new_user()` fires on `auth.users` INSERT → creates a `profiles` row with:
   - `full_name` from Google metadata (fallback: email prefix).
   - `avatar_url` from Google metadata.
   - `has_agreed_to_terms` and `agreed_at` from user metadata (if sent during sign-up).
5. Client-side calls `requireAuth()` on protected pages.

**Legal Consent Enforcement:**

- During sign-up, the user must check a checkbox agreeing to Terms, Privacy Policy, and Refund Policy.
- The consent boolean (`has_agreed_to_terms`) and timestamp (`agreed_at`) are stored in `profiles` via `user_metadata`.
- Without consent, the user cannot proceed.

**Banned User Handling:**

- `requireAuth()` checks `profile.is_banned`.
- If banned, the user is immediately signed out and redirected to `auth.html`.

**Roles:**

- `'client'` (default) — access to `dashboard.html`.
- `'admin'` — access to `admin.html`. When `requireAuth(true)` is called, non-admins are redirected to the dashboard.

### 3.2 Admin Panel (`admin.html`)

Single-page admin interface with sidebar navigation. All logic is inline in `admin.html`.

**Sections:**

| Section          | Functionality                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| **Orders**       | List all orders, update status (`pending` → `in_progress` → `review` → `done`), delete orders     |
| **Services**     | CRUD for services — manage titles, pricing, features (all 3 languages)                            |
| **Blog**         | Full CRUD — list, create, edit, delete posts. Modal form with `video_url` support                 |
| **Statistics**   | Overview metrics and charts                                                                       |
| **Comments**     | Approve/delete/reply to blog comments                                                             |
| **Users**        | List all users with avatars, **ban/unban** toggle, **promote to admin**                           |
| **Site Content** | Manage `site_content` table entries — edit trilingual values (FR/EN/AR) for hero, stats, CTA text |

**Admin User Management:**

- View all profiles with avatar, name, email, role.
- Toggle `is_banned` on a user to block access.
- Promote a user to `role = 'admin'`.

### 3.3 Client Dashboard (`dashboard.html`)

3-tab layout accessible to authenticated users:

| Tab               | Features                                                         |
| ----------------- | ---------------------------------------------------------------- |
| **Orders**        | View own orders, statuses, payment proof uploads                 |
| **Profile**       | Edit full name, phone, upload avatar to `avatars` bucket         |
| **Notifications** | View notifications (order updates, replies, likes), mark as read |

### 3.4 Blog System

**Moderation Logic:**

- Comments have `is_approved` defaulting to `false`.
- Public only sees approved comments.
- Admin/moderator approves or deletes comments from the Comments section.

**Recursive Replies (Nested Threading):**

- `blog_comments.parent_id` (BIGINT) is a self-referencing FK.
- Top-level comments: `parent_id = NULL`.
- Replies: `parent_id = <parent comment id>`.
- The frontend recursively renders replies under their parent.
- When a user replies, a `'reply'` notification is created for the parent comment's author.

**Likes:**

- `comment_likes(user_id, comment_id)` — composite PK prevents duplicate likes.
- When a user likes a comment, a `'like'` notification is sent to the comment's author.

**Blog Page Flow:**

- `blog.html` — lists published posts as cards, links to `blog-details.html?slug=...`.
- `blog-details.html` — full article (Markdown rendered), YouTube embed (if `video_url`), comments section, share buttons, related posts sidebar.
- `view_count` is incremented on each page view.

### 3.5 Services Flow

- `services.html` and `index.html` fetch services from the Supabase `services` table.
- **Fallback:** If the DB query fails, the hardcoded `CONFIG.SERVICES[]` array (in `config.js`) is used.
- Each service card links to `service-details.html?id=<service_id>`.
- The order flow leads to `dashboard.html` where the user can track orders.

### 3.6 Google Shopping Feed (Edge Function)

**Path:** `supabase/functions/google-shopping-feed/index.ts`

**Runtime:** Deno (Supabase Edge Functions).

**Logic:**

1. Fetches all active services (`is_active = true`) from `services` table using the `SUPABASE_SERVICE_ROLE_KEY`.
2. Builds an **RSS 2.0 / Google Merchant Center XML** feed.
3. Each `<item>` includes:
   - `g:id` — service ID
   - `title` — English preferred, French fallback
   - `description` — combines description + features (English preferred)
   - `link` → `https://www.pixelonevisuals.tech/service-details.html?id={id}`
   - `g:price` — in MAD
   - `g:availability` → `in_stock`
   - `g:brand` → `Pixel One`
   - `g:google_product_category` — mapped from service category
4. Returns XML with 1-hour cache (`Cache-Control: public, max-age=3600`).
5. CORS headers allow any origin.

**Endpoint:** `https://<supabase-project>.supabase.co/functions/v1/google-shopping-feed`

---

## 4. Legal & Compliance

### Policy Pages

| Page                  | File                 | Content Source                                                      |
| --------------------- | -------------------- | ------------------------------------------------------------------- |
| Privacy Policy        | `privacy.html`       | `legal-content.js` (i18n rendered via `renderLegalPage('privacy')`) |
| Terms of Service      | `terms.html`         | `legal-content.js` (i18n rendered via `renderLegalPage('terms')`)   |
| Refund & Cancellation | `refund-policy.html` | `legal-content.js` (i18n rendered via `renderLegalPage('refund')`)  |

### No-Refund Policy for Digital Services

All services sold by PixelOne are **digital/creative services** (video editing, graphic design). The refund policy enforces:

- **No refunds** once work has begun or been delivered.
- Cancellations are only possible if the order is still in `'pending'` status.
- This is disclosed and agreed to at sign-up via the legal consent checkbox.

### Legal Consent Audit Trail

- `profiles.has_agreed_to_terms` — boolean flag.
- `profiles.agreed_at` — exact timestamp of consent.
- Both are persisted via the `handle_new_user()` trigger from `user_metadata` at sign-up time.

---

## 5. i18n System

**Supported Languages:** French (default), English, Arabic.

| Mechanism           | How it works                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `data-i18n` attr    | Elements with this attribute are auto-translated by `initI18n()`                                 |
| `t(key)` function   | Programmatic translation lookup from `TRANSLATIONS` object                                       |
| `setLanguage(lang)` | Switches language, sets `<body>` class (`lang-fr`/`lang-en`/`lang-ar`), fires `langchange` event |
| `getLang()`         | Returns current language code from localStorage                                                  |
| Arabic support      | `lang-ar` class on `<body>` activates RTL layout and Arabic fonts                                |
| `.site-logo`        | Always forced LTR via CSS regardless of language direction                                       |

---

## 6. Database Migrations Log

| #   | File                                    | Description                                                                    |
| --- | --------------------------------------- | ------------------------------------------------------------------------------ |
| 001 | `001_create_services_and_orders.sql`    | Initial services + orders tables                                               |
| 002 | `002_ensure_service_fk.sql`             | Ensure orders.service_id FK constraint                                         |
| 003 | `003_create_blog_posts.sql`             | Blog posts table with RLS                                                      |
| 004 | `004_site_content_and_enhancements.sql` | Site content KV table, service i18n columns, seeds                             |
| 005 | `005_service_enhancements.sql`          | is_coming_soon, delivery_time, revisions, descriptions                         |
| 006 | `006_fix_order_permissions.sql`         | Fix order RLS policies                                                         |
| 007 | `007_fix_storage_admin_policy.sql`      | Fix storage admin access                                                       |
| 008 | `008_seed_all_services.sql`             | Seed all 6 services                                                            |
| 009 | `009_blog_cms_enhancement.sql`          | blog_comments (BIGINT id), video_url, view_count                               |
| 010 | `010_blog_multilingual.sql`             | title_en, title_ar, content_en, content_ar on blog_posts                       |
| 011 | `011_legal_consent_columns.sql`         | has_agreed_to_terms, agreed_at on profiles                                     |
| 012 | `012_reload_schema_cache.sql`           | Schema cache reload                                                            |
| 013 | `013_interactive_platform_upgrade.sql`  | is_banned, avatar_url, parent_id, comment_likes, notifications, avatars bucket |

---

## 7. Conventions & Patterns

| Convention          | Detail                                                               |
| ------------------- | -------------------------------------------------------------------- |
| CSS Classes         | `bg-surface-card`, `border-surface-border`, `text-brand` (`#ff0000`) |
| Dark/Light mode     | Tailwind `class` strategy — `theme-manager.js` handles toggle        |
| Body language class | `lang-fr`, `lang-en`, `lang-ar` — used for font switching + RTL      |
| Logo direction      | `.site-logo` always LTR                                              |
| Supabase client     | Singleton via `getSupabaseClient()` — never instantiate directly     |
| ID generation       | **Never** generate comment IDs client-side — BIGINT auto-identity    |
| Order refs          | Generated in PostgreSQL trigger `set_order_ref` → `PX-XXXXXX`        |
| Auth guard          | `requireAuth(false)` for users, `requireAuth(true)` for admin        |
| WhatsApp link       | Built via `buildWhatsAppLink(order)` using `CONFIG.WHATSAPP_NUMBER`  |
| Services fallback   | DB fetch first → `CONFIG.SERVICES[]` as fallback                     |

---

## 8. Quick Reference: Supabase Config

| Key             | Value                                          |
| --------------- | ---------------------------------------------- |
| Project URL     | `https://spxayctwyigpyetprkej.supabase.co`     |
| Auth Provider   | Google OAuth                                   |
| Edge Functions  | `google-shopping-feed`                         |
| Storage Buckets | `payment-proofs` (private), `avatars` (public) |

---

_This document reflects the project state as of migration 013. Update it when new migrations or features are added._
