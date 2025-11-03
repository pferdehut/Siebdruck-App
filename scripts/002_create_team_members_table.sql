-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view team members
CREATE POLICY "team_members_select_all"
  ON public.team_members FOR SELECT
  USING (true);

-- Only authenticated users can manage team members
CREATE POLICY "team_members_insert_auth"
  ON public.team_members FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "team_members_update_auth"
  ON public.team_members FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "team_members_delete_auth"
  ON public.team_members FOR DELETE
  USING (auth.uid() IS NOT NULL);
