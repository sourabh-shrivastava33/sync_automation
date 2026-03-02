import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Revenue Operations | Implementation & Systems",
  description:
    "Enterprise-caliber AI Revenue Operations implementation. Eliminate manual coordination and revenue leakage with our custom AI systems.",
  openGraph: {
    title: "AI RevOps Implementation",
    description:
      "Eliminate revenue leakage from manual coordination with Custom AI Systems.",
    url: "https://sync-automations.com",
    siteName: "Sync Automations AI RevOps",
    images: [
      {
        url: "https://sync-automations.com/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI RevOps Implementation",
    description:
      "Eliminate revenue leakage from manual coordination with Custom AI Systems.",
    images: ["https://sync-automations.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://sync-automations.com/" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
