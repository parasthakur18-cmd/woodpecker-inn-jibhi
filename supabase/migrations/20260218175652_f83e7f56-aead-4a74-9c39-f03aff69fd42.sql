-- Allow reading booking inquiries (for admin page)
CREATE POLICY "Anyone can read booking inquiries"
ON public.booking_inquiries
FOR SELECT
USING (true);