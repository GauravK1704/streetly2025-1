import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, total, deliveryAddress } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          description: `${item.category} - ${item.type}`,
        },
        unit_amount: item.price * 100, // Convert to paise (smallest currency unit)
      },
      quantity: item.quantity,
    }));

    // Add delivery fee as a separate line item
    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Fee",
          description: "Fast delivery to your location",
        },
        unit_amount: 5000, // ₹50 in paise
      },
      quantity: 1,
    });

    // Create a one-time payment session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/marketplace?canceled=true`,
      customer_creation: "always",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      metadata: {
        delivery_address: deliveryAddress || "Connaught Place, Delhi",
        order_type: "food_delivery",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});