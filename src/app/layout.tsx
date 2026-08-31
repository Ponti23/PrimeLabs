import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BubbleCanvasWrapper from "@/components/BubbleCanvasWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeLabs | Mobile Car Detailing",
  description:
    "Friendly mobile car detailing brought to your driveway. Our Maintenance Detail covers interior, exterior, and wheels from $180 — request a booking online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-dark text-white">
        <BubbleCanvasWrapper />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", flex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
