import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export type SubOption = { name: string; slug: string; count: number };

// shape of each row Supabase returns
type SubcategoryRow = {
    name: string;
    slug: string;
    libraries: { count: number }[]; // aggregated count
};

export function useSubcategoryOptions(typeSlug?: string) {
    return useQuery({
        queryKey: ['subcat-options', typeSlug],
        enabled: !!typeSlug,
        queryFn: async (): Promise<SubOption[]> => {
            const { data, error } = await supabase
                .from('subcategories')
                .select(`
                    name,
                    slug,
                    libraries:libraries(count),
                    types!inner(slug)
                `)
                .eq('types.slug', typeSlug);

            if (error) throw error;

            const rows = (data ?? []) as SubcategoryRow[];

            return rows.map((row) => ({
                name: row.name,
                slug: row.slug,
                count: row.libraries?.[0]?.count ?? 0,
            }));
        },
        staleTime: 5 * 60 * 1000,
    });
}
