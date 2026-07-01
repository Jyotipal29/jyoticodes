import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Nav } from "@/components/nav/Nav";
import { siteConfig } from "@/content/site-config";
import "./globals.css";

// Modest metadata per R14/plan scope -- a title template (so any future
// nested route's title reads "<Page Title> — <Name>") and a description
// derived from the site owner's own pitch, not a dedicated SEO pass (OG
// tags, per-page titles beyond this default, etc. are explicitly deferred).
export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.pitch,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-black text-white">
        <ThemeProvider>
          <Nav />
          {children}
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
