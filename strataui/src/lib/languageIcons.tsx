// Manauges language icons like typescript, javascript, ruby, php, go, rust.

import * as React from 'react';
import type { JSX } from 'react';
import {
    FaPython,
    FaHtml5,
    FaCss3Alt,
    FaReact,
    FaJava,
    FaPhp
} from 'react-icons/fa';
import { SiRuby } from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript} from "react-icons/bi";


const ICON_MAP: Record<string, JSX.Element> = {
    javascript: <RiJavascriptFill title="JavaScript" />,
    typescript: <BiLogoTypescript title="TypeScript" />,
    python: <FaPython title="Python" />,
    ruby: <SiRuby title="Ruby" />,
    html: <FaHtml5 title="HTML" />,
    css: <FaCss3Alt title="CSS" />,
    react: <FaReact title="React" />,
    java: <FaJava title="Java" />,
    php: <FaPhp title="PHP" />
};

// ✅ Export this helper
export function getLanguageIcon(lang: string): JSX.Element {
    return ICON_MAP[lang.toLowerCase()] ?? <span className="text-xs uppercase">{lang}</span>;
}
