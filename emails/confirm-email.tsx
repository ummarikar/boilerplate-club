import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Tailwind } from "@react-email/tailwind";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Button } from "@react-email/button";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import * as React from "react";
import config from "@/lib/config";
import { getURL } from "@/lib/utils";

interface ConfirmEmailProps {
  appLink?: string;
}

const baseUrl = getURL();

export const ConfirmEmail = ({
  appLink = `${baseUrl}/dashboard`,
}: ConfirmEmailProps) => {
  const previewText = `Thank you for joining ${config.name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                alt={`${config.name} logo`}
                className="mx-auto w-16"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[20px] font-normal text-black">
              Thank you for joining <strong>{config.name}</strong>!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hi,</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              It's great to have you on board. Click the link below to get
              started.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={appLink}
              >
                Get Started
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={appLink} className="text-blue-600 no-underline">
                {appLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you were not expecting this, you can ignore this email. If you
              are concerned about your account's safety, please reply to this
              email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmEmail;
