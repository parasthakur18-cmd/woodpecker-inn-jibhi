
-- Restrict booking_inquiries reads to authenticated staff only
DROP POLICY IF EXISTS "Anyone can read booking inquiries" ON public.booking_inquiries;
REVOKE SELECT ON public.booking_inquiries FROM anon;
REVOKE SELECT ON public.website_leads FROM anon;
CREATE POLICY "Authenticated users can read booking inquiries"
  ON public.booking_inquiries FOR SELECT TO authenticated USING (true);
