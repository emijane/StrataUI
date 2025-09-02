// src/hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

type Category = { name: string; slug: string };

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async (): Promise<Category[]> => {
            const { data, error } = await supabase
                .from('types')
                .select('name, slug')
                .order('name', { ascending: true });

            if (error) throw error;
            return (data ?? []) as Category[];
        },
        staleTime: 60 * 60 * 1000, // 1h
    });
}
