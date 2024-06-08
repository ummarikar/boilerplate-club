import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import config from "@/lib/config";
import { getURL } from "@/lib/utils";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
  const requestUrl = new URL(request.url);
  const priceId = requestUrl.searchParams.get("priceId");
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${config.urls.login}?error=${encodeURI(
          error.name,
        )}&error_description=${encodeURI(
          "Sorry we weren't able to log you in. Please try again.",
        )}`,
      );
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    `${getURL()}${config.urls.callback}${priceId ? `?priceId=${priceId}` : ""
    }`,
  );
}
