// filterConfig.ts
export const FILTER_CATEGORIES = {
    Subcategory: {
        field: 'subcategory_slug',
        type: 'multi',
        dynamic: true
    },
    Technology: {
        field: 'tech',
        type: 'array',
        dynamic: true
    }
};
