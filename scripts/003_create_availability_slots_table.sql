-- Create availability_slots table
CREATE TABLE IF NOT EXISTS public.availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID NOT NULL REFERENCES public.team_members(id) ON DELETE CASCADE,
  workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_member_id, workshop_id, date)
);

-- Enable RLS
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view availability
CREATE POLICY "availability_select_all"
  ON public.availability_slots FOR SELECT
  USING (true);

-- Only authenticated users can manage availability
CREATE POLICY "availability_insert_auth"
  ON public.availability_slots FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "availability_update_auth"
  ON public.availability_slots FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "availability_delete_auth"
  ON public.availability_slots FOR DELETE
  USING (auth.uid() IS NOT NULL);
