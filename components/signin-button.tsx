import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import config from "@/lib/config";
import { createClient, getUser } from "@/lib/supabase/server";
import Link from "next/link";
import ProfileDropdown from "@/components/profile-dropdown";
import { cookies } from "next/headers";

const signOut = async () => {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();

  return redirect("/");
};

export default async function SigninButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getUser(supabase);

  return user ? (
    <ProfileDropdown userId={user.id} email={user.email} signOut={signOut} />
  ) : (
    <Button variant="ghost" asChild>
      <Link href={config.urls.login}>Log in</Link>
    </Button>
  );
}
