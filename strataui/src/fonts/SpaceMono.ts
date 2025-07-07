// Import Space Mono font from Google Fonts using Next.js built-in font optimization
import { Space_Mono } from 'next/font/google';

/**
 * spaceMono (font config)
 *
 * This config imports the "Space Mono" font with the following settings:
 * - Weights: 400 (regular), 700 (bold)
 * - Subsets: Latin characters only
 * - Display: "swap" (fallback font is shown while custom font loads)
 * - CSS variable: `--font-space-mono` (for use in Tailwind or custom CSS)
 *
 * Usage:
 * 1. Add the font variable to your Tailwind config or `className`:
 *      className={`${spaceMono.variable} font-space-mono`}
 * 2. Ensure Tailwind is set up to recognize the custom font (optional via `tailwind.config.js`)
 */

export const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-space-mono',
});
