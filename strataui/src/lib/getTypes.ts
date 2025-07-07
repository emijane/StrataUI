import { supabase } from './supabaseClient';

/**
 * getTypes
 *
 * Fetches a distinct list of toolkit types from the `strataui_db` Supabase table.
 * It filters out any rows where `type_slug` is null and ensures uniqueness by `type_slug`.
 *
 * Returns:
 * - An array of objects containing `type` and `type_slug` (e.g., for use in navigation or filters)
 * - An empty array if the query fails
 *
 * Example result:
 * [
 *   { type: 'Design Tools', type_slug: 'design-tools' },
 *   { type: 'Framework Tools', type_slug: 'framework-tools' }
 * ]
 */

export async function getTypes() {
    // Query for type and type_slug, excluding any null slugs
    const { data, error } = await supabase
        .from('strataui_db')
        .select('type, type_slug')
        .neq('type_slug', null);

    // Handle fetch error gracefully
    if (error) {
        console.error('Error fetching types:', error);
        return [];
    }

    // Ensure uniqueness by `type_slug` using a Map
    const unique = Array.from(
        new Map(data.map(item => [item.type_slug, item])).values()
    );

    return unique;
}
