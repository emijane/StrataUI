import HeaderSection from './Header';
import ToolkitList from './ToolkitList';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Toolkit } from '@/types';
import HorizontalFilterBar from './HorizontalFilterBar';

type Props = {
    typeSlug?: string;
};

function getAllTypes(toolkits: Toolkit[]) {
    const map = new Map<string, string>();
    toolkits.forEach(t => {
        if (t.type && t.type_slug) {
            map.set(t.type_slug, t.type);
        }
    });
    return Array.from(map.entries()).map(([type_slug, type]) => ({
        type,
        type_slug
    }));
}

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

    const handleClearAll = () => {
        setFilters({
            subcategory: [],
            subcategory_slug: [],
            tech: [],
            languages: [],
            pricing: []
        });
        setSearchTerm('');
    };

    return (
        <div className="flex flex-col w-full mt-20 mx-auto px-15">
            <HeaderSection />
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <HorizontalFilterBar
            typeSlug={typeSlug}
            allToolkits={toolkits}
            allTypes={getAllTypes(toolkits)}
            selectedSubcategories={filters.subcategory_slug}
            onSubcategoryChange={(subs) =>
                setFilters((prev) => ({ ...prev, subcategory_slug: subs }))
            }
            selectedTech={filters.tech}
            onTechChange={(techs) =>
                setFilters((prev) => ({ ...prev, tech: techs }))
            }
            onClearAll={handleClearAll}
            />

            <ToolkitList libraries={filteredToolkits} />
        </div>
    );
}
