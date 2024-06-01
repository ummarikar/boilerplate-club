"use server";

import { Resend } from "resend";
import ConfirmEmail from "@/emails/confirm-email";
import config from "@/lib/config";

const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);

export async function sendWelcomeEmail(recipient: string) {
  await resend.emails.send({
    from: config.email.from,
    reply_to: config.email.replyTo,
    to: recipient,
    subject: `Thank you for joining ${config.name}!`,
    react: <ConfirmEmail />,
  });
}
