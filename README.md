# pixel-one-platform
Digital Service Marketplace for Pixel One Agency.

## Database Setup

### First-time setup

1. Open your [Supabase project](https://app.supabase.com) → **SQL Editor**.
2. Copy the entire contents of [`database/setup.sql`](database/setup.sql) and run it.  
   This creates all tables (`profiles`, `services`, `orders`, `blog_posts`), triggers, RLS policies, the `payment-proofs` storage bucket, and seed data.
3. After the SQL runs successfully, **refresh the PostgREST schema cache** so the API recognises the new tables immediately:
   - Go to your project **Settings → API**.
   - Click **Reload schema** (or wait ~1 minute for the automatic refresh).

> **Note:** If you see an error like *"Could not find the table 'public.orders' in the schema cache"* (or similar for any table such as `blog_posts`), it means either the `setup.sql` has not been applied yet, or the schema cache needs to be refreshed. Follow the steps above to fix it.

### Existing projects (migration)

If you already have the database but are missing the `payment_proof_path` column on `orders`, run:

```sql
-- database/migration_add_payment_proof_path.sql
alter table public.orders
  add column if not exists payment_proof_path text;
```

### Configuration

Copy your Supabase project URL and anon key into [`assets/js/config.js`](assets/js/config.js):

```js
const CONFIG = {
  SUPABASE_URL: "https://<project-ref>.supabase.co",
  SUPABASE_ANON_KEY: "<your-anon-key>",
  WHATSAPP_NUMBER: "212600000000",
};
```

