"use client";

import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");
    const status_description = searchParams.get("status_description");
    const error = searchParams.get("error");
    const error_description = searchParams.get("error_description");

    if (error) {
      toast.message("Hmm something went wrong...", {
        description: error_description,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-destructive group-[.toaster]:text-foreground group-[.toaster]:border-destructive group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-foreground",
        },
      });
    }

    if (status) {
      toast.message("Success!", {
        description: status_description,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
        },
      });
    }

    if (error || status) {
      // Clear any 'error', 'status', 'status_description', and 'error_description' search params
      // so that the toast doesn't show up again on refresh, but leave any other search params
      // intact.
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const paramsToRemove = [
        "error",
        "status",
        "status_description",
        "error_description",
      ];
      paramsToRemove.forEach((param) => newSearchParams.delete(param));
      const redirectPath = `${pathname}?${newSearchParams.toString()}`;
      router.replace(redirectPath, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
