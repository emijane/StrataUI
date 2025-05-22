/**
 * ToolkitFetcher component fetches and displays a list of toolkits from Supabase,
 * allowing users to filter and search through them.
 *
 * @fileoverview
 * - Fetches toolkit data from the 'strataui_db' table in Supabase.
 * - Supports filtering by subcategory, technology, language, and pricing.
 * - Allows searching by toolkit name or description.
 * - Renders a sidebar for filters, a search bar, applied filters, and the toolkit list.
 *
 * @module ToolkitFetcher
 */

import HeaderSection from './Header';
import FilterSidebar from './FilterSidebar';
import AppliedFilters from './ActiveFilters';
import ToolkitList from './ToolkitList';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Toolkit } from '@/types';

/**
 * Props for the ToolkitFetcher component.
 *
 * @property {string} [typeSlug] - Optional slug to filter toolkits by type.
 */
type Props = {
    typeSlug?: string;
};

/**
 * ToolkitFetcher React component.
 *
 * @param {Props} props - The component props.
 * @param {string} [props.typeSlug] - Optional slug to filter toolkits by type.
 * @returns {JSX.Element} The rendered component.
 */
export default function ToolkitFetcher({ typeSlug }: Props) {
    /**
     * State for the list of toolkits fetched from Supabase.
     */
    const [toolkits, setToolkits] = useState<Toolkit[]>([]);

    /**
     * State for the current search term.
     */
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * State for the active filters.
     */
    const [filters, setFilters] = useState({
        subcategory: [] as string[],
        subcategory_slug: [] as string[],
        tech: [] as string[],
        languages: [] as string[],
        pricing: [] as string[]
    });

    /**
     * Fetches toolkits from Supabase when the component mounts or when `typeSlug` changes.
     */
    useEffect(() => {
        const fetchToolkits = async () => {
            let query = supabase
                .from('strataui_db')
                .select(`
                    id,
                    name,
                    url,
                    type,
                    type_slug,
                    subcategory,
                    subcategory_slug,
                    tech,
                    languages,
                    tags,
                    pricing,
                    description,
                    image_url,
                    popularity,
                    created_at
                `);

            if (typeSlug) {
                query = query.eq('type_slug', typeSlug);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching toolkits:', error);
                setToolkits([]);
            } else {
                setToolkits((data || []) as Toolkit[]);
            }
        };

        fetchToolkits();
    }, [typeSlug]);

    /**
     * Filters the list of toolkits based on the current filters and search term.
     */
    const filteredToolkits = toolkits.filter((toolkit) => {
        return (
            (filters.subcategory_slug.length === 0 || filters.subcategory_slug.includes(toolkit.subcategory_slug)) &&
            (filters.tech.length === 0 || filters.tech.some(t => toolkit.tech?.includes(t))) &&
            (filters.languages.length === 0 || filters.languages.some(l => toolkit.languages?.includes(l))) &&
            (filters.pricing.length === 0 || filters.pricing.some(p => toolkit.pricing?.includes(p))) &&
            (searchTerm.trim() === '' ||
                toolkit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                toolkit.description?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="flex flex-col lg:flex-row w-full mx-auto gap-8 px-4">
            {/* Sidebar */}
            <aside className="w-full lg:max-w-xs flex-shrink-0">
                <div className="sticky top-18 max-h-[calc(100vh-6rem)] overflow-y-auto">
                    <FilterSidebar
                        allToolkits={toolkits}
                        filters={filters}
                        /**
                         * Handles filter changes from the FilterSidebar component.
                         *
                         * @param {string} key - The filter key to update.
                         * @param {string[]} values - The new filter values.
                         */
                        onFilterChange={(key, values) =>
                            setFilters((prev) => ({ ...prev, [key]: values }))
                        }
                    />
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 w-full min-h-screen mt-15 px-10">
                <HeaderSection />
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                <AppliedFilters
                    selectedTags={filters.subcategory_slug}
                    /**
                     * Clears a selected subcategory tag from filters.
                     *
                     * @param {string} tag - The tag to clear.
                     */
                    onTagClear={(tag) =>
                        setFilters((prev) => ({
                            ...prev,
                            subcategory_slug: prev.subcategory_slug.filter((t) => t !== tag)
                        }))
                    }
                    selectedTech={filters.tech}
                    /**
                     * Clears a selected technology from filters.
                     *
                     * @param {string} tech - The technology to clear.
                     */
                    onTechClear={(tech) =>
                        setFilters((prev) => ({
                            ...prev,
                            tech: prev.tech.filter((t) => t !== tech)
                        }))
                    }
                    searchTerm={searchTerm}
                    /**
                     * Clears the current search term.
                     */
                    onSearchClear={() => setSearchTerm('')}
                    /**
                     * Clears all filters.
                     */
                    onClearAll={() =>
                        setFilters({
                            subcategory: [],
                            subcategory_slug: [],
                            tech: [],
                            languages: [],
                            pricing: []
                        })
                    }
                />
                <ToolkitList libraries={filteredToolkits} />
            </main>
        </div>
    );
}
