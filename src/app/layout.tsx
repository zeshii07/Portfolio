import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://developerzeeshan.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zeeshan Ahmad — Building useful digital products",
    template: "%s — Zeeshan Ahmad",
  },
  description:
    "Full-stack developer building digital experiences at the intersection of software engineering, AI automation, and secure products. Explore selected work and case studies.",
  keywords: [
    "Zeeshan Ahmad",
    "Full-Stack Developer",
    "AI Automation",
    "Cybersecurity",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "Portfolio",
    "Software Engineer",
    "Web Application Development",
  ],
  authors: [{ name: "Zeeshan Ahmad" }],
  creator: "Zeeshan Ahmad",
  publisher: "Zeeshan Ahmad",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Zeeshan Ahmad — Full-Stack Developer & AI Automation Builder",
    description:
      "Building useful digital products with code, AI, and secure engineering. Full-stack web applications, AI automation, and cybersecurity.",
    url: SITE_URL,
    siteName: "Zeeshan Ahmad",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
