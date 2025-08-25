import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import type { Toolkit } from '@/types';

/**
 * Custom hook for fetching and caching breadcrumb data
 * Cache key: ['breadcrumb', typeSlug, subcategorySlug]
 * Cache time: 5 minutes (breadcrumb data rarely changes)
 */
export function useBreadcrumbData(typeSlug?: string, subcategorySlug?: string) {
  return useQuery({
    queryKey: ['breadcrumb', typeSlug, subcategorySlug],
    queryFn: async () => {
      if (!typeSlug) return {};

      try {
        if (subcategorySlug) {
          const { data, error } = await supabase
            .from('subcategories')
            .select(`
              name,
              slug,
              types (
                name,
                slug
              )
            `)
            .eq('slug', subcategorySlug)
            .single();

          if (error) throw error;

          if (data) {
            let typeName: string | undefined;
            if (data.types) {
              if (Array.isArray(data.types)) {
                typeName = data.types[0]?.name;
              } else {
                typeName = (data.types as any).name;
              }
            }

            return {
              typeName,
              subcategoryName: data.name,
            };
          }
        } else {
          const { data, error } = await supabase
            .from('types')
            .select('name, slug')
            .eq('slug', typeSlug)
            .single();

          if (error) throw error;

          if (data) {
            return {
              typeName: data.name,
              subcategoryName: undefined,
            };
          }
        }
      } catch (error) {
        console.error('Error fetching breadcrumb data:', error);
        throw error;
      }

      return {};
    },
    enabled: !!typeSlug,
    staleTime: 5 * 60 * 1000,     // 5 minutes
    gcTime: 30 * 60 * 1000,       // keep around 30 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Custom hook for fetching and caching toolkit/library data
 * Cache key: ['toolkits', typeSlug, subcategorySlug]
 * Cache time: 3 minutes (library data might change more frequently)
 *
 * NOTE:
 * - Adds `image` to the select so your cards can render thumbnails.
 * - Keeps subcategory/type joins, then normalizes to your Toolkit shape.
 */
export function useToolkitData(typeSlug?: string, subcategorySlug?: string) {
  return useQuery({
    queryKey: ['toolkits', typeSlug, subcategorySlug],
    queryFn: async (): Promise<Toolkit[]> => {
      let query = supabase
        .from('libraries')
        .select(`
          id,
          name,
          url,
          pricing,
          description,
          library_image,                                 
          subcategories!inner (
            id,
            name,
            slug,
            types!inner (
              id,
              name,
              slug
            )
          ),
          library_tags (tag: tag_id (name)),
          library_tech (tech: tech_id (name)),
          library_languages (language: language_id (name))
        `);

      // Server-side filtering
      if (typeSlug) {
        query = query.eq('subcategories.types.slug', typeSlug);
      }
      if (subcategorySlug) {
        query = query.eq('subcategories.slug', subcategorySlug);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching toolkits:', error);
        throw error;
      }

      // Normalize nested arrays from joins to match Toolkit shape
      const transformed = (data || []).map((item: any) => {
        const sub = Array.isArray(item.subcategories) ? item.subcategories[0] : item.subcategories;
        const type =
          sub && sub.types
            ? (Array.isArray(sub.types) ? sub.types[0] : sub.types)
            : undefined;

        return {
          id: item.id,
          name: item.name,
          url: item.url,
          pricing: item.pricing ?? undefined,
          description: item.description ?? undefined,
          library_image: item.library_image ?? null,                
          subcategory: sub
            ? {
                id: sub.id,
                name: sub.name,
                slug: sub.slug,
                type: type
                  ? { id: type.id, name: type.name, slug: type.slug }
                  : undefined,
              }
            : undefined,
          library_tags: item.library_tags ?? [],
          library_tech: item.library_tech ?? [],
          library_languages: item.library_languages ?? [],
        } as Toolkit;
      });

      return transformed;
    },
    staleTime: 3 * 60 * 1000,     // 3 minutes
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

/**
 * Combined hook that fetches both breadcrumb and toolkit data in parallel
 */
export function useLibraryPageData(typeSlug?: string, subcategorySlug?: string | null) {
  const normalizedSub = subcategorySlug || undefined;
  const breadcrumbQuery = useBreadcrumbData(typeSlug, normalizedSub);
  const toolkitQuery = useToolkitData(typeSlug, normalizedSub);

  return {
    // Breadcrumb data
    categoryData: breadcrumbQuery.data || {},
    breadcrumbLoading: breadcrumbQuery.isLoading,
    breadcrumbError: breadcrumbQuery.error,

    // Toolkit data
    toolkits: toolkitQuery.data || [],
    toolkitsLoading: toolkitQuery.isLoading,
    toolkitsError: toolkitQuery.error,

    // Combined states
    isLoading: breadcrumbQuery.isLoading || toolkitQuery.isLoading,
    isError: breadcrumbQuery.isError || toolkitQuery.isError,
    error: breadcrumbQuery.error || toolkitQuery.error,

    // Refetchers
    refetchBreadcrumb: breadcrumbQuery.refetch,
    refetchToolkits: toolkitQuery.refetch,
    refetchAll: () => {
      breadcrumbQuery.refetch();
      toolkitQuery.refetch();
    },
  };
}
