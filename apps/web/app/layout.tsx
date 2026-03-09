import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Vibe Check — Production Readiness Scanner for AI-Built Apps";
const shortTitle = "Vibe Check";
const description =
  "Free, open-source Claude Code plugin that scans AI-generated codebases for hidden production risks across security, payments, auth, and more. Built for vibe coders using Cursor, Lovable, Bolt, v0, and Claude Code.";
const url = "https://vibe-check.cloud";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s | ${shortTitle}`,
  },
  description,
  keywords: [
    "vibe check",
    "vibe coding",
    "vibe coder",
    "AI code review",
    "AI code scanner",
    "production readiness",
    "code security scanner",
    "Claude Code plugin",
    "Cursor AI",
    "Lovable",
    "Bolt",
    "v0",
    "AI-generated code",
    "code quality",
    "security audit",
    "authentication security",
    "payment integration",
    "open source",
    "developer tools",
    "code analysis",
  ],
  authors: [{ name: "Vibe Check", url }],
  creator: "Vibe Check",
  publisher: "Vibe Check",
  applicationName: shortTitle,
  category: "Developer Tools",
  classification: "Software Development",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: shortTitle,
    images: [
      {
        url: "/landing.png",
        width: 1200,
        height: 630,
        alt: "Vibe Check — Production readiness scanner for AI-built apps",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/landing.png"],
    creator: "@KylerD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
