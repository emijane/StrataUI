// languageIcons.tsx

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

const ICON_MAP: Record<string, React.ReactElement> = {
    javascript: <RiJavascriptFill title="JavaScript" />,
    typescript: <BiLogoTypescript title="TypeScript" />,
    python: <FaPython title="Python" />,
    ruby: <SiRuby title="Ruby" />,
    java: <FaJava title="Java" />,
    php: <FaPhp title="PHP" />
};

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

export function getLanguageIcon(lang: string): React.JSX.Element {
    const key = lang.toLowerCase();
    const icon = ICON_MAP[key];
    return icon
        ? <span style={{ color: getTechColor(key) }}>{icon}</span>
        : <span className="text-xs uppercase">{lang}</span>;
}
