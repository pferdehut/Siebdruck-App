-- Create workshops table
CREATE TABLE IF NOT EXISTS public.workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('beginner', 'intermediate', 'advanced')),
  duration_hours INTEGER NOT NULL DEFAULT 8,
  max_participants INTEGER NOT NULL DEFAULT 12,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view workshops
CREATE POLICY "workshops_select_all"
  ON public.workshops FOR SELECT
  USING (true);

-- Only authenticated users can manage workshops (for future admin panel)
CREATE POLICY "workshops_insert_auth"
  ON public.workshops FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "workshops_update_auth"
  ON public.workshops FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "workshops_delete_auth"
  ON public.workshops FOR DELETE
  USING (auth.uid() IS NOT NULL);
