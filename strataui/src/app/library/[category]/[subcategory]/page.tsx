import { Metadata } from 'next';
import ClientToolkitFetcher from '@/components/library/ClientToolkitFetcher';

type Props = {
  params: { category: string; subcategory: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  
  // Convert slugs to readable names
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const subcategoryName = subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const title = `${subcategoryName} - ${categoryName} | StrataUI`;
  const description = `Discover ${subcategoryName.toLowerCase()} tools and libraries in our ${categoryName.toLowerCase()} collection. Curated resources for modern frontend development.`;

  return {
    title,
    description,
    keywords: [subcategoryName, categoryName, 'UI library', 'frontend tools', 'development resources'],
    openGraph: {
      title,
      description,
      url: `https://strataui.dev/library/${category}/${subcategory}`,
      siteName: 'StrataUI',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://strataui.dev/library/${category}/${subcategory}`,
    },
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { category, subcategory } = await params;
  
  // Convert slugs to readable names for structured data
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const subcategoryName = subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Structured data for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Library',
        item: 'https://strataui.dev/library'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `https://strataui.dev/library/${category}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: subcategoryName,
        item: `https://strataui.dev/library/${category}/${subcategory}`
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <main className="relative min-h-screen overflow-visible max-w-full items-center justify-center mx-auto">
        {/* Page Title for SEO */}
        <div className="sr-only">
          <h1>{subcategoryName} - {categoryName} Tools and Libraries</h1>
        </div>
        
        {/* Content area */}
        <div className="relative z-10 mx-auto">
          <ClientToolkitFetcher 
            typeSlug={category} 
            subcategorySlug={subcategory}
          />
        </div>
      </main>
    </>
  );
}