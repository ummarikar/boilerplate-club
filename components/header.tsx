import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import config from "@/lib/config";
import SignIn from "@/components/signin-button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";

const links: {
  href: string;
  label: string;
}[] = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/#testimonials",
    label: "Testimonials",
  },
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#faq",
    label: "FAQs",
  },
];

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg">
      <nav
        className="container flex items-center justify-between py-3"
        aria-label="Global"
      >
        <div className="flex flex-row gap-8 lg:flex-1">
          <Link
            className="flex shrink-0 items-center gap-2 "
            href="/"
            title={`${config.name} home`}
          >
            <Image
              src={logo}
              alt={`${config.name} logo`}
              className="w-8"
              placeholder="blur"
              priority={true}
            />
            <span className="text-md font-bold">{config.name}</span>
          </Link>
          <div className="hidden md:flex md:items-center md:justify-start md:gap-8">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-md font-medium tracking-tight text-foreground/60 transition-colors hover:text-foreground/80"
                title={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <Sheet>
          <SheetTrigger className="md:hidden" asChild>
            <Button className="px-0" variant="link">
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex">
                <Link
                  className="flex shrink-0 items-center gap-2 "
                  href="/"
                  title={`${config.name} home`}
                >
                  <Image
                    src={logo}
                    alt={`${config.name} logo`}
                    className="w-8"
                    placeholder="blur"
                    priority={true}
                  />
                  <span className="text-md font-bold">{config.name}</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="text-md font-medium tracking-tight text-foreground/60 transition-colors hover:text-foreground/80"
                  title={link.label}
                >
                  {link.label}
                </Link>
              ))}
              <Separator className="my-2" />
              <div className="flex flex-row">
                <ThemeToggle />
                <SignIn />
              </div>
            </div>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <ThemeToggle />
          <SignIn />
        </div>
      </nav>
      <Separator />
    </header>
  );
}
