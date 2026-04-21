import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
  type: "admin" | "user"; // 'admin' = notification to you, 'user' = acknowledgment to sender
}

export const ContactFormEmail = ({
  name,
  email,
  message,
  type,
}: ContactFormEmailProps) => {
  const isUser = type === "user";
  const previewText = isUser
    ? "Thank you for getting in touch!"
    : `New message from ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            {/* Header */}
            <Section className="mt-[32px]">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  UJ
                </div>
                <span className="font-semibold text-lg ml-2">Utsav Joshi</span>
              </div>
            </Section>

            {/* Content */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {isUser ? "Message Received" : "New Contact Submission"}
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              {isUser
                ? `Hi ${name},`
                : "You received a new message from your portfolio:"}
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              {isUser
                ? "Thaks for reaching out. I've received your message and will get back to you as soon as possible."
                : `Here is the message from ${name} (${email}):`}
            </Text>

            <Section className="bg-[#f2f3f3] rounded-lg p-6 my-6">
              <Text className="text-[#64748b] text-sm uppercase font-semibold tracking-wider mb-2">
                Message:
              </Text>
              <Text className="text-black text-base whitespace-pre-wrap">
                "{message}"
              </Text>
            </Section>

            {isUser && (
              <Text className="text-black text-[14px] leading-[24px]">
                In the meantime, feel free to check out my{" "}
                <Link
                  href="https://www.joshiutsav.com"
                  className="text-blue-600 no-underline"
                >
                  portfolio
                </Link>{" "}
                or connect on{" "}
                <Link
                  href="https://linkedin.com/in/utsavjosh1"
                  className="text-blue-600 no-underline"
                >
                  LinkedIn
                </Link>
                .
              </Text>
            )}

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              © 2024 Utsav Joshi. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
