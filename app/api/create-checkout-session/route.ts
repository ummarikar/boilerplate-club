import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getStripeSession } from "@/lib/stripe";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { priceId, type = "recurring" } = await req.json();

    try {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const session = await getStripeSession(
        user?.id,
        user?.email,
        priceId,
        type,
      );

      if (session) {
        return new Response(JSON.stringify({ sessionId: session.id }), {
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({
            error: { statusCode: 500, message: "Session is not defined" },
          }),
          { status: 500 },
        );
      }
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
