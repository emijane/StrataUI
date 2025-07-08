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

          if (!error && data) {
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
              subcategoryName: data.name
            };
          }
        } else if (typeSlug) {
          const { data, error } = await supabase
            .from('types')
            .select('name, slug')
            .eq('slug', typeSlug)
            .single();

          if (!error && data) {
            return {
              typeName: data.name,
              subcategoryName: undefined
            };
          }
        }
      } catch (error) {
        console.error('Error fetching breadcrumb data:', error);
        throw error;
      }
      
      return {};
    },
    // Only fetch if we have a typeSlug
    enabled: !!typeSlug,
    // Cache for 5 minutes (breadcrumb data is fairly static)
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Custom hook for fetching and caching toolkit/library data
 * Cache key: ['toolkits', typeSlug, subcategorySlug]
 * Cache time: 3 minutes (library data might change more frequently)
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

      // Server-side filtering for better performance
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

      // Transform the data to match the Toolkit type structure
      const transformedData = (data || []).map((item: any) => ({
        ...item,
        subcategory: Array.isArray(item.subcategories) 
          ? {
              ...item.subcategories[0],
              type: Array.isArray(item.subcategories[0]?.types) 
                ? item.subcategories[0].types[0] 
                : item.subcategories[0]?.types
            }
          : item.subcategories,
      }));

      return transformedData as Toolkit[];
    },
    // Cache for 3 minutes (libraries might be added/updated)
    staleTime: 3 * 60 * 1000,
  });
}

/**
 * Combined hook that fetches both breadcrumb and toolkit data in parallel
 * Uses React Query's automatic deduplication and caching
 */
export function useLibraryPageData(typeSlug?: string, subcategorySlug?: string | null) {
  const normalizedSubcategorySlug = subcategorySlug || undefined;
  const breadcrumbQuery = useBreadcrumbData(typeSlug, normalizedSubcategorySlug);
  const toolkitQuery = useToolkitData(typeSlug, normalizedSubcategorySlug);

  return {
    // Breadcrumb data
    categoryData: breadcrumbQuery.data || {},
    breadcrumbLoading: breadcrumbQuery.isLoading,
    breadcrumbError: breadcrumbQuery.error,

    // Toolkit data
    toolkits: toolkitQuery.data || [],
    toolkitsLoading: toolkitQuery.isLoading,
    toolkitsError: toolkitQuery.error,

    // Combined loading/error states
    isLoading: breadcrumbQuery.isLoading || toolkitQuery.isLoading,
    isError: breadcrumbQuery.isError || toolkitQuery.isError,
    error: breadcrumbQuery.error || toolkitQuery.error,

    // Refetch functions
    refetchBreadcrumb: breadcrumbQuery.refetch,
    refetchToolkits: toolkitQuery.refetch,
    refetchAll: () => {
      breadcrumbQuery.refetch();
      toolkitQuery.refetch();
    },
  };
}