export type Toolkit = {
    id: number;
    name: string;
    url: string;
    type: string;
    type_slug: string;
    subcategory: string;
    subcategory_slug: string;
    tech: string[];
    languages: string[];
    tags: string[];
    pricing: string[];
    description: string;
    image_url?: string;
    popularity?: number;
    created_at: string;
};
