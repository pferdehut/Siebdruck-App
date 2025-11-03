-- Update workshops table schema
-- Change duration_hours to time range fields
-- Change type (skill level) to location

-- Add new columns for time range
ALTER TABLE public.workshops 
ADD COLUMN IF NOT EXISTS duration_from TIME,
ADD COLUMN IF NOT EXISTS duration_to TIME,
ADD COLUMN IF NOT EXISTS location TEXT CHECK (location IN ('dynamo', 'vor Ort'));

-- Migrate existing duration_hours data to time ranges (assuming workshops start at 9:00)
UPDATE public.workshops 
SET 
  duration_from = '09:00:00',
  duration_to = ('09:00:00'::time + (duration_hours || ' hours')::interval)::time,
  location = CASE 
    WHEN type = 'beginner' THEN 'dynamo'
    WHEN type = 'intermediate' THEN 'vor Ort'
    ELSE 'dynamo'
  END
WHERE duration_from IS NULL;

-- Drop old columns after migration
ALTER TABLE public.workshops 
DROP COLUMN IF EXISTS duration_hours,
DROP COLUMN IF EXISTS type;

-- Make new columns required
ALTER TABLE public.workshops 
ALTER COLUMN duration_from SET NOT NULL,
ALTER COLUMN duration_to SET NOT NULL,
ALTER COLUMN location SET NOT NULL;
