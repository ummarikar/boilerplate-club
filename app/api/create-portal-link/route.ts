import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createOrRetrieveCustomer } from "@/lib/supabase/admin";
import { getURL } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw Error("Could not get user");
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.email || "",
      });

      if (!customer) throw Error("Could not get customer");
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${getURL()}/profile`,
      });
      return new Response(JSON.stringify({ url }), {
        status: 200,
      });
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500,
        },
      );
    }
  } else {
    return new Response("Method Not Allowed", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}
