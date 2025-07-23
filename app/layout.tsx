import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme/ThemeProvider";
import globalConfigs from "@/configs/global";

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
    default: globalConfigs.main.title,
    template: globalConfigs.main.titleTemplate,
  },
  description: globalConfigs.main?.description,
  keywords: globalConfigs.main?.keywords,
  themeColor: globalConfigs.main.metaData?.themeColor,
  viewport: globalConfigs.main.metaData?.viewport,
  metadataBase: new URL(globalConfigs.main.metaData?.canonicalUrl || ""),

  // Open Graph
  openGraph: {
    title: globalConfigs.main.metaData?.ogTitle || "",
    description: globalConfigs.main.metaData?.ogDescription || "",
    url: globalConfigs.main.metaData?.canonicalUrl || "",
    siteName: globalConfigs.main.appName,
    images: [
      {
        url: globalConfigs.main.metaData?.ogImage || "/",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fa_IR",
    type: "website",
  },

  // Twitter
  twitter: {
    card: globalConfigs.main.metaData?.twitterCard,
    title: globalConfigs.main.metaData?.ogTitle,
    description: globalConfigs.main.metaData?.ogDescription,
    images: [globalConfigs.main.metaData?.ogImage || "/"],
  },

  // Icons
  icons: {
    icon: globalConfigs.main.metaData?.favicon || "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple:
      globalConfigs.main.metaData?.appleTouchIcon || "/apple-touch-icon.png",
  },

  // Other
  manifest: globalConfigs.main.metaData?.manifest,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
