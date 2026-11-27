import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klik Indomaret — Surgical Cognitive Redesign Prototype",
  description:
    "Purwarupa interaktif perbandingan Eksisting vs Redesign antarmuka Klik Indomaret berbasis Rekayasa Kognitif (Gestalt, Hick-Hyman, KLM-GOMS, Norman, NASA-TLX).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans bg-white text-klik-ink">{children}</body>
    </html>
  );
}
