import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/navbar"
import Footer, { RepeatingColorBanner } from "@/app/_components/footer"
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAF",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <RepeatingColorBanner repeats={5} />
        {/* <Navbar /> */}
        <div>
          <h1 className="font-semibold text-center contents-center text-2xl pt-8">
            Piercing Arrow & Frontier Photo Gallery
          </h1>
        </div>
        {children}
        <Suspense fallback={<div className="h-16" />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
