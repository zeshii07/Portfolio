import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { person, contactInfo, profileUrls } from "@/data/site";

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

// Canonical live URL. Keep in sync with NEXT_PUBLIC_SITE_URL in .env.
const SITE_URL = "https://zeeshandeveloper.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Muhammad Zeeshan — Full-Stack Software Engineer | AI & Automation",
    template: "%s — Muhammad Zeeshan",
  },
  description:
    "Full-Stack Software Engineer specializing in AI-powered applications and automation. React/Next.js, Node.js, TypeScript. Open to software engineering roles. Based in Multan, Pakistan.",
  keywords: [
    "Muhammad Zeeshan",
    "Full-Stack Software Engineer",
    "AI Application Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "TypeScript",
    "Junior Software Engineer",
    "Software Engineer Pakistan",
    "AI Automation",
    "Portfolio",
    "Web Application Development",
    "LLM Integration",
  ],
  authors: [{ name: person.name }],
  creator: person.name,
  publisher: person.name,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.svg" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Muhammad Zeeshan — Full-Stack Software Engineer | AI & Automation",
    description:
      "I build scalable web applications, AI-powered products, and business automation systems using modern frontend and backend technologies. Open to software engineering roles.",
    url: SITE_URL,
    siteName: "Muhammad Zeeshan",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Zeeshan — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Zeeshan — Full-Stack Software Engineer | AI & Automation",
    description:
      "I build scalable web applications, AI-powered products, and business automation systems.",
    images: ["/og-image.png"],
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

/**
 * JSON-LD structured data. Helps search engines and recruiters
 * (Google for Jobs, LinkedIn parsers) correctly identify the
 * person behind the portfolio and their open-to-work status.
 *
 * Two blocks:
 *  - Person: identity, sameAs links, job title
 *  - WebSite: canonical site, name, publisher
 */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: "Full-Stack Software Engineer",
    description: person.headline,
    email: `mailto:${profileUrls.email}`,
    url: SITE_URL,
    image: `${SITE_URL}/images/profile/portrait.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Multan",
      addressCountry: "PK",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of the Punjab",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "AI Integration",
      "Retrieval-Augmented Generation",
      "MySQL",
      "Full-Stack Development",
    ],
    sameAs: [
      profileUrls.github,
      profileUrls.linkedin,
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${person.name} — Portfolio`,
    url: SITE_URL,
    publisher: { "@type": "Person", name: person.name },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {jsonLd.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            // JSON.stringify is safe here — block is a static literal object.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
