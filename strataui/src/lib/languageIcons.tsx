// languageIcons.tsx

/**
 * This module manages rendering of programming language and technology icons
 * used throughout the StrataUI project.
 *
 * It supports both:
 * - JSX icons for programming languages (via `react-icons`)
 * - Font Awesome icons for tech frameworks (React, Vue, etc.)
 *
 * Utilities:
 * - `getLanguageIcon(lang)` returns a colored JSX icon for a language or a fallback text label
 * - `TECH_ICONS` can be used directly for FontAwesome-based tech icon rendering
 */

import * as React from 'react';
import {
    FaPython,
    FaJava,
    FaPhp
} from 'react-icons/fa';
import { SiRuby } from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";

import {
    faReact,
    faVuejs,
    faAngular,
    faBootstrap,
    faHtml5
} from '@fortawesome/free-brands-svg-icons';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { getTechColor } from './iconColorsTech';

/**
 * ICON_MAP
 *
 * Maps programming language names (lowercased) to their corresponding React icon components.
 * These are used for direct JSX rendering, e.g. in <ToolkitCard />.
 */
const ICON_MAP: Record<string, React.ReactElement> = {
    javascript: <RiJavascriptFill title="JavaScript" />,
    typescript: <BiLogoTypescript title="TypeScript" />,
    python: <FaPython title="Python" />,
    ruby: <SiRuby title="Ruby" />,
    java: <FaJava title="Java" />,
    php: <FaPhp title="PHP" />
};

/**
 * TECH_ICONS
 *
 * Maps technology/framework names to FontAwesome icon definitions.
 * These are used in places where you render tech icons via <FontAwesomeIcon icon={...} />
 */
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

/**
 * getLanguageIcon
 *
 * Given a language name, returns a corresponding JSX icon element,
 * colored using `getTechColor(lang)`. If no icon is found, returns
 * an uppercase fallback text label instead.
 *
 * @param lang - The programming language name (e.g., "JavaScript")
 * @returns A styled icon element or fallback text
 */
export function getLanguageIcon(lang: string): React.JSX.Element {
    const key = lang.toLowerCase();
    const icon = ICON_MAP[key];
    return icon
        ? <span style={{ color: getTechColor(key) }}>{icon}</span>
        : <span className="text-xs uppercase">{lang}</span>;
}
