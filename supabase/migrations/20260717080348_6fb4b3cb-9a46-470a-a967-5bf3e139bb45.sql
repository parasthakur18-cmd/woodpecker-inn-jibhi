-- Enum for lead status
DO $$ BEGIN
  CREATE TYPE public.lead_status AS ENUM ('New', 'Contacted', 'Follow-up', 'Confirmed', 'Lost');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Main table
CREATE TABLE IF NOT EXISTS public.website_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_name TEXT NOT NULL DEFAULT 'The Woodpecker Inn',
  website TEXT NOT NULL DEFAULT 'thewoodpeckerinn.in',
  guest_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  check_in_date DATE,
  check_out_date DATE,
  room_type TEXT,
  enquiry_source TEXT DEFAULT 'popup',
  page_url TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_type TEXT,
  browser TEXT,
  operating_system TEXT,
  country TEXT,
  city TEXT,
  status public.lead_status NOT NULL DEFAULT 'New',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- GRANTs (Data API access)
GRANT SELECT, INSERT, UPDATE ON public.website_leads TO authenticated;
GRANT INSERT ON public.website_leads TO anon;
GRANT ALL ON public.website_leads TO service_role;

-- Enable RLS
ALTER TABLE public.website_leads ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT a lead (submit from popup)
CREATE POLICY "Anyone can submit a lead"
  ON public.website_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(guest_name) BETWEEN 1 AND 100
    AND char_length(mobile_number) BETWEEN 6 AND 20
    AND (room_type IS NULL OR char_length(room_type) <= 100)
    AND (notes IS NULL OR char_length(notes) <= 2000)
  );

-- Only signed-in staff can read leads
CREATE POLICY "Authenticated users can read leads"
  ON public.website_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Only signed-in staff can update leads (status, notes)
CREATE POLICY "Authenticated users can update leads"
  ON public.website_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Indexes for dashboard queries
CREATE INDEX IF NOT EXISTS idx_website_leads_created_at ON public.website_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_leads_status ON public.website_leads (status);
CREATE INDEX IF NOT EXISTS idx_website_leads_mobile ON public.website_leads (mobile_number);
CREATE INDEX IF NOT EXISTS idx_website_leads_property ON public.website_leads (property_name);
CREATE INDEX IF NOT EXISTS idx_website_leads_room_type ON public.website_leads (room_type);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_website_leads_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_website_leads_updated_at ON public.website_leads;
CREATE TRIGGER trg_website_leads_updated_at
BEFORE UPDATE ON public.website_leads
FOR EACH ROW EXECUTE FUNCTION public.update_website_leads_updated_at();

-- Prevent duplicate rapid submissions from the same phone within 60 seconds
CREATE OR REPLACE FUNCTION public.prevent_duplicate_website_leads()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.website_leads
    WHERE mobile_number = NEW.mobile_number
      AND property_name = NEW.property_name
      AND created_at > now() - interval '60 seconds'
  ) THEN
    RAISE EXCEPTION 'duplicate_submission';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_website_leads_dedupe ON public.website_leads;
CREATE TRIGGER trg_website_leads_dedupe
BEFORE INSERT ON public.website_leads
FOR EACH ROW EXECUTE FUNCTION public.prevent_duplicate_website_leads();