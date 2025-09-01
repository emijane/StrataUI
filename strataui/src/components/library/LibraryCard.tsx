// LibraryCard.tsx
'use client';

import type { Toolkit } from '@/types';
import Image from 'next/image';
import { getLibraryImage } from '@/lib/getLibraryImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

type Props = {
    lib: Toolkit;
    index?: number; // 0-based index from the rendered list
};

export default function LibraryCard({ lib, index = 0 }: Props) {
    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        if (navigator.share) {
            navigator
                .share({
                    title: lib.name,
                    url: lib.url,
                    text: `Check out this library: ${lib.name}`,
                })
                .catch((err) => console.error('Sharing failed:', err));
        } else {
            navigator.clipboard.writeText(lib.url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };

    const subcategory = lib.subcategory?.name ?? null;
    const hasImage = !!lib.library_image;
    const imgSrc = hasImage ? getLibraryImage(lib.library_image) : null;

    // Exactly one LCP candidate: the very first visible card
    const isLCP = index === 0;

    return (
        <article
            className="break-inside-avoid w-full inline-block"
            style={!isLCP ? { contentVisibility: 'auto' } : undefined}
        >
            <a
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-black/10 p-0 shadow-sm hover:shadow-md transition-shadow h-full overflow-hidden no-underline"
                aria-label={lib.name}
            >
                {hasImage && (
                    <div className="relative w-full aspect-[16/9] bg-gray-100">
                        <Image
                            src={imgSrc as string}
                            alt={lib.name}
                            fill
                            // Tighter sizes for 1/2/3 columns
                            sizes="(max-width: 640px) 100vw,
                                   (max-width: 1024px) 50vw,
                                   33vw"
                            className="object-cover"
                            // Only the first card is truly prioritized
                            priority={isLCP}
                            loading={isLCP ? 'eager' : 'lazy'}
                            fetchPriority={isLCP ? 'high' : 'auto'}
                            // No blur on the LCP; keep blur for non-LCP if you like
                            placeholder={isLCP ? 'empty' : 'blur'}
                            blurDataURL={
                                isLCP
                                    ? undefined
                                    : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U1ZTVlNSIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+'
                            }
                            quality={60}
                        />
                    </div>
                )}

                <div className="p-5">
                    <div className="relative">
                        <div className="flex items-center gap-3 pr-10">
                            <p className="text-black font-semibold text-lg leading-tight">
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

                    {subcategory && (
                        <div className="flex flex-wrap mt-2 items-center">
                            <span className="text-xs text-black">{subcategory}</span>
                        </div>
                    )}

                    {lib.description && (
                        <p className="text-black/70 text-sm mt-3 line-clamp-3">
                            {lib.description}
                        </p>
                    )}
                </div>
            </a>
        </article>
    );
}
