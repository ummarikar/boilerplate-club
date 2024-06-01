import * as React from "react";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CheckEmail() {
  return (
    <Card className="m-auto w-[350px] p-2 shadow-lg">
      <CardHeader>
        <svg
          className="mx-auto my-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={48}
          height={48}
        >
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b8286" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <Mail strokeWidth={3} stroke="url(#gradient)" />
        </svg>
        <CardTitle className="mx-auto my-1">Check your email</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col items-center">
          <p className="text-sm text-muted-foreground">
            A magic link was sent to your email
          </p>
          <p className="text-sm text-muted-foreground">
            Click the link to <span className="font-bold">login</span> or{" "}
            <span className="font-bold">sign up</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
