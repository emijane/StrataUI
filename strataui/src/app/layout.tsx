import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "@/lib/fontawesome";

/**
 * Font Configuration
 *
 * These fonts are imported using Next.js' built-in font optimization via `next/font/google`.
 * Each font exposes a `--font-*` CSS variable that can be used in your global styles.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

/**
 * Global Metadata
 *
 * Metadata used for SEO and browser tab rendering.
 * Applied globally to all routes rendered through this layout.
 */
export const metadata: Metadata = {
  title: "StrataUI – Discover Frontend Component Libraries and Toolkits",
  description:
    "Explore a curated catalog of frontend UI libraries, design systems, and component kits for React, Tailwind CSS, Vue, and more. Find the perfect tools to build beautiful, responsive interfaces.",
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

/**
 * RootLayout
 *
 * The top-level layout for the entire StrataUI app.
 * It wraps all routes with global styles, fonts, and shared components like the Navbar.
 *
 * - Applies font variables to the <html> element
 * - Injects global CSS (via `globals.css`)
 * - Loads Font Awesome icon configuration globally
 * - Adds a persistent Navbar across all pages
 */
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
