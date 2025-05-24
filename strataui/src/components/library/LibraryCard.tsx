'use client';

import type { Toolkit } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { getTechColor } from '@/lib/iconColorsTech';
import { getLanguageIcon, TECH_ICONS } from '@/lib/languageIcons';

type Props = {
    lib: Toolkit;
};

export default function LibraryCard({ lib }: Props) {
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

    const tags = lib.library_tags?.map(t => t.tag?.name).filter(Boolean) || [];
    const techs = lib.library_tech?.map(t => t.tech?.name).filter(Boolean) || [];
    const languages = lib.library_languages?.map(l => l.language?.name).filter(Boolean) || [];

    return (
        <article className="break-inside-avoid mb-6 w-full inline-block">
            <a
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block outline-1 outline-black/10 rounded-2xl shadow-sm cursor-pointer no-underline p-5"
            >
                <div className="flex flex-col h-full">
                    <div className="relative">
                        <div className="flex items-center gap-3 pr-10">
                            <p className="text-black font-semibold text-lg leading-tight flex items-center gap-2">
                                {lib.name}
                            </p>
                        </div>
                        <button
                            onClick={handleShare}
                            className="absolute top-0 right-0 text-black hover:text-black/80 transition-colors"
                            aria-label={`Share ${lib.name}`}
                        >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 opacity-60" />
                        </button>
                    </div>

                    {lib.description && (
                        <p className="text-black/70 text-sm mt-2">{lib.description}</p>
                    )}

                    {(languages.length > 0 || techs.length > 0) && (
                        <div className="flex gap-2 mt-3 text-black/80 text-xl items-center flex-wrap">
                            {languages.map(lang =>
                                lang ? (
                                    <span key={lang} className="hover:text-purple-300 transition">
                                        {getLanguageIcon(lang)}
                                    </span>
                                ) : null
                            )}
                            {techs.map(tech => {
                                const icon = tech ? TECH_ICONS[tech.toLowerCase()] : undefined;
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
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="font-space-mono text-[0.6rem] outline outline-black/30 text-black pl-2 pr-2 pt-1 pb-1 rounded-xl"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </article>
    );
}
