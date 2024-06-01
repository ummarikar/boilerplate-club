import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { deleteUser } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const { deleted } = await stripe.customers.del(data.stripe_customer_id);
        if (!deleted) throw "stripe customer could not be deleted";
      }

      await supabase.auth.signOut();
      await deleteUser(user?.id);

      return new Response("success", {
        status: 200,
      });
    } catch (err: any) {
      console.log(err);
      return new Response(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new Response("Method Not Allowed", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}
