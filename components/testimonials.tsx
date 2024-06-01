"use client";
import Ticker from "framer-motion-ticker";
import TestimonialCard, {
  TestimonialCardProps,
} from "@/components/testimonial-card";

const testimonials: TestimonialCardProps[] = [
  {
    quote:
      '"I used Boilerplate Club to build my SaaS in days. It saved me so much time. I love it! Get it now!"',
    name: "John Doe",
  },
  {
    quote:
      '"Boilerplate Club has saved me so much time. Having payments already setup for me is a game changer. It is the best!"',
    name: "Jane Doe",
  },
  {
    quote:
      '"I was skeptical about Boilerplate Club at first but it has made a huge difference. This has made my life so much easier!"',
    name: "John Smith",
  },
  {
    quote:
      '"I got my SaaS setup super quickly. Now I can start making money. This is great!"',
    name: "Jane Smith",
  },
  {
    quote: '"Boilerplate Club keeps getting better and better."',
    name: "Jon Snow",
  },
  {
    quote: '"This is the best boilerplate I have used. It is 100% worth it."',
    name: "Bruce Wayne",
  },
];

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-background" id="testimonials">
      <div className="container flex flex-col items-center justify-center pt-16">
        <h2 className="mb-16 text-3xl font-bold tracking-tight lg:text-5xl">
          Loved by many
        </h2>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 z-10">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent"></div>
          </div>
          <div className=" relative z-0 h-full w-full">
            <Ticker duration={35}>
              {testimonials.map((item, index) => (
                <TestimonialCard
                  key={index}
                  quote={item.quote}
                  name={item.name}
                />
              ))}
            </Ticker>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-r from-transparent to-background"></div>
        </div>
      </div>
    </section>
  );
}
