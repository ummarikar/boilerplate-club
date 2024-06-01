const config = {
  name: "Boilerplate Club",
  themeColor: "#2dd4bf",
  products: [
    {
      type: "default",
      features: [
        "NextJS Boilerplate (Typescript)",
        "UI with shadcn/ui and Tailwind (dark mode included)",
        "Database and authentication with Supabase",
        "Emails with Resend and React Email",
        "Payments with Stripe (including webhook)",
      ],
    },
    {
      type: "popular",
      features: [
        "NextJS Boilerplate (Typescript)",
        "UI with shadcn/ui and Tailwind (dark mode included)",
        "Database and authentication with Supabase",
        "Emails with Resend and React Email",
        "Payments with Stripe (including webhook)",
        "Lifetime updates",
      ],
    },
    {
      type: "default",
      features: [
        "NextJS Boilerplate (Typescript)",
        "UI with shadcn/ui and Tailwind (dark mode included)",
        "Database and authentication with Supabase",
        "Emails with Resend and React Email",
        "Payments with Stripe (including webhook)",
        "Lifetime updates",
        "24/7 support",
      ],
    },
  ],
  urls: {
    login: "/auth/login",
    signup: "/auth/signup",
    callback: "/dashboard",
  },
  email: {
    from: "Boilerplate Club <info@mail.boilerplate.club>",
    replyTo: "umar@boilerplate.club",
  },
};

export default config;
