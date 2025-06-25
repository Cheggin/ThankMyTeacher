-- This script creates a simple 'people' table linked to auth.users.
-- It is intentionally kept minimal as requested.

-- 1. Create the 'people' table
CREATE TABLE public.people (
  -- This is the foreign key to auth.users, as requested. It is also the primary key.
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- The following columns are examples. They will be populated from auth.users by the trigger.
  email TEXT,
  full_name TEXT,
  avatar_url TEXT
  
  -- You can add any other columns you need for your profiles here.
);

-- 2. Add comments for clarity
COMMENT ON TABLE public.people IS 'Public user profiles, extending auth.users.';
COMMENT ON COLUMN public.people.user_id IS 'References the id of the user in auth.users.';

-- 3. Create a function to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a new row into public.people, copying data from the new auth.users record.
  INSERT INTO public.people (user_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create a trigger to call the function when a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Enable Row Level Security (RLS) for the people table
-- This is a crucial security step.
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;

-- 6. Create a simple RLS policy: Users can only see and edit their own data.
CREATE POLICY "Users can manage their own profile data."
  ON public.people
  FOR ALL
  USING ( auth.uid() = user_id )
  WITH CHECK ( auth.uid() = user_id ); 