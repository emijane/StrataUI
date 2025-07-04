'use client';

import type { Toolkit } from '@/types';
import LibraryCard from './LibraryCard';
import { ReactNode } from 'react';

type Props = {
    libraries: Toolkit[];
    children?: ReactNode;
};

export default function ToolkitList({ libraries, children }: Props) {
    return (
        <section className="w-full mx-auto relative z-0" aria-label="Library section">
            {children && <div>{children}</div>}

            {libraries.length === 0 ? (
                <p className="text-black/70 text-sm">
                    No tools to display. Try searching for an existing tool, or submit one to be added!
                </p>
            ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-2 xl:columns-3 2xl:columns-4 gap-x-6 gap-y-8 [&>*]:break-inside-avoid">
                    {libraries.map((lib) => (
                        <LibraryCard key={lib.id} lib={lib} />
                    ))}
                </div>
            )}
        </section>
    );
}
