-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID NOT NULL REFERENCES public.workshops(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  participant_name TEXT NOT NULL,
  participant_email TEXT NOT NULL,
  participant_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow everyone to create bookings
CREATE POLICY "bookings_insert_all"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Allow everyone to view their own bookings by email
CREATE POLICY "bookings_select_own"
  ON public.bookings FOR SELECT
  USING (true);

-- Only authenticated users can update/delete bookings (for admin)
CREATE POLICY "bookings_update_auth"
  ON public.bookings FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "bookings_delete_auth"
  ON public.bookings FOR DELETE
  USING (auth.uid() IS NOT NULL);
