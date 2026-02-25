-- ============================================================
-- Migration 011: Add legal consent columns to profiles
-- Stores whether the user agreed to Terms, Privacy & Refund Policy
-- and the exact timestamp — required for legal audit trails.
-- ============================================================

-- Add consent columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS has_agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS agreed_at TIMESTAMPTZ;

-- Update the trigger function so new sign-ups automatically
-- persist the consent flags from user_metadata.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, has_agreed_to_terms, agreed_at)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'has_agreed_to_terms')::boolean, false),
    CASE
      WHEN new.raw_user_meta_data->>'agreed_at' IS NOT NULL
        THEN (new.raw_user_meta_data->>'agreed_at')::timestamptz
      ELSE NULL
    END
  );
  RETURN new;
END;
$$;
