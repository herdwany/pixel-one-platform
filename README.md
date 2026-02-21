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

### Incremental Migration (`payment_proof_path` column)

If you have an older project that is missing the `payment_proof_path` column on the `orders` table:

```
Supabase Dashboard → SQL Editor → New query → paste database/migration_add_payment_proof_path.sql → Run
```

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

| column_name        | data_type                   | is_nullable | column_default                    |
|--------------------|-----------------------------|-------------|-----------------------------------|
| id                 | bigint                      | NO          | generated always as identity      |
| order_ref          | text                        | NO          |                                   |
| user_id            | uuid                        | YES         |                                   |
| service_id         | bigint                      | YES         |                                   |
| status             | text                        | NO          | 'pending'::text                   |
| details            | jsonb                       | YES         |                                   |
| payment_proof_url  | text                        | YES         |                                   |
| payment_proof_path | text                        | YES         |                                   |
| created_at         | timestamp with time zone    | NO          | now()                             |
| updated_at         | timestamp with time zone    | NO          | now()                             |

- **`id`** – auto-incrementing primary key.
- **`order_ref`** – unique human-readable order reference (e.g. `ORD-XXXXXXXX`).
- **`user_id`** – references `auth.users`; `NULL` for anonymous orders.
- **`service_id`** – references `public.services`; set to `NULL` if the service is deleted.
- **`status`** – one of `pending`, `in_progress`, `review`, `done`.
- **`details`** – freeform JSON payload (client notes, revision requests, etc.).
- **`payment_proof_url`** – public URL of the uploaded payment proof (legacy).
- **`payment_proof_path`** – Storage object path inside the `payment-proofs` bucket.
- **`created_at`** / **`updated_at`** – managed automatically by the database.
