-- ====================================================================
-- NOVACODE QR + NFC SOLUTIONS — DATABASE & AUTHENTICATION SCHEMA
-- ====================================================================

-- 1. Create Role Enumeration
CREATE TYPE user_role AS ENUM ('owner', 'staff', 'customer');

-- 2. Create User Profiles Table linked to Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'customer'::user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies:
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Staff can read customer profiles
CREATE POLICY "Staff can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('staff', 'owner')
    )
  );

-- Only Super Admin / Owner can update roles
CREATE POLICY "Only owners can update roles"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'owner'
    )
  );

-- Users can update non-privileged profile info (e.g. name, avatar)
CREATE POLICY "Users can update own details"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    -- Prevent users from escalating their own role
    role = (SELECT role FROM public.profiles WHERE id = auth.uid())
  );

-- 5. Automatic Profile Trigger on Auth Signup
-- This handles BOTH email signup and Google OAuth signup securely!
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL),
    'customer'::user_role -- STRICT DEFAULT: Public signups are ALWAYS customers
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Helper Query to Seed Initial Owner Account:
-- To promote your account to Owner, run in Supabase SQL Editor:
-- UPDATE public.profiles SET role = 'owner' WHERE email = 'your-email@domain.com';
