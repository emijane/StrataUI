'use client';

/**
 * ToolkitList Component
 *
 * This component displays a responsive, column-based layout of library/toolkit cards.
 * It accepts an array of `Toolkit` objects and optionally renders any children above the list.
 *
 * Props:
 * - `libraries` (Toolkit[]): Array of toolkit data to be rendered as `LibraryCard`s
 * - `children` (ReactNode, optional): Extra elements to render above the list
 */

import type { Toolkit } from '@/types';
import LibraryCard from './LibraryCard';
import { ReactNode } from 'react';

type Props = {
    libraries: Toolkit[];
    children?: ReactNode;
};

export default function ToolkitList({ libraries, children }: Props) {
    return (
        <section
            className="w-full max-w-[92rem] mx-auto relative z-0 mt-4"
            aria-label="Library section"
        >
            {/* Results count */}
            <div className="text-sm text-gray-600 mb-2">
                {libraries.length === 1
                    ? '1 result'
                    : `${libraries.length} results`}
            </div>

            {/* Optional extra UI above the grid */}
            {children && <div className="mb-2">{children}</div>}

            {/* Display message if no toolkits are available */}
            {libraries.length === 0 ? (
                <p className="text-black/70 text-sm">
                    404 tools not found. Maybe you’ve got the one we’re missing?
                </p>
            ) : (
                // Masonry-style responsive column layout
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-2 xl:columns-3 2xl:columns-4 gap-x-3 gap-y-8 [&>*]:break-inside-avoid">
                    {libraries.map((lib) => (
                        <LibraryCard key={lib.id} lib={lib} />
                    ))}
                </div>
            )}
        </section>
    );
}
