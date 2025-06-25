-- Enable public read access to thank_yous table for the map
-- This allows the map to show thank you's from all users without requiring authentication

-- First, ensure RLS is enabled on the thank_yous table
ALTER TABLE public.thank_yous ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies that might restrict read access
DROP POLICY IF EXISTS "Users can only read their own thank yous" ON public.thank_yous;
DROP POLICY IF EXISTS "Public can read thank yous" ON public.thank_yous;
DROP POLICY IF EXISTS "Users can insert their own thank yous" ON public.thank_yous;
DROP POLICY IF EXISTS "Users can update their own thank yous" ON public.thank_yous;
DROP POLICY IF EXISTS "Users can delete their own thank yous" ON public.thank_yous;

-- Create a policy that allows public read access to thank_yous
-- This is needed for the map to show all thank you's from all users
CREATE POLICY "Public can read thank yous"
  ON public.thank_yous
  FOR SELECT
  USING (true);

-- Keep existing policies for insert/update/delete operations
-- Users should still only be able to create/edit their own thank you's
CREATE POLICY "Users can insert their own thank yous"
  ON public.thank_yous
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own thank yous"
  ON public.thank_yous
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own thank yous"
  ON public.thank_yous
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add comments for clarity
COMMENT ON POLICY "Public can read thank yous" ON public.thank_yous IS 'Allows public read access for the map functionality';
COMMENT ON POLICY "Users can insert their own thank yous" ON public.thank_yous IS 'Users can only create thank yous for themselves';
COMMENT ON POLICY "Users can update their own thank yous" ON public.thank_yous IS 'Users can only update their own thank yous';
COMMENT ON POLICY "Users can delete their own thank yous" ON public.thank_yous IS 'Users can only delete their own thank yous'; 