// filterConfig.ts

/**
 * FILTER_CATEGORIES
 *
 * Configuration object that defines the filtering logic used for toolkits in StrataUI.
 * Each entry corresponds to a filter category (e.g., Subcategory, Technology) and specifies:
 *
 * - `field`: The key or database field used to filter by
 * - `type`: How the filter data should be interpreted:
 *     - `"multi"`: multiple distinct selections (e.g., checkboxes)
 *     - `"array"`: the field in the data is an array of values to match against
 * - `dynamic`: Whether the filter values should be generated dynamically (e.g., from Supabase)
 *
 * This config can be used to power dynamic filter UIs or build query logic.
 */

export const FILTER_CATEGORIES = {
    Subcategory: {
        field: 'subcategory_slug', // used to match against a toolkit's subcategory
        type: 'multi',             // multiple values can be selected
        dynamic: true              // options should be fetched dynamically
    },
    Technology: {
        field: 'tech',             // used to match against toolkit technologies
        type: 'array',             // each toolkit has an array of techs to match from
        dynamic: true              // options should be populated from live data
    }
};
