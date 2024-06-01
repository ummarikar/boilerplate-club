"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import config from "@/lib/config";
import appImg from "@/public/app.png";
import { left, right, transition } from "@/lib/framer";

export default function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center gap-16 overflow-hidden py-16 lg:flex-row">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={transition}
        variants={left}
        className="flex flex-col items-center justify-center gap-8 text-center lg:items-start lg:text-left"
      >
        <h1 className="text-4xl font-extrabold tracking-tight md:-mb-4 lg:text-6xl">
          Save{" "}
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            100s
          </span>{" "}
          of hours building your SaaS
        </h1>
        <p className="text-md text-muted-foreground">
          A NextJS boilerplate with all the boring stuff already done for you.
          Spend more time on the fun stuff and ship ASAP.
        </p>
        <Button className="rounded-full px-4 py-6">
          Get {config.name} <ArrowUpRight className="ml-1 h-5 w-5" />
        </Button>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={transition}
        variants={right}
        className="lg:w-full"
      >
        <Image
          src={appImg}
          alt={`${config.name} logo`}
          className="w-full"
          width={500}
          height={500}
          placeholder="blur"
          priority={true}
        />
      </motion.div>
    </section>
  );
}
