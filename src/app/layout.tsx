import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@arthur.eudeline/starbucks-tp-kit/styles";
import { Footer } from "@arthur.eudeline/starbucks-tp-kit";
import Menu from "@/components/Menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TP2 - Starbucks",
    template: "%s - Starbucks",
  },
  description: "02-integration-maquettes Starbucks clone.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Menu />
        {children}
      <Footer />
      </body>
    </html>
  );
}