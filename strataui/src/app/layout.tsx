import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "@/lib/fontawesome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "StrataUI – Discover Frontend Component Libraries and Toolkits",
  description: "Explore a curated catalog of frontend UI libraries, design systems, and component kits for React, Tailwind CSS, Vue, and more. Find the perfect tools to build beautiful, responsive interfaces.",
  keywords: [
    "frontend UI libraries",
    "component libraries",
    "React UI kits",
    "Tailwind components",
    "design systems",
    "open source UI tools",
    "StrataUI",
    "frontend development",
    "UI framework catalog"
  ],
  icons: {
    icon: [
      { url: "/strataui-icon.png", type: "image/png" }
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
