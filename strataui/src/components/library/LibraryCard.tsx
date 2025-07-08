'use client';

/**
 * LibraryCard Component
 *
 * Displays an individual toolkit/library card in the StrataUI interface.
 * Each card shows:
 * - Library name and description
 * - Subcategory badge
 * - Share button (native or clipboard fallback)
 *
 * Props:
 * - `lib` (Toolkit): A toolkit object containing all metadata to render the card
 */

import type { Toolkit } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

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

    // Extract subcategory name safely (e.g., from lib.subcategory.name or lib.subcategory)
    const subcategory =
        typeof lib.subcategory === 'object' && lib.subcategory !== null
            ? lib.subcategory.name
            : lib.subcategory || null;

    return (
        <article className="break-inside-avoid mb-6 w-full inline-block">
            <a
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block outline-1 outline-black/10 rounded-2xl shadow-sm cursor-pointer no-underline p-5"
            >
                <div className="flex flex-col h-full">

                    {/* Library Name + Share Button */}
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
                            <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                                className="w-3 h-3 opacity-60"
                            />
                        </button>
                    </div>

                    {/* Subcategory badge */}
                    {subcategory && (
                        <div className="flex flex-wrap mt-2 items-center">
                            <span className="text-xs text-black">
                                {subcategory}
                            </span>
                        </div>
                    )}

                    {/* Description */}
                    {lib.description && (
                        <p className="text-black/70 text-sm mt-3">{lib.description}</p>
                    )}
                </div>
            </a>
        </article>
    );
}
