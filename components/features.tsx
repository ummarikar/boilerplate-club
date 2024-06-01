"use client";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "@/lib/framer";
import { Brush, Code2, CreditCard, Database, Lock, Mail } from "lucide-react";
import FeatureCard from "@/components/feature-card";
import { ReactNode } from "react";

type feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

const features: feature[] = [
  {
    title: "Framework",
    description:
      "Built in NextJs 14 with the App Router. Includes examples of new tools like server actions.",
    icon: <Code2 className="m-auto text-background" />,
  },
  {
    title: "The best UI ever",
    description:
      "Comes with shadcn/ui with a light and dark theme. Tailwind for styling. Framer motion for animations.",
    icon: <Brush className="m-auto text-background" />,
  },
  {
    title: "Authentication",
    description:
      "Authentication provided by Supabase. Comes with magic link and Google auth sign in.",
    icon: <Lock className="m-auto text-background" />,
  },
  {
    title: "Database",
    description:
      "Postgresql database provided by Supabase. Includes example of mangaing user subscriptions.",
    icon: <Database className="m-auto text-background" />,
  },
  {
    title: "Payments",
    description:
      "Payments are processed using Stripe. The example given is a subscription plan.",
    icon: <CreditCard className="m-auto text-background" />,
  },
  {
    title: "Emails",
    description:
      "Emails are sent using Resend. Includes some custom react email examples.",
    icon: <Mail className="m-auto text-background" />,
  },
];

export default function Features() {
  return (
    <section className="bg-secondary" id="features">
      <div className="container flex flex-col items-center justify-center py-16">
        <h2 className="mb-16 text-center text-3xl font-bold tracking-tight lg:text-5xl">
          Everything you need to get started
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="initial"
              whileInView="animate"
              variants={fadeInAnimationVariants}
              viewport={{ once: true }}
              custom={0}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
              >
                {feature.icon}
              </FeatureCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
