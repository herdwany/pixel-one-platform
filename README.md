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

### Incremental Migration (minimal orders table – missing `details` and other columns)

If the `orders` table was created manually (e.g. from a minimal schema) and is missing required columns such as `details`, `order_ref`, `service_id`, `status`, `payment_proof_url`, `payment_proof_path`, or `updated_at`, apply the targeted migration:

```
Supabase Dashboard → SQL Editor → New query → paste database/migrations/002_add_orders_details.sql → Run
```

This migration is idempotent (`ADD COLUMN IF NOT EXISTS`) and ends with a `NOTIFY pgrst, 'reload schema'` statement to refresh the PostgREST schema cache immediately so the new columns become visible without a server restart.

**Symptom this fixes:** `PGRST204 – Could not find the 'details' column of 'orders' in the schema cache` when submitting an order from the frontend.

#### Refreshing the PostgREST schema cache manually

If you ever add columns outside of these migrations and the API still returns a PGRST204 error, trigger a cache reload by running the following in the Supabase SQL Editor:

```sql
notify pgrst, 'reload schema';
```

Alternatively, go to **Settings → API** in the Supabase Dashboard and click **Reload schema cache**.

### Applying SQL – step-by-step

1. Open your [Supabase project dashboard](https://app.supabase.com).
2. Navigate to **SQL Editor** in the left sidebar.
3. Click **+ New query**.
4. Copy the contents of the relevant SQL file and paste it into the editor.
5. Click **Run** (or press `Ctrl+Enter`).
6. Verify success: go to **Table Editor** and confirm the expected tables appear under the `public` schema.

> **Tip:** `setup.sql` is fully idempotent – all `CREATE TABLE` statements use `IF NOT EXISTS` and all `CREATE POLICY` statements are preceded by `DROP POLICY IF EXISTS`, so re-running the file is safe.
