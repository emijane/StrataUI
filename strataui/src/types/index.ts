export type Toolkit = {
    id: number;
    name: string;
    url: string;
    pricing?: string;
    description?: string;

    subcategory?: {
        id: number;
        name: string;
        slug: string;
        type?: {
            id: number;
            name: string;
            slug: string;
        };
    };

    library_tech?: { tech: { name: string } }[];
    library_tags?: { tag: { name: string } }[];
    library_languages?: { language: { name: string } }[];
};
