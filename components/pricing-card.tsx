import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/types/supabase";
import { Check } from "lucide-react";
import CheckoutButton from "@/components/checkout-button";

type Price = Tables<"prices">;
type Product = Tables<"products"> & {
  prices: Price[];
};

const pricingCardVariants = cva("relative rounded-2xl p-4 shadow-lg", {
  variants: {
    variant: {
      default: "",
      popular: "border-2 border-theme",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type PricingCardProps = {
  product: Product;
  price: Price;
  priceString: string;
  features: string[];
  type: "monthly" | "yearly";
} & VariantProps<typeof pricingCardVariants>;

export default function PricingCard({
  product,
  price,
  priceString,
  features,
  type,
  variant,
}: PricingCardProps) {
  return (
    <Card className={cn(pricingCardVariants({ variant }))}>
      {variant === "popular" && (
        <Badge
          variant="outline"
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 border-theme bg-theme"
        >
          Most Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex items-baseline font-bold">
          <span className="mr-2 text-5xl font-extrabold tracking-tight">
            {priceString}
          </span>
          /{type === "monthly" ? "month" : "year"}
        </div>
        <div className="flex h-full w-full flex-col justify-end space-y-2">
          <CheckoutButton priceId={price.id} />
        </div>
        <ul role="list" className="space-y-2 text-left">
          {features.map((feature, j) => (
            <li key={j} className="flex items-center space-x-3">
              <Check className="h-5 w-5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
