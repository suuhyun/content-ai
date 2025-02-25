import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Outfit } from "next/font/google";
import { UserCreditProvider } from "./context/UserCreditProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Content Generator",
  description:
    "Generate high-quality content with AI, including YouTube descriptions, Instagram hashtags, tweets, and more.",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <UserCreditProvider>
          <body className={`${outfit.variable} ${inter.variable} font-outfit`}>
            {children}
          </body>
        </UserCreditProvider>
      </html>
    </ClerkProvider>
  );
}
