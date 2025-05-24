import type { Toolkit } from '@/types';

export function matchesToolkit(
    toolkit: Toolkit,
    filters: {
        subcategory_ids: number[];
        tech: string[];
        languages: string[];
        pricing: string[];
    },
    searchTerm: string
): boolean {
    const matchesSubcategory =
        filters.subcategory_ids.length === 0 ||
        (toolkit.subcategory?.id !== undefined &&
         filters.subcategory_ids.includes(toolkit.subcategory.id));

    const techs = toolkit.library_tech?.map((t: { tech?: { name?: string } }) => t.tech?.name) || [];
    const matchesTech =
        filters.tech.length === 0 ||
        filters.tech.some(t => techs.includes(t));

    const langs = toolkit.library_languages?.map((l: { language?: { name?: string } }) => l.language?.name) || [];
    const matchesLangs =
        filters.languages.length === 0 ||
        filters.languages.some(l => langs.includes(l));

    const matchesPricing =
        filters.pricing.length === 0 ||
        (toolkit.pricing !== undefined && filters.pricing.includes(toolkit.pricing));

    const matchesSearch =
        searchTerm.trim() === '' ||
        toolkit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toolkit.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return (
        Boolean(matchesSubcategory) &&
        Boolean(matchesTech) &&
        Boolean(matchesLangs) &&
        Boolean(matchesPricing) &&
        Boolean(matchesSearch)
    );
}
