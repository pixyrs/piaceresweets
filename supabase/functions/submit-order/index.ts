// @ts-nocheck
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ItemSchema = z.object({
  id: z.string().min(1).max(50),
  name: z.string().min(1).max(120),
  quantity: z.number().int().min(1).max(200),
});

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  occasion: z.string().trim().max(120).optional().or(z.literal("")),
  pickup_date: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  items: z.array(ItemSchema).min(1).max(50),
});

const MAX_ORDERS_PER_IP_PER_DAY = 3;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "method_not_allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const raw = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "validation_failed", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = parsed.data;
    const totalQuantity = data.items.reduce((s, i) => s + i.quantity, 0);
    if (totalQuantity < 1) {
      return new Response(JSON.stringify({ error: "empty_order" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Capture IP (Supabase / Cloudflare populate these)
    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || null;

    // Rate limit per IP: max N orders per 24h
    if (ip && ip !== "unknown") {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { count, error: countErr } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("ip_address", ip)
        .gte("created_at", since);

      if (!countErr && typeof count === "number" && count >= MAX_ORDERS_PER_IP_PER_DAY) {
        return new Response(
          JSON.stringify({
            error: "rate_limited",
            message: `Too many orders from this address in the last 24 hours (limit ${MAX_ORDERS_PER_IP_PER_DAY}).`,
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    const { error: insertErr } = await supabase.from("orders").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      occasion: data.occasion || null,
      pickup_date: data.pickup_date ? data.pickup_date : null,
      message: data.message || null,
      items: data.items,
      total_quantity: totalQuantity,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (insertErr) {
      console.error("Insert error:", insertErr);
      return new Response(JSON.stringify({ error: "insert_failed", message: insertErr.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    const message = err instanceof Error ? err.message : "unknown_error";
    return new Response(JSON.stringify({ error: "server_error", message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
