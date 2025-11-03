-- Seed workshop types
INSERT INTO public.workshops (name, type, description, duration_hours, max_participants, price) VALUES
  (
    'Introduction to Woodworking',
    'beginner',
    'Learn the fundamentals of woodworking including safety, basic tools, and techniques. Perfect for those just starting their woodworking journey.',
    8,
    12,
    150.00
  ),
  (
    'Advanced Joinery Techniques',
    'intermediate',
    'Master complex joinery methods including dovetails, mortise and tenon, and box joints. Build a small project to practice your new skills.',
    8,
    10,
    225.00
  ),
  (
    'Furniture Making Masterclass',
    'advanced',
    'Design and build a complete piece of furniture from scratch. Learn advanced techniques in design, material selection, and finishing.',
    8,
    8,
    350.00
  );

-- Seed team members
INSERT INTO public.team_members (name, role, bio, image_url, email) VALUES
  (
    'Sarah Mitchell',
    'Master Craftsperson',
    'With over 15 years of experience in fine woodworking, Sarah specializes in traditional joinery and furniture restoration.',
    '/placeholder.svg?height=400&width=400',
    'sarah@workshop.com'
  ),
  (
    'James Chen',
    'Workshop Lead',
    'James brings 12 years of teaching experience and a passion for making woodworking accessible to everyone.',
    '/placeholder.svg?height=400&width=400',
    'james@workshop.com'
  ),
  (
    'Maria Rodriguez',
    'Design Specialist',
    'Maria combines her background in industrial design with traditional woodworking to create modern, functional pieces.',
    '/placeholder.svg?height=400&width=400',
    'maria@workshop.com'
  ),
  (
    'David Thompson',
    'Safety & Tools Expert',
    'David ensures all workshops maintain the highest safety standards while teaching proper tool usage and maintenance.',
    '/placeholder.svg?height=400&width=400',
    'david@workshop.com'
  );
