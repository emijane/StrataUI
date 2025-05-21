// components/ToolkitFetcher.tsx

'use client';

import HeaderSection from './Header';
import FilterSidebar from './FilterSidebar';
import AppliedFilters from './ActiveFilters';
import ToolkitList from './ToolkitList';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Toolkit } from '@/types';

type Props = {
    typeSlug?: string;
};

export default function ToolkitFetcher({ typeSlug }: Props) {
    const [toolkits, setToolkits] = useState<Toolkit[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        subcategory: [] as string[],
        subcategory_slug: [] as string[],
        tech: [] as string[],
        languages: [] as string[],
        pricing: [] as string[]
    });

    useEffect(() => {
        const fetchToolkits = async () => {
            let query = supabase.from('strataui_db').select(`
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
        <div className="flex flex-col lg:flex-row w-full max-w-[94rem] mx-auto gap-8 px-4">
            <aside className="w-full lg:max-w-xs flex-shrink-0">
                <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
                    <FilterSidebar
                        allToolkits={toolkits}
                        filters={filters}
                        onFilterChange={(key, values) =>
                            setFilters((prev) => ({ ...prev, [key]: values }))
                        }
                    />
                </div>
            </aside>

            <main className="flex-1 w-full min-h-screen">
                <HeaderSection />
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                <AppliedFilters
                    selectedTags={filters.subcategory_slug}
                    onTagClear={(tag) =>
                        setFilters((prev) => ({
                            ...prev,
                            subcategory_slug: prev.subcategory_slug.filter((t) => t !== tag)
                        }))
                    }
                    selectedTech={filters.tech}
                    onTechClear={(tech) =>
                        setFilters((prev) => ({
                            ...prev,
                            tech: prev.tech.filter((t) => t !== tech)
                        }))
                    }
                    searchTerm={searchTerm}
                    onSearchClear={() => setSearchTerm('')}
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
