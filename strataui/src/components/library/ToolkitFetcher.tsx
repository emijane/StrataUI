'use client';

/**
 * ToolkitFetcher Component (Polished)
 *
 * - Uses React Query (via useLibraryPageData) for cached data & refetch controls
 * - Simple search + future filters (matchesToolkit)
 * - Mobile sidebar drawer with backdrop and body-scroll lock
 * - Sticky breadcrumb area
 * - Memoized filtering for performance
 */

import { useState, useEffect, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { matchesToolkit } from '@/lib/matchesToolkit';
import { useLibraryPageData } from '@/hooks/useLibraryData';

import ToolkitList from './ToolkitList';
import LibraryMenu from './LibraryMenu';
import SidebarToggle from './SidebarToggle';
import Breadcrumb from './Breadcrumb';
import ToolkitSkeleton from './ToolkitSkeleton';

type Props = {
    typeSlug?: string;
    subcategorySlug?: string;
};

export default function ToolkitFetcher({ typeSlug, subcategorySlug }: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Support both new clean URLs and legacy query params for backward compatibility
    const selectedSubSlug =
        subcategorySlug || (typeSlug ? searchParams.get('subcategory') : null);

    // Cached data fetching with React Query (custom hook)
    const {
        toolkits,
        categoryData,
        isLoading,
        isError,
        error,
        refetchAll
    } = useLibraryPageData(typeSlug, selectedSubSlug);

    // Search term
    const [searchTerm, setSearchTerm] = useState('');

    // Light future-proof filter object
    const [filters] = useState({
        subcategory_ids: [] as number[],
        tech: [] as string[],
        languages: [] as string[],
        pricing: [] as string[]
    });

    // Mobile sidebar state
    const [mobileOpen, setMobileOpen] = useState(false);

    /**
     * Body scroll lock when mobile sidebar is open
     */
    useEffect(() => {
        const apply = () => {
            const isMobile = window.innerWidth < 1024;
            if (mobileOpen && isMobile) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };
        apply();
        window.addEventListener('resize', apply);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('resize', apply);
        };
    }, [mobileOpen]);

    /**
     * Reset search when route changes (so prior search doesn’t “stick”)
     */
    useEffect(() => {
        setSearchTerm('');
    }, [pathname]);

    /**
     * Final filtered list (memoized)
     */
    const filteredToolkits = useMemo(() => {
        return toolkits.filter((toolkit) => matchesToolkit(toolkit, filters, searchTerm));
    }, [toolkits, filters, searchTerm]);

    return (
        <div className="flex w-full min-h-screen flex-col">
            {/* Mobile top bar with sidebar toggle */}
            <div className="lg:hidden flex px-5 py-3 items-center gap-3 z-50">
                <SidebarToggle onToggle={() => setMobileOpen((prev) => !prev)} />
                <span className="text-sm text-gray-600">Browse categories</span>
            </div>

            {/* Sticky breadcrumb */}
            <div className="sticky top-0 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-40 border-b border-gray-100">
                <div className="flex px-5 py-3 items-center gap-3">
                    <Breadcrumb
                        typeSlug={typeSlug}
                        typeName={categoryData.typeName}
                        subcategorySlug={selectedSubSlug || undefined}
                        subcategoryName={categoryData.subcategoryName}
                    />
                </div>
            </div>

            <div className="flex flex-row">
                {/* Sidebar navigation (drawer on mobile, static on desktop) */}
                <LibraryMenu
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                />

                {/* Backdrop for mobile drawer */}
                {mobileOpen && (
                    <button
                        aria-label="Close sidebar"
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 z-30 bg-black/30 lg:hidden"
                    />
                )}

                {/* Main content */}
                <div
                    className={`flex-1 flex flex-col px-5 ${
                        mobileOpen ? 'overflow-hidden h-screen' : ''
                    }`}
                >

                    {/* States: error / loading / content */}
                    {isError ? (
                        <div className="text-center py-12">
                            <p className="text-red-600 mb-2">
                                Failed to load libraries. Please try again.
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                {error?.message || 'Unknown error occurred'}
                            </p>
                            <button
                                onClick={() => refetchAll()}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Retry
                            </button>
                        </div>
                    ) : isLoading ? (
                        <ToolkitSkeleton />
                    ) : (
                        <div className="mt-4">
                            <ToolkitList libraries={filteredToolkits} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
