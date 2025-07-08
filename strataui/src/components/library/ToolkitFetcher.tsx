'use client';

/**
 * ToolkitFetcher Component (Performance Optimized)
 *
 * The core client-side controller that:
 * - Fetches filtered toolkits directly from Supabase (server-side filtering)
 * - Parallel data fetching for better performance
 * - Loading states and skeleton screens for better UX
 * - Manages sidebar visibility for mobile and layout composition
 *
 * Props:
 * - `typeSlug` (optional string): The current category (type) slug to filter toolkits
 * - `subcategorySlug` (optional string): The current subcategory slug to filter toolkits
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { Toolkit } from '@/types';
import { matchesToolkit } from '@/lib/matchesToolkit';

import HeaderSection from './Header';
import ToolkitList from './ToolkitList';
import SearchBar from './SearchBar';
import LibraryMenu from './LibraryMenu';
import SidebarToggle from './SidebarToggle';
import Breadcrumb from './Breadcrumb';
import ToolkitSkeleton from './ToolkitSkeleton';

type Props = {
    typeSlug?: string;
    subcategorySlug?: string;
};

export default function ToolkitFetcher({ typeSlug, subcategorySlug }: Props) {
    const searchParams = useSearchParams();
    // Support both new clean URLs and legacy query params for backward compatibility
    const selectedSubSlug = subcategorySlug || (typeSlug ? searchParams.get('subcategory') : null);

    // Raw toolkit data fetched from Supabase
    const [toolkits, setToolkits] = useState<Toolkit[]>([]);
    
    // Loading states
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    
    // Store category and subcategory names for breadcrumbs
    const [categoryData, setCategoryData] = useState<{
        typeName?: string;
        subcategoryName?: string;
    }>({});

    // Search query entered by the user
    const [searchTerm, setSearchTerm] = useState('');

    // Future-proofed filters (tech, language, pricing)
    const [filters] = useState({
        subcategory_ids: [] as number[],
        tech: [] as string[],
        languages: [] as string[],
        pricing: [] as string[]
    });

    // Mobile sidebar state
    const [mobileOpen, setMobileOpen] = useState(false);

    /**
     * Optimized data fetching with parallel requests and server-side filtering
     */
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                // Parallel data fetching for better performance
                const [breadcrumbResult, toolkitResult] = await Promise.all([
                    fetchBreadcrumbData(),
                    fetchOptimizedToolkits()
                ]);

                // Handle results
                if (breadcrumbResult) {
                    setCategoryData(breadcrumbResult);
                }
                
                if (toolkitResult) {
                    setToolkits(toolkitResult);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchBreadcrumbData = async () => {
            if (!typeSlug) return {};

            try {
                if (selectedSubSlug) {
                    const { data, error } = await supabase
                        .from('subcategories')
                        .select(`
                            name,
                            slug,
                            types (
                                name,
                                slug
                            )
                        `)
                        .eq('slug', selectedSubSlug)
                        .single();

                    if (!error && data) {
                        let typeName: string | undefined;
                        if (data.types) {
                            if (Array.isArray(data.types)) {
                                typeName = data.types[0]?.name;
                            } else {
                                typeName = (data.types as any).name;
                            }
                        }
                        
                        return {
                            typeName,
                            subcategoryName: data.name
                        };
                    }
                } else if (typeSlug) {
                    const { data, error } = await supabase
                        .from('types')
                        .select('name, slug')
                        .eq('slug', typeSlug)
                        .single();

                    if (!error && data) {
                        return {
                            typeName: data.name,
                            subcategoryName: undefined
                        };
                    }
                }
            } catch (error) {
                console.error('Error fetching breadcrumb data:', error);
            }
            
            return {};
        };

        const fetchOptimizedToolkits = async () => {
            let query = supabase
                .from('libraries')
                .select(`
                    id,
                    name,
                    url,
                    pricing,
                    description,
                    subcategories!inner (
                        id,
                        name,
                        slug,
                        types!inner (
                            id,
                            name,
                            slug
                        )
                    )
                `);

            // Server-side filtering for better performance
            if (typeSlug) {
                query = query.eq('subcategories.types.slug', typeSlug);
            }
            
            if (selectedSubSlug) {
                query = query.eq('subcategories.slug', selectedSubSlug);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching toolkits:', error);
                throw error;
            }

            return data || [];
        };

        fetchData();
    }, [typeSlug, selectedSubSlug]);

    /**
     * Prevent body scroll when mobile sidebar is open.
     */
    useEffect(() => {
        const handleBodyScroll = () => {
            const isMobile = window.innerWidth < 1024;
            if (mobileOpen && isMobile) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        handleBodyScroll();
        window.addEventListener('resize', handleBodyScroll);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('resize', handleBodyScroll);
        };
    }, [mobileOpen]);

    /**
     * Final filtered list of toolkits (search term + future filters)
     */
    const filteredToolkits = toolkits.filter(toolkit =>
        matchesToolkit(toolkit, filters, searchTerm)
    );

    return (
        <div className="flex w-full min-h-screen flex-col">
            {/* Mobile sidebar toggle - always available on mobile */}
            <div className="lg:hidden flex px-5 py-3 items-center gap-3 outline-1 outline-black/20 z-50">
                <SidebarToggle onToggle={() => setMobileOpen(prev => !prev)} />
            </div>

            {/* Breadcrumb section - always show */}
            <div className="flex px-5 py-3 items-center gap-3 outline-1 outline-black/20 z-50">
                <Breadcrumb 
                    typeSlug={typeSlug}
                    typeName={categoryData.typeName}
                    subcategorySlug={selectedSubSlug || undefined}
                    subcategoryName={categoryData.subcategoryName}
                />
            </div>

            <div className='flex flex-row'>
                {/* Sidebar navigation */}
                <LibraryMenu 
                    mobileOpen={mobileOpen} 
                    onClose={() => setMobileOpen(false)}
                />

                {/* Main content area with loading states */}
                <div className={`flex-1 flex flex-col mt-20 px-5 ${mobileOpen ? 'overflow-hidden h-screen' : ''}`}>
                    <HeaderSection />
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    
                    {/* Loading, Error, and Success states */}
                    {isError ? (
                        <div className="text-center py-12">
                            <p className="text-red-600 mb-4">Failed to load libraries. Please try again.</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Retry
                            </button>
                        </div>
                    ) : isLoading ? (
                        <ToolkitSkeleton />
                    ) : (
                        <ToolkitList libraries={filteredToolkits} />
                    )}
                </div>
            </div>
        </div>
    );
}
