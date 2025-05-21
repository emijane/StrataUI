import {
    faReact,
    faVuejs,
    faAngular,
    faBootstrap,
    faHtml5
} from '@fortawesome/free-brands-svg-icons';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const TECH_ICONS: Record<string, IconDefinition> = {
    react: faReact,
    vue: faVuejs,
    angular: faAngular,
    svelte: faCubes,
    tailwind: faCubes,
    bootstrap: faBootstrap,
    html: faHtml5,
    bulma: faCubes
};

export const TECH_COLORS: Record<string, string> = {
    react: '#61DAFB',
    vue: '#42b883',
    angular: '#dd0031',
    svelte: '#ff3e00',
    tailwind: '#38bdf8',
    bootstrap: '#7952b3',
    html: '#e34c26',
    bulma: '#00d1b2'
};

export function getTechColor(tech: string): string {
    return TECH_COLORS[tech] || '#ffffff';
}
