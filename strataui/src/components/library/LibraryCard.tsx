'use client';

import type { Toolkit } from '@/types';
import Image from 'next/image';
import { getLibraryImage } from '@/lib/getLibraryImage';
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

  if (process.env.NODE_ENV === 'development') {
    console.log('LibraryCard image debug:', {
      name: lib.name,
      library_image: lib.library_image,
      resolvedSrc: imgSrc,
    });
  }

  return (
    <article className="break-inside-avoid mb-6 w-full inline-block">
      <a
        href={lib.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl border border-black/10 p-0 shadow-sm hover:shadow-md transition-shadow h-full overflow-hidden no-underline"
        aria-label={lib.name}
      >
        {/* Image (only render if provided) */}
        {hasImage && (
          <div className="relative w-full aspect-[16/9] bg-gray-100">
            <Image
              src={imgSrc as string}
              alt={lib.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>
        )}

        {/* Content */}
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
