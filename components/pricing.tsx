"use client";

import config from "@/lib/config";
import { Tables } from "@/types/supabase";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "@/lib/framer";
import PricingCard from "@/components/pricing-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Price = Tables<"prices">;
type Product = Tables<"products"> & {
  prices: Price[];
};

type PricingProps = {
  products: Product[];
};

export default function Pricing({ products }: PricingProps) {
  return (
    <section className="bg-secondary" id="pricing">
      <div className="container overflow-hidden py-16">
        <div className="mb-16 flex w-full flex-col text-center">
          <motion.h2
            initial="initial"
            whileInView="animate"
            variants={fadeInAnimationVariants}
            viewport={{ once: true }}
            custom={0}
            className="text-3xl font-bold tracking-tight lg:text-5xl"
          >
            Get a headstart today!
          </motion.h2>
        </div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={fadeInAnimationVariants}
          viewport={{ once: true }}
          custom={1}
        >
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="mx-auto mb-12 grid max-w-lg grid-cols-2 bg-muted">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">Annually</TabsTrigger>
            </TabsList>
            <TabsContent
              value="monthly"
              className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch"
            >
              {products.map((product, i) => {
                if (product?.prices.length == 0) {
                  return null;
                }
                const price = product.prices[0];
                const priceString = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: price.currency!,
                  minimumFractionDigits: 0,
                }).format((price?.unit_amount || 0) / 100);

                return (
                  <motion.div
                    key={product.id}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInAnimationVariants}
                    custom={1}
                    className="relative w-full max-w-lg"
                  >
                    <PricingCard
                      product={product}
                      price={price}
                      priceString={priceString}
                      features={config.products[i].features}
                      type="monthly"
                      variant={config.products[i].type as "default" | "popular"}
                    />
                  </motion.div>
                );
              })}
            </TabsContent>
            <TabsContent
              value="annually"
              className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch"
            >
              {products.map((product, i) => {
                if (product?.prices.length == 0) {
                  return null;
                }
                const price = product.prices[1];
                const priceString = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: price.currency!,
                  minimumFractionDigits: 0,
                }).format((price?.unit_amount || 0) / 100);

                return (
                  <motion.div
                    key={product.id}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInAnimationVariants}
                    custom={1}
                    className="relative w-full max-w-lg"
                  >
                    <PricingCard
                      product={product}
                      price={price}
                      priceString={priceString}
                      features={config.products[i].features}
                      type="yearly"
                      variant={config.products[i].type as "default" | "popular"}
                    />
                  </motion.div>
                );
              })}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
