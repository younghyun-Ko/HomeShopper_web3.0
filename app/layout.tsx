import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { SiteContentShell } from "@/components/site-content-shell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HomeShopper",
  description: "Find homes with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn("font-sans", inter.variable)}
    >
      <body className="flex min-h-screen flex-col">
        <SiteNavbar />
        <SiteContentShell>{children}</SiteContentShell>
        <SiteFooter />
      </body>
    </html>
  );
}
