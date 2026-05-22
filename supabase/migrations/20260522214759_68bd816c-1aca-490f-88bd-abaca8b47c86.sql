
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  occasion TEXT,
  pickup_date DATE,
  message TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_quantity INTEGER NOT NULL DEFAULT 0,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- No public SELECT/UPDATE/DELETE policies => fully locked down from the client.
-- Inserts only happen through the edge function (service role), so no public INSERT policy either.

CREATE INDEX idx_orders_created_at ON public.orders (created_at DESC);
CREATE INDEX idx_orders_ip_address ON public.orders (ip_address, created_at DESC);
