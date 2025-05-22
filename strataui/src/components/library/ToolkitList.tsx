
'use client';

import type { Toolkit } from '@/types';
import { memo, useMemo, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { getTechColor } from '@/lib/iconColorsTech';
import { getLanguageIcon, TECH_ICONS } from '@/lib/languageIcons';

const TAG_LABELS: Record<string, string> = {
    'ui-library': 'UI Library',
    'component-kit': 'Component Kit',
    'design-system': 'Design System',
    'headless-ui': 'Headless UI',
    'mobile-ui-framework': 'Mobile UI Framework',
    framework: 'Framework'
};

function formatTagLabel(tag: string): string {
    return TAG_LABELS[tag] || tag;
}

const LibraryCard = memo(({ lib }: { lib: Toolkit }) => {
    const formattedTags = useMemo(
        () => (lib.tags || []).map((tag: string) => ({
            key: tag,
            label: formatTagLabel(tag)
        })),
        [lib.tags]
    );

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        if (navigator.share) {
            navigator
                .share({
                    title: lib.name,
                    url: lib.url,
                    text: `Check out this library: ${lib.name}`
                })
                .catch((err) => console.error('Sharing failed:', err));
        } else {
            navigator.clipboard.writeText(lib.url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };

    return (
        <article className="break-inside-avoid mb-6 w-full inline-block">
            <a
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/10 backdrop-blur-md border border-white/20 
                rounded-2xl shadow-md cursor-pointer no-underline p-5 
                transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
                <div className="flex flex-col h-full">
                    <div className="relative">
                        <div className="flex items-center gap-3 pr-10">
                            <p className="text-white font-semibold text-lg leading-tight flex items-center gap-2">
                                {lib.name}
                            </p>
                        </div>
                        <button
                            onClick={handleShare}
                            className="absolute top-0 right-0 text-white hover:text-white/80 transition-colors"
                            aria-label={`Share ${lib.name}`}
                        >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 opacity-60" />
                        </button>
                    </div>

                    {lib.description && (
                        <p className="text-white/70 text-sm mt-2">{lib.description}</p>
                    )}

                    {(lib.languages?.length || 0) + (lib.tech?.length || 0) > 0 && (
                        <div className="flex gap-2 mt-3 text-white/80 text-xl items-center flex-wrap">
                            {(lib.languages || []).map((lang) => (
                                <span key={lang} className="hover:text-purple-300 transition">
                                    {getLanguageIcon(lang)}
                                </span>
                            ))}
                            {(lib.tech || []).map((tech) => {
                            const icon = TECH_ICONS[tech.toLowerCase()];
                            return icon ? (
                                <FontAwesomeIcon
                                    key={tech}
                                    icon={icon}
                                    className="w-4 h-4"
                                    style={{ color: getTechColor(tech.toLowerCase()) }}
                                    title={tech}
                                />
                            ) : null;
                            })}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3 items-center">
                        {formattedTags.map(({ key, label }) => (
                            <span
                                key={key}
                                className="font-space-mono text-[0.7rem] outline outline-white/30 text-white pl-2 pr-2 pt-1 pb-1 rounded-xl"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </article>
    );
});

LibraryCard.displayName = 'LibraryCard';

export default function ToolkitList({
    libraries,
    children
}: {
    libraries: Toolkit[];
    children?: ReactNode;
}) {
    return (
        <section className="w-full mx-auto relative z-0" aria-label="Library section">
            {children && <div>{children}</div>}

            {libraries.length === 0 ? (
                <p className="text-white/70 text-sm">No tools to display. Try searching for an existing tool, or submit one to be added!</p>
            ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-x-6 gap-y-8 [&>*]:break-inside-avoid">
                    {libraries.map((lib) => (
                        <LibraryCard key={lib.id} lib={lib} />
                    ))}
                </div>
            )}
        </section>
    );
}
