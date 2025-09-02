'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { matchesToolkit } from '@/lib/matchesToolkit';
import { useLibraryPageData } from '@/hooks/useLibraryData';

import ToolkitList from './ToolkitList';
import Breadcrumb from './Breadcrumb';
import ToolkitSkeleton from './ToolkitSkeleton';
import type { Toolkit } from '@/types';

type Props = {
    typeSlug?: string;         // optional route param (kept for backward compat)
    subcategorySlug?: string;
};

export default function ToolkitFetcher({ typeSlug, subcategorySlug }: Props) {
    const pathname = usePathname();
    const params = useSearchParams();

    // NEW: prefer URL param ?type=…; fall back to route param if present
    const activeType = params.get('type') ?? typeSlug ?? undefined;

    // Keep supporting legacy ?subcategory=… only when a type is present
    const selectedSubSlug = subcategorySlug || (activeType ? params.get('subcategory') : null);

    const {
        toolkits,
        categoryData,
        isLoading,
        isError,
        error,
        refetchAll
    } = useLibraryPageData(activeType, selectedSubSlug);

    const [searchTerm, setSearchTerm] = useState('');
    const [filters] = useState({
        subcategory_ids: [] as number[],
        tech: [] as string[],
        languages: [] as string[],
        pricing: [] as string[]
    });

    useEffect(() => setSearchTerm(''), [pathname]);

    const filteredToolkits = useMemo(
        () => toolkits.filter((t: Toolkit) => matchesToolkit(t, filters, searchTerm)),
        [toolkits, filters, searchTerm]
    );

    return (
        <div className="flex w-full min-h-screen flex-col">
            <div className="hidden lg:block">
                <Breadcrumb
                    typeSlug={activeType}
                    typeName={categoryData.typeName}
                    subcategorySlug={selectedSubSlug || undefined}
                    subcategoryName={categoryData.subcategoryName}
                />
            </div>

            <div className="flex-1 flex flex-col px-5">
                {isError ? (
                    <div className="text-center py-12">
                        <p className="text-red-600 mb-2">Failed to load libraries. Please try again.</p>
                        <p className="text-gray-600 text-sm mb-4">{(error as Error)?.message || 'Unknown error occurred'}</p>
                        <button onClick={() => refetchAll()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Retry
                        </button>
                    </div>
                ) : isLoading ? (
                    <ToolkitSkeleton />
                ) : (
                    <div>
                        <ToolkitList libraries={filteredToolkits} />
                    </div>
                )}
            </div>
        </div>
    );
}
