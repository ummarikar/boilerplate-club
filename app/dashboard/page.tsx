import Header from "@/components/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import config from "@/lib/config";
import { getStripeSession } from "@/lib/stripe";
import { createClient, getUser, getSubscription } from "@/lib/supabase/server";
import { getURL } from "@/lib/utils";
import { RocketIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type DashboardProps = {
  searchParams?: { priceId?: string };
};

export default async function Dashboard({ searchParams }: DashboardProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const [user, subscription] = await Promise.all([
    getUser(supabase),
    getSubscription(supabase),
  ]);

  if (!user) redirect(config.urls.login);

  const newPriceId = searchParams.priceId ? searchParams.priceId : null;
  if (!subscription && !newPriceId) {
    redirect(`${getURL()}#pricing`);
  }

  if (!subscription && newPriceId) {
    const stripeSession = await getStripeSession(
      user.id,
      user.email,
      newPriceId,
      "recurring",
    );
    redirect(stripeSession.url);
  }
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Alert className="m-auto max-w-lg">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>It's shipping time!</AlertTitle>
        <AlertDescription>Add your app code in this route...</AlertDescription>
      </Alert>
    </div>
  );
}
