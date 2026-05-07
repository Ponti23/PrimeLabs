import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BubbleCanvasWrapper from "@/components/BubbleCanvasWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeLabs | Mobile Auto Detailing",
  description:
    "Premium mobile auto detailing that comes to you. Book online for Exterior, Interior, and Full Detail packages.",
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
