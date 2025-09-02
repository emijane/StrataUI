'use client';

/**
 * ToolkitList Component (categories pills + results + subcategory filter on the right)
 *
 * - Sticky bar with category pills
 * - Results count (left) + Subcategory filter dropdown (right) in the same row
 * - Optional `children` area
 * - Cards grid
 */

import type { Toolkit } from '@/types';
import { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import LibraryCard from './LibraryCard';
import CategoryPills from './CategoryPills';
import { useCategories } from '@/hooks/useCategories';
import SubcategoryFilterMenu from './SubcategoryFilterMenu';
import { useSubcategoryOptions } from '@/hooks/useSubcategoryOptions';

type Props = {
    libraries: Toolkit[];
    children?: ReactNode;
};

export default function ToolkitList({ libraries, children }: Props) {
    const { data: categories = [], isLoading } = useCategories();

    // Active category from URL (?type=slug)
    const params = useSearchParams();
    const activeType = params.get('type') ?? undefined;

    // Subcategory options scoped to the active category
    const { data: subcatOptions = [] } = useSubcategoryOptions(activeType);

    return (
        <section
            className="w-full max-w-[90rem] mx-auto relative z-0 mt-4"
            aria-label="Library section"
        >
            {/* Sticky controls bar: Category Pills */}
            <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
                <div className="py-3">
                    {!isLoading && categories.length > 0 ? (
                        <CategoryPills categories={categories} />
                    ) : (
                        <div className="flex gap-2 py-2">
                            <span className="h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
                            <span className="h-8 w-24 rounded-full bg-gray-200 animate-pulse" />
                            <span className="h-8 w-16 rounded-full bg-gray-200 animate-pulse" />
                        </div>
                    )}
                </div>
            </div>

            {/* Meta row: results (left) + filters dropdown (right) */}
            <div className="flex items-center justify-between mb-3 mt-3">
                <div className="text-sm text-gray-600">
                    {libraries.length === 1 ? '1 result' : `${libraries.length} results`}
                </div>

                {/* Subcategory Filters (only when we have an active type and options) */}
                {activeType && subcatOptions.length > 0 && (
                    <SubcategoryFilterMenu options={subcatOptions} />
                )}
            </div>

            {/* Optional extra UI above the grid */}
            {children && <div className="mb-2">{children}</div>}

            {/* Empty / grid */}
            {libraries.length === 0 ? (
                <p className="text-black/70 text-sm">
                    404 tools not found. Maybe you’ve got the one we’re missing?
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-3 gap-y-5">
                    {libraries.map((lib) => (
                        <LibraryCard key={lib.id} lib={lib} />
                    ))}
                </div>
            )}
        </section>
    );
}
