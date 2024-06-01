import Stripe from "stripe";
import { createOrRetrieveCustomer } from "@/lib/supabase/admin";
import { getURL } from "@/lib/utils";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function getStripeSession(
  uuid: string,
  email: string,
  priceId: string,
  type = "recurring",
  quantity = 1,
  metadata = {},
) {
  const customer = await createOrRetrieveCustomer({
    uuid,
    email,
  });

  let session;
  if (type === "recurring") {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      customer_update: {
        address: "auto",
      },
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        metadata,
      },
      success_url: `${getURL()}/dashboard`,
      cancel_url: `${getURL()}/`,
    });
  } else if (type === "one_time") {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer,
      customer_update: {
        address: "auto",
      },
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${getURL()}/dashboard`,
      cancel_url: `${getURL()}/`,
    });
  }

  return session;
}
