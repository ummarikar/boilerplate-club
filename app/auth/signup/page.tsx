import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: `Sign up page for ${config.name}.`,
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="relative grid h-screen items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={`${config.urls.login}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Log in
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-foreground" />
          <Image
            src={logo}
            alt={`${config.name} logo`}
            className="relative z-20 m-auto w-24"
            placeholder="blur"
            priority={true}
          />
        </div>
        <div className="p-8">
          <div className="mx-auto flex max-w-sm flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <div className="content-center lg:hidden">
                <Image
                  src={logo}
                  alt={`${config.name} logo`}
                  className="mx-auto my-4 w-24"
                  placeholder="blur"
                  priority={true}
                />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <Suspense fallback={<p>loading...</p>}>
              <UserAuthForm />
            </Suspense>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
