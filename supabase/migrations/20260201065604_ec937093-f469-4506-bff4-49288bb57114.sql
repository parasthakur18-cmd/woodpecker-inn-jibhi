-- Create a table to store booking inquiries
CREATE TABLE public.booking_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but allow public inserts for contact form)
ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert booking inquiries (public contact form)
CREATE POLICY "Anyone can submit booking inquiries"
ON public.booking_inquiries
FOR INSERT
WITH CHECK (true);

-- Only authenticated admins could read (for future admin panel)
-- For now, no select policy means only service role can read