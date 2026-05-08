import type { Metadata } from "next";
import "./brand-fallback.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oaks and Moks — Specialty Coffee",
  description:
    "Specialty coffee roasted in small batches. From Jaipur’s café culture to your home brew.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
