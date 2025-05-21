// iconColorsTech.tsx

export const TECH_COLORS: Record<string, string> = {
    react: '#61DAFB',
    vue: '#42b883',
    angular: '#dd0031',
    svelte: '#ff3e00',
    tailwind: '#38bdf8',
    bootstrap: '#7952b3',
    html: '#e34c26',
    bulma: '#00d1b2',
    javascript: '#F7DF1E',
    typescript: '#3178C6',
    python: '#FFD43B',
    ruby: '#E0115F',
    java: '#5382a1',
    php: '#787cb5'
};

export function getTechColor(tech: string): string {
    return TECH_COLORS[tech.toLowerCase()] || '#ffffff';
}
