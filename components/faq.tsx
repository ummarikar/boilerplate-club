"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeInAnimationVariants } from "@/lib/framer";
import { motion } from "framer-motion";

const faqList: { question: string; answer: string }[] = [
  {
    question: "Is this the best boilerplate?",
    answer: "Of course it is.",
  },
  {
    question: "Does it have dark mode?",
    answer: "Of course it has dark mode.",
  },
  {
    question: "How many hours can I save with this?",
    answer: "You can save 100s of hours!",
  },
];

export default function FAQ() {
  return (
    <section className="overflow-hidden bg-background" id="faq">
      <div className="container py-16">
        <div className="mb-16 flex w-full flex-col text-center">
          <motion.h2
            initial="initial"
            whileInView="animate"
            variants={fadeInAnimationVariants}
            viewport={{ once: true }}
            custom={0}
            className="text-3xl font-bold tracking-tight lg:text-5xl"
          >
            Any questions?
          </motion.h2>
        </div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={fadeInAnimationVariants}
          viewport={{ once: true }}
          custom={1}
          className="mx-auto max-w-4xl"
        >
          <Accordion type="single" collapsible>
            {faqList.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
