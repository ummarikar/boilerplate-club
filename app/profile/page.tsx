import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/profile/profile-form";
import { getUser, getSubscription } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import config from "@/lib/config";

export default async function SettingsProfilePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const [user, subscription] = await Promise.all([
    getUser(supabase),
    getSubscription(supabase),
  ]);

  if (!user) redirect(config.urls.login);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm email={user.email} subscription={subscription} />
    </div>
  );
}
