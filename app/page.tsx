import Header from "@/components/header";
import Hero from "@/components/hero";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import { getActiveProductsWithPrices } from "@/lib/supabase/server";
import "./globals.css";
import Testimonials from "@/components/testimonials";
import Features from "@/components/features";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const products = await getActiveProductsWithPrices(supabase);

  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing products={products} />
      <FAQ />
      <Footer />
    </>
  );
}
