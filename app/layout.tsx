import { ReactNode, Suspense } from "react";
import { GeistSans } from "geist/font";
import Providers from "@/components/providers";
import "./globals.css";
import { Metadata } from "next";
import { Viewport } from "next";
import config from "@/lib/config";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: config.name,
  description:
    "A NextJs boilerplate with a database, authentication, payments, emails and more already setup for you.",
};

export const viewport: Viewport = {
  themeColor: config.themeColor,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head></head>
      <body>
        <Providers>{children}</Providers>
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
