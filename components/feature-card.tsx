import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ReactNode } from "react";

type FeatureCardProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  children,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="h-full w-full rounded-2xl p-2">
      <CardHeader>
        <div className="border-md flex h-12 w-12 rounded-md bg-foreground">
          {children}
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="font-semibold">{title}</h2>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
