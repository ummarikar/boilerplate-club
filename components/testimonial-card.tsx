"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import config from "@/lib/config";

export type TestimonialCardProps = {
  quote: string;
  name: string;
};

export default function TestimonialCard({ quote, name }: TestimonialCardProps) {
  return (
    <div className="mx-8 mb-16 w-80">
      <Card className="rounded-2xl bg-secondary shadow-lg">
        <div className="flex flex-col gap-4 p-8">
          <CardTitle>{quote}</CardTitle>
          <div className="flex flex-row gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                color={config.themeColor}
                fill={config.themeColor}
              />
            ))}
          </div>
          <div className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage
                src={`https://avatar.vercel.sh/${
                  name.split(" ")[0]
                }.svg?text=${name.match(/(\b\S)?/g).join("")}`}
                alt={"avatar"}
              />
              <AvatarFallback className="bg-background">{name}</AvatarFallback>
            </Avatar>
            <h1>{name}</h1>
          </div>
        </div>
      </Card>
    </div>
  );
}
