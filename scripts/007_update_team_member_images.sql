-- First, add a unique constraint to the name column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'team_members_name_key'
  ) THEN
    ALTER TABLE public.team_members ADD CONSTRAINT team_members_name_key UNIQUE (name);
  END IF;
END $$;

-- Update or insert team member Christa with creative workspace image
INSERT INTO public.team_members (name, role, bio, image_url, email)
VALUES (
  'Christa',
  'Creative Director',
  'Christa brings a unique blend of artistic vision and technical expertise to every workshop.',
  '/creative-workspace.jpg',
  'christa@workshop.com'
)
ON CONFLICT (name) 
DO UPDATE SET 
  image_url = EXCLUDED.image_url,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email;

-- Update or insert team member Flavia with key image
INSERT INTO public.team_members (name, role, bio, image_url, email)
VALUES (
  'Flavia',
  'Workshop Coordinator',
  'Flavia is the key to making every workshop run smoothly, coordinating schedules and ensuring great experiences.',
  '/key-image.jpg',
  'flavia@workshop.com'
)
ON CONFLICT (name) 
DO UPDATE SET 
  image_url = EXCLUDED.image_url,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email;
