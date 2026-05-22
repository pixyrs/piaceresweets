-- Add explicit deny-all RLS policy to orders table.
-- The submit-order edge function uses the service role key, which bypasses RLS,
-- so order creation continues to work. This policy ensures no anon/authenticated
-- client can read, insert, update, or delete orders directly via the public API.

CREATE POLICY "Deny all direct client access to orders"
  ON public.orders
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);