import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://strataui.dev'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Fetch all categories and subcategories
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select(`
      slug,
      types (
        slug
      )
    `)

  const dynamicPages = []

  if (subcategories) {
    // Group by type to get unique categories
    const categories = new Set()
    
    subcategories.forEach((sub: any) => {
      if (sub.types?.slug) {
        categories.add(sub.types.slug)
      }
    })

    // Add category pages
    categories.forEach((categorySlug: any) => {
      dynamicPages.push({
        url: `${baseUrl}/library/${categorySlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })
    })

    // Add subcategory pages
    subcategories.forEach((sub: any) => {
      if (sub.types?.slug && sub.slug) {
        dynamicPages.push({
          url: `${baseUrl}/library/${sub.types.slug}/${sub.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        })
      }
    })
  }

  return [...staticPages, ...dynamicPages]
}