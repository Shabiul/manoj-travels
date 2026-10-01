import { Inter } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site.config";
import { GoogleTag } from "@/components/seo/GoogleTag";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  ...buildMetadata(),
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googleadservices.com" />
        <link rel="dns-prefetch" href="https://www.googleadservices.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link
          rel="preload"
          as="image"
          href="/images/hero-poster.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM Context"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="Full LLM Context"
        />
      </head>
      <body className="font-sans">
        <GoogleTag />
        {children}
      </body>
    </html>
  );
}
