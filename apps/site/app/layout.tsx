import { Header, Footer } from "@/server";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "../styles/globals.css";
import { fragmentMono } from "./fonts/fonts";
import { Providers } from "./providers/providers";
import Script from "next/script";
import { Flex } from "design-system/elements";
// import { Footer } from "@/server";
import { RecentItems } from "components/server/RecentItems";

export const metadata: Metadata = {
  title: "network protagonist",
  // description: "Set information free",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fragmentMono.variable} text-[14px]`}
      suppressHydrationWarning
    >
      <body className="py-3 px-5">
        <Header />
        {/* hidden on small screens         */}
        <Flex className="hidden md:flex items-start">
          <RecentItems />
          <div className="w-full">{children}</div>
        </Flex>
        {/* hidden on large screens         */}
        <Flex className="block md:hidden items-start">
          <RecentItems />
          {children}
        </Flex>        
        <Footer />
      </body>
      {/* <Script
        async
        src="https://saturn.tech/widget.js#integration=14b09943-4822-45b7-892d-a0150f577c33&installPath=/saturn"
      /> */}
    </html>
  );
}
