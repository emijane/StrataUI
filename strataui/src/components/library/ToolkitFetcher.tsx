'use client';

/**
 * ToolkitFetcher Component
 *
 * The core client-side controller that:
 * - Fetches all toolkits (libraries) from Supabase
 * - Filters them by selected type, subcategory, and search term
 * - Manages sidebar visibility for mobile and layout composition
 *
 * Props:
 * - `typeSlug` (optional string): The current category (type) slug to filter toolkits
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

type Props = {
    typeSlug?: string;
};

export default function ToolkitFetcher({ typeSlug }: Props) {
    const searchParams = useSearchParams();
    // Only use subcategory parameter if we have a typeSlug (category page)
    const selectedSubSlug = typeSlug ? searchParams.get('subcategory') : null;

    // Raw toolkit data fetched from Supabase
    const [toolkits, setToolkits] = useState<Toolkit[]>([]);
    
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
     * Fetch toolkits from Supabase on mount and when the
     * type or subcategory changes.
     */
    useEffect(() => {
        const fetchData = async () => {
            // First, fetch category and subcategory metadata for breadcrumbs
            await fetchBreadcrumbData();
            
            // Then fetch and filter the toolkits
            await fetchToolkits();
        };

        const fetchBreadcrumbData = async () => {
            // Always clear category data first
            setCategoryData({});
            
            if (!typeSlug) {
                // If no typeSlug, we're on the main library page - keep data cleared
                return;
            }

            try {
                if (selectedSubSlug) {
                    // If we have a subcategory, fetch subcategory with its type info
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
                        setCategoryData({
                            typeName: data.types?.name,
                            subcategoryName: data.name
                        });
                    }
                } else if (typeSlug) {
                    // If we only have a type, fetch type info
                    const { data, error } = await supabase
                        .from('types')
                        .select('name, slug')
                        .eq('slug', typeSlug)
                        .single();

                    if (!error && data) {
                        setCategoryData({
                            typeName: data.name,
                            subcategoryName: undefined
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching breadcrumb data:', error);
            }
        };

        const fetchToolkits = async () => {
            const { data, error } = await supabase
                .from('libraries')
                .select(`
                    *,
                    subcategories (
                        id,
                        name,
                        slug,
                        types (
                            id,
                            name,
                            slug
                        )
                    ),
                    library_tags (tag: tag_id (name)),
                    library_tech (tech: tech_id (name)),
                    library_languages (language: language_id (name))
                `);

            if (error) {
                console.error('Error fetching toolkits:', JSON.stringify(error, null, 2));
                return;
            }

            // Filter by typeSlug and/or subcategorySlug
            const filtered = (data || []).filter(lib => {
                const sub = lib.subcategories;
                const matchesType = !typeSlug || sub?.types?.slug === typeSlug;
                const matchesSub = !selectedSubSlug || sub?.slug === selectedSubSlug;
                return matchesType && matchesSub;
            });

            setToolkits(filtered);
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

        handleBodyScroll(); // Run immediately on mount

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

                {/* Main content area */}
                <div className={`flex-1 flex flex-col mt-20 px-5 ${mobileOpen ? 'overflow-hidden h-screen' : ''}`}>
                    <HeaderSection />
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    <ToolkitList libraries={filteredToolkits} />
                </div>
            </div>
        </div>
    );
}
