"use client";

import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";
import config from "@/lib/config";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader color={config.themeColor} showSpinner={false} />
      {children}
    </ThemeProvider>
  );
}
