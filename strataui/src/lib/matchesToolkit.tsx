import type { Toolkit } from '@/types';

/**
 * matchesToolkit
 *
 * Determines whether a given toolkit matches all of the currently applied filters and search term.
 *
 * This function is used to filter the list of toolkits on the client side in StrataUI.
 *
 * Parameters:
 * - `toolkit`: A single Toolkit object to evaluate
 * - `filters`: An object containing arrays of selected filter values:
 *     - `subcategory_ids`: IDs of subcategories to match against
 *     - `tech`: Selected technology names to match against the toolkit's tech stack
 *     - `languages`: Selected programming languages
 *     - `pricing`: Selected pricing models (e.g., "free", "paid")
 * - `searchTerm`: A search string input from the user
 *
 * Returns:
 * - `true` if the toolkit matches all active filters and search term
 * - `false` otherwise
 */

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
    // Subcategory filter
    const matchesSubcategory =
        filters.subcategory_ids.length === 0 ||
        (toolkit.subcategory?.id !== undefined &&
         filters.subcategory_ids.includes(toolkit.subcategory.id));

    // Technology filter
    const techs = toolkit.library_tech?.map((t: { tech?: { name?: string } }) => t.tech?.name) || [];
    const matchesTech =
        filters.tech.length === 0 ||
        filters.tech.some(t => techs.includes(t));

    // Language filter
    const langs = toolkit.library_languages?.map((l: { language?: { name?: string } }) => l.language?.name) || [];
    const matchesLangs =
        filters.languages.length === 0 ||
        filters.languages.some(l => langs.includes(l));

    // Pricing filter
    const matchesPricing =
        filters.pricing.length === 0 ||
        (toolkit.pricing !== undefined && filters.pricing.includes(toolkit.pricing));

    // Free-text search filter (matches name or description)
    const matchesSearch =
        searchTerm.trim() === '' ||
        toolkit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toolkit.description?.toLowerCase().includes(searchTerm.toLowerCase());

    // Return true only if the toolkit satisfies all active filters
    return (
        Boolean(matchesSubcategory) &&
        Boolean(matchesTech) &&
        Boolean(matchesLangs) &&
        Boolean(matchesPricing) &&
        Boolean(matchesSearch)
    );
}
