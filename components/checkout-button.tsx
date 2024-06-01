"use client";
import { useState } from "react";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";
import config from "@/lib/config";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import axios from "axios";
import { Icons } from "@/components/icons";
import { getSubscription, getUser } from "@/lib/supabase/server";

export default function CheckoutButton({ priceId }: { priceId: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const user = await getUser(supabase);

      if (!user) {
        router.push(`${config.urls.login}?priceId=${priceId}`);
        return;
      }

      const subscription = await getSubscription(supabase);

      if (subscription) {
        router.push(`/dashboard`);
        return;
      }

      const {
        data: { sessionId },
      }: { data: { sessionId: string } } = await axios.post(
        "/api/create-checkout-session",
        {
          priceId,
        },
      );

      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <Button
      disabled={isLoading}
      className="btn w-full rounded-full py-5"
      onClick={handlePayment}
    >
      {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : ""}
      Get {config.name}
    </Button>
  );
}
