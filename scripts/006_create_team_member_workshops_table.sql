-- Create team_member_workshops junction table
CREATE TABLE IF NOT EXISTS public.team_member_workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID NOT NULL REFERENCES public.team_members(id) ON DELETE CASCADE,
  workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_member_id, workshop_id)
);

-- Enable RLS
ALTER TABLE public.team_member_workshops ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view team member workshop assignments
CREATE POLICY "team_member_workshops_select_all"
  ON public.team_member_workshops FOR SELECT
  USING (true);

-- Only authenticated users can manage assignments
CREATE POLICY "team_member_workshops_insert_auth"
  ON public.team_member_workshops FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "team_member_workshops_delete_auth"
  ON public.team_member_workshops FOR DELETE
  USING (auth.uid() IS NOT NULL);
