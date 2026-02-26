## Blog Translation Edge Function (Production)

The admin blog editor now supports automatic multilingual publishing (FR/EN/AR) using a dedicated Supabase Edge Function:

- Function path: `supabase/functions/blog-translate/index.ts`
- Function name: `blog-translate`
- Called from admin panel during blog save/publish

### Deploy

```bash
supabase functions deploy blog-translate
```

### Required secrets

Set these in your Supabase project (Dashboard → Edge Functions → Secrets):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional:

- `ALLOWED_ORIGIN` (default: `https://www.pixelonevisuals.tech`)
- `BLOG_TRANSLATE_ENDPOINT` (default: MyMemory API endpoint)

### Security model

- Function requires authenticated user token (`Authorization: Bearer ...`).
- Function checks `profiles.role === 'admin'` before performing translation.
- Non-admin requests are rejected with `403 Forbidden`.

# pixel-one-platform

Digital Service Marketplace for Pixel One Agency.

## Database Setup

### Fresh Project (no tables yet)

Run **`database/setup.sql`** once in the Supabase SQL Editor.  
This single file creates all required tables (`profiles`, `services`, `orders`), configures Row-Level Security policies, creates the `payment-proofs` storage bucket, and seeds the initial service catalogue.

```
Supabase Dashboard → SQL Editor → New query → paste setup.sql → Run
```

### Existing Project (only `public.profiles` exists)

If `public.services` and/or `public.orders` are missing (e.g. the initial run was interrupted), apply the targeted migration:

```
Supabase Dashboard → SQL Editor → New query → paste database/migrations/001_create_services_and_orders.sql → Run
```

This migration is idempotent (`CREATE TABLE IF NOT EXISTS`, `DROP POLICY IF EXISTS`) and safe to re-run.

### Incremental Migration (older `orders` table)

If you have an older project where `public.orders` is missing one or more columns (e.g. `order_ref`, `service_id`, `details`, `payment_proof_url`, `payment_proof_path`), apply the comprehensive migration:

```
Supabase Dashboard → SQL Editor → New query → paste database/migration_add_payment_proof_path.sql → Run
```

This migration uses `ADD COLUMN IF NOT EXISTS` for every column and `CREATE UNIQUE INDEX IF NOT EXISTS` for the `order_ref` index, so it is **fully idempotent** and safe to re-run.

> **Schema cache delay:** After applying the migration, PostgREST may take up to 60 seconds to refresh its schema cache. If you still see a `PGRST204: Could not find the 'payment_proof_path' column` error immediately after running the migration, wait one minute and retry, or navigate to **Supabase Dashboard → Settings → API → Reload schema cache**.

### Applying SQL – step-by-step

1. Open your [Supabase project dashboard](https://app.supabase.com).
2. Navigate to **SQL Editor** in the left sidebar.
3. Click **+ New query**.
4. Copy the contents of the relevant SQL file and paste it into the editor.
5. Click **Run** (or press `Ctrl+Enter`).
6. Verify success: go to **Table Editor** and confirm the expected tables appear under the `public` schema.

> **Tip:** `setup.sql` is fully idempotent – all `CREATE TABLE` statements use `IF NOT EXISTS` and all `CREATE POLICY` statements are preceded by `DROP POLICY IF EXISTS`, so re-running the file is safe.

## Verifying the `public.orders` Table Schema

After running the setup, you can inspect the `public.orders` columns directly in the Supabase SQL Editor:

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name   = 'orders'
ORDER BY ordinal_position;
```

Expected results:

| column_name        | data_type                | is_nullable | column_default               |
| ------------------ | ------------------------ | ----------- | ---------------------------- |
| id                 | bigint                   | NO          | generated always as identity |
| order_ref          | text                     | NO          |                              |
| user_id            | uuid                     | YES         |                              |
| service_id         | bigint                   | YES         |                              |
| status             | text                     | NO          | 'pending'::text              |
| details            | jsonb                    | YES         |                              |
| payment_proof_url  | text                     | YES         |                              |
| payment_proof_path | text                     | YES         |                              |
| created_at         | timestamp with time zone | NO          | now()                        |
| updated_at         | timestamp with time zone | NO          | now()                        |

- **`id`** – auto-incrementing primary key.
- **`order_ref`** – unique human-readable order reference (e.g. `ORD-XXXXXXXX`).
- **`user_id`** – references `auth.users`; `NULL` for anonymous orders.
- **`service_id`** – references `public.services`; set to `NULL` if the service is deleted.
- **`status`** – one of `pending`, `in_progress`, `review`, `done`.
- **`details`** – freeform JSON payload (client notes, revision requests, etc.).
- **`payment_proof_url`** – public URL of the uploaded payment proof (legacy).
- **`payment_proof_path`** – Storage object path inside the `payment-proofs` bucket.
- **`created_at`** / **`updated_at`** – managed automatically by the database.
