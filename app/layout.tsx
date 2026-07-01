import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Nav } from "@/components/nav/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio site.",
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
