// iconColorsTech.tsx

/**
 * TECH_COLORS
 *
 * A mapping of technology names (lowercased) to their associated brand or theme colors.
 * This is used to consistently style tech icons in the UI (e.g., React, Vue, Tailwind).
 *
 * Keys should be lowercase to ensure case-insensitive access via `.toLowerCase()`.
 */

export const TECH_COLORS: Record<string, string> = {
    react: '#61DAFB',        // React blue
    vue: '#42b883',          // Vue green
    angular: '#dd0031',      // Angular red
    svelte: '#ff3e00',       // Svelte orange
    tailwind: '#38bdf8',     // Tailwind cyan
    bootstrap: '#7952b3',    // Bootstrap purple
    html: '#e34c26',         // HTML5 orange
    bulma: '#00d1b2',        // Bulma green-teal
    javascript: '#F7DF1E',   // JavaScript yellow
    typescript: '#3178C6',   // TypeScript blue
    python: '#FFD43B',       // Python yellow
    ruby: '#E0115F',         // Ruby pink-red
    java: '#5382a1',         // Java blue-gray
    php: '#787cb5'           // PHP purple-gray
};

/**
 * getTechColor
 *
 * Returns the color associated with a given technology name.
 * Falls back to white (`#ffffff`) if the technology is not found in the map.
 *
 * @param tech - The name of the technology (e.g., "React", "Tailwind")
 * @returns A hex color string (e.g., "#61DAFB")
 */
export function getTechColor(tech: string): string {
    return TECH_COLORS[tech.toLowerCase()] || '#ffffff';
}
