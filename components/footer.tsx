import Link from "next/link";
import Image from "next/image";
import config from "@/lib/config";
import logo from "@/public/logo.png";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background">
      <Separator />
      <div className="container flex flex-col gap-16 py-16 md:flex-row">
        <div className="w-full flex-shrink-0 text-start md:w-1/2 md:text-left">
          <Link
            href="/#"
            aria-current="page"
            className="flex items-center justify-start gap-2 md:justify-start"
          >
            <Image
              src={logo}
              alt={`${config.name} logo`}
              priority={true}
              className="w-8"
            />
            <span className="text-md font-bold">{config.name}</span>
          </Link>

          <p className="mt-2 text-sm">Save 100s of hours building your SaaS</p>
          <p className="mt-1 text-sm">
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-2 md:gap-6">
          <div>
            <div className="footer-title text-base-content mb-4 text-left text-sm font-semibold tracking-widest md:text-left">
              HELP
            </div>

            <div className="mb-8 flex flex-col items-start justify-start gap-2 text-sm md:items-start">
              <Link href="/" className="link link-hover">
                Home
              </Link>
              <Link href="/" className="link link-hover">
                About
              </Link>
              <Link href="/#pricing" className="link link-hover">
                Pricing
              </Link>
              <Link href="/" className="link link-hover">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <div className="footer-title text-base-content mb-4 text-left text-sm font-semibold tracking-widest md:text-left">
              LEGAL
            </div>

            <div className="mb-8 flex flex-col items-start justify-center gap-2 text-sm md:items-start">
              <Link href="/" className="link link-hover">
                Privacy Policy
              </Link>
              <Link href="/" className="link link-hover">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
