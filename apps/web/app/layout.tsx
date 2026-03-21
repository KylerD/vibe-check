import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

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
        url: "/vibe-check-og.png",
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
    images: ["/vibe-check-og.png"],
    site: "@vibecheckcloud",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to main content
        </a>
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
