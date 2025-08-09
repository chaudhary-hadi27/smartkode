import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartKode AI – Where Intelligence Meets Innovation",
  description:
    "SmartKode is an AI-driven company building intelligent APIs, chatbots, and automation solutions using cutting-edge machine learning and generative AI technologies.",
  keywords: [
    "SmartKode",
    "AI",
    "SmartCode",
    "Smart Kode",
    "Smart Kode AI",
    "SmartKode AI",
    "SmartKode AI Solutions",
    "SmartKode AI Products",
    "SmartKode AI Services",
    "SmartKode AI Development",
    "SmartKode AI APIs",
    "SmartKode AI Chatbots",
    "SmartKode AI Automation",
    "SmartKode AI Machine Learning",
    "SmartKode AI Generative AI",
    "SmartKode AI Tools",
    "Automation",
    "AI Solutions",
    "Artificial Intelligence",
    "AI Development",
    "AI APIs",
    "Machine Learning",
    "Automation Tools",
    "Generative AI",
    "AI Services",
    "Chatbots",
    "AI Startup",
  ],
  authors: [{ name: "SmartKode Team", url: "https://smartkode.io" }],
  creator: "SmartKode",
  robots: "index, follow",
  metadataBase: new URL("https://smartkode.io"),
  openGraph: {
    title: "SmartKode AI – Where Intelligence Meets Innovation",
    description:
      "We build powerful AI solutions including APIs, chatbots, and automation tools. Trusted by developers and businesses.",
    url: "https://smartkode.io",
    siteName: "SmartKode",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmartKode AI Banner",
      },
    ],
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}

