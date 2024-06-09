"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Icons } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/supabase";

const profileFormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

type Subscription = Tables<"subscriptions"> & {
  prices: Tables<"prices"> & {
    products: Tables<"products">;
  };
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type ProfileFormProps = {
  email: string;
  subscription: Subscription | undefined;
};

export function ProfileForm({ email, subscription }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const supabase = createClient();
  const redirectToCustomerPortal = async () => {
    setIsLoading(true);
    try {
      const {
        data: { url },
      }: { data: { url: string } } = await axios.post(
        "/api/create-portal-link",
      );
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/auth/delete-user");
      router.push(
        `/?status=${encodeURI("success")}&status_description=${encodeURI(
          "Your account has been successfully deleted.",
        )}`,
      );
    } catch (error) {
      if (error) return alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ email: data.email });
    if (error) {
      router.push(
        `/profile?error=${encodeURI(error.name)}&error_description=${encodeURI(
          "Could not update your email.",
        )}`,
      );
      return;
    }
    router.push(
      `/profile?status=${encodeURI("success")}&status_description=${encodeURI(
        "Please check both email inboxes to confirm the change.",
      )}`,
    );
    setIsLoading(false);
  }

  const plan = subscription && subscription.prices.products.name;
  const price =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription.prices.currency!,
      minimumFractionDigits: 0,
    }).format((subscription.prices.unit_amount || 0) / 100);

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-md border p-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormDescription>
                  The email associated with this account.
                </FormDescription>
                <FormControl>
                  <Input defaultValue={email} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-baseline justify-between gap-2 sm:flex-row sm:gap-0">
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update email
            </Button>
            <p className="text-sm text-muted-foreground">
              We will send you a verification email.
            </p>
          </div>
        </form>
      </Form>
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex w-full flex-col space-y-1">
            <div className="mb-2 flex flex-col justify-between sm:flex-row">
              <div>
                <p className="mb-2 mt-1 text-sm font-medium leading-none">
                  Current plan
                </p>
                <p className="text-sm text-muted-foreground">
                  {plan
                    ? `Your current active plan is ${plan}.`
                    : "You do not have an active plan."}
                </p>
              </div>
              <div className="flex items-baseline">
                {price && (
                  <>
                    <span className="ml-2 mr-1 mt-2 inline-block align-bottom text-2xl font-extrabold tracking-tight sm:ml-0">
                      {price}
                    </span>
                    <p className="text-sm text-muted-foreground">
                      /{subscription.prices.interval}
                    </p>
                  </>
                )}
              </div>
            </div>
            <Separator />
            <div className="flex flex-col items-baseline justify-between gap-2 sm:flex-row sm:gap-0">
              <Button
                disabled={isLoading}
                className="mt-2"
                onClick={redirectToCustomerPortal}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Manage subscription
              </Button>
              <p className="text-sm text-muted-foreground">
                Manage your stripe subscription here.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-4 rounded-md border border-red-400 p-4">
          <div className="flex w-full flex-col space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-2 mt-1 text-sm font-medium leading-none">
                  Danger zone
                </p>
                <p className="text-sm text-muted-foreground">
                  Delete your account here.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={isLoading}
                    className="bg-red-500 hover:bg-red-500/90"
                    variant="outline"
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Delete account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will end any existing subscriptions and remove your
                      account from our database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deleteAccount}
                      className="bg-red-500 text-white hover:bg-red-500/90"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
