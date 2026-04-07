import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Standalone CBT Platform",
  description: "Mobile-first anti-cheat CBT platform built as a standalone system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
