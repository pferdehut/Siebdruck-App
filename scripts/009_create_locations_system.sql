-- Create locations table
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view locations
CREATE POLICY "locations_select_all"
  ON public.locations FOR SELECT
  USING (true);

-- Only authenticated users can manage locations
CREATE POLICY "locations_insert_auth"
  ON public.locations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "locations_update_auth"
  ON public.locations FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "locations_delete_auth"
  ON public.locations FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Insert default locations
INSERT INTO public.locations (name) VALUES ('dynamo'), ('vor Ort')
ON CONFLICT (name) DO NOTHING;

-- Create workshop_locations junction table
CREATE TABLE IF NOT EXISTS public.workshop_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workshop_id, location_id)
);

-- Enable RLS
ALTER TABLE public.workshop_locations ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view workshop locations
CREATE POLICY "workshop_locations_select_all"
  ON public.workshop_locations FOR SELECT
  USING (true);

-- Only authenticated users can manage workshop locations
CREATE POLICY "workshop_locations_insert_auth"
  ON public.workshop_locations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "workshop_locations_delete_auth"
  ON public.workshop_locations FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Migrate existing location data to junction table
INSERT INTO public.workshop_locations (workshop_id, location_id)
SELECT w.id, l.id
FROM public.workshops w
JOIN public.locations l ON l.name = w.location
WHERE w.location IS NOT NULL
ON CONFLICT (workshop_id, location_id) DO NOTHING;

-- Remove the old location column from workshops
ALTER TABLE public.workshops DROP COLUMN IF EXISTS location;
