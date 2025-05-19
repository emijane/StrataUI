'use client';

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import LibraryList from './LibraryList';
import FilterSidebar from './FilterSidebar';
import AppliedFilters from './AppliedFilters';
import type { Library } from '@/types';
import HeaderSection from './LibraryFiltersHeader';

export default function LibraryFetcher() {
    const [libraries, setLibraries] = useState<Library[]>([]);
    const [allFetchedLibraries, setAllFetchedLibraries] = useState<Library[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedTech, setSelectedTech] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        async function fetchLibraries() {
            setLoading(true);

            let query = supabase
                .from('libraries')
                .select('id, name, url, tags, tech, description');

            if (selectedTags.length > 0) {
                query = query.overlaps('tags', selectedTags);
            }

            if (selectedTech.length > 0) {
                query = query.overlaps('tech', selectedTech);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching libraries:', error);
                setAllFetchedLibraries([]);
                setLibraries([]);
            } else {
                setAllFetchedLibraries(data || []);
            }

            setLoading(false);
        }

        fetchLibraries();
    }, [selectedTags, selectedTech]);

    const filteredLibraries = useMemo(() => {
        if (!debouncedSearch.trim()) return allFetchedLibraries;

        const term = debouncedSearch.toLowerCase();
        return allFetchedLibraries.filter((lib: Library) => {
            const nameMatch = lib.name.toLowerCase().includes(term);
            const descriptionMatch = lib.description?.toLowerCase().includes(term) ?? false;
            const tagMatch = (lib.tags || []).some((tag: string) =>
                tag.toLowerCase().includes(term)
            );
            return nameMatch || tagMatch || descriptionMatch;
        });
    }, [debouncedSearch, allFetchedLibraries]);

    useEffect(() => {
        setLibraries(filteredLibraries);
    }, [filteredLibraries]);

    return (
        <div className="flex flex-col md:flex-row">
            <FilterSidebar
                selectedTags={selectedTags}
                onTagChange={setSelectedTags}
                selectedTech={selectedTech}
                onTechChange={setSelectedTech}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <div className="flex-1 px-4 pt-16 pb-10">
                <HeaderSection />

                {loading ? (
                    <p className="text-white/80 p-8">Loading tools...</p>
                ) : libraries.length === 0 ? (
                    <p className="text-white/80 p-8 font-space-mono">
                        No tools found. Contact us to feature your development tool!
                    </p>
                ) : (
                    <LibraryList libraries={libraries}>
                        <AppliedFilters
                            selectedTags={selectedTags}
                            onTagClear={(tag) =>
                                setSelectedTags((prev) => prev.filter((t) => t !== tag))
                            }
                            selectedTech={selectedTech}
                            onTechClear={(tech) =>
                                setSelectedTech((prev) => prev.filter((t) => t !== tech))
                            }
                            searchTerm={searchTerm}
                            onSearchClear={() => setSearchTerm('')}
                        />
                    </LibraryList>
                )}
            </div>
        </div>
    );
}
