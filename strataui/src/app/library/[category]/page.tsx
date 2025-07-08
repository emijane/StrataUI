import { Metadata } from 'next';
import ClientToolkitFetcher from '@/components/library/ClientToolkitFetcher';

type Props = {
  params: { category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  
  // Convert slug to readable name
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const title = `${categoryName} | StrataUI`;
  const description = `Explore our curated collection of ${categoryName.toLowerCase()} tools and libraries. Find the perfect UI components, design systems, and development resources for your next project.`;

  return {
    title,
    description,
    keywords: [categoryName, 'UI library', 'frontend tools', 'development resources', 'component library'],
    openGraph: {
      title,
      description,
      url: `https://strataui.dev/library/${category}`,
      siteName: 'StrataUI',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://strataui.dev/library/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  
  // Convert slug to readable name for structured data
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

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
          <h1>{categoryName} Tools and Libraries</h1>
        </div>
        
        {/* Content area */}
        <div className="relative z-10 mx-auto">
          <ClientToolkitFetcher typeSlug={category} />
        </div>
      </main>
    </>
  );
}