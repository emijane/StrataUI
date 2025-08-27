/**
 * LibraryPage
 *
 * This is the main route for the `/library` page in StrataUI.
 * It displays a full list of all available toolkits without filtering by type or subcategory.
 *
 * Responsibilities:
 * - Wraps the full-screen content area for displaying the entire toolkit catalog
 * - Renders the <ToolkitFetcher /> component with no `typeSlug` to show everything
 *
 * Behavior:
 * - This acts as the "Explore All" entry point for the StrataUI library
 * - Additional filtering (e.g., by search, tech, tag) is handled inside ToolkitFetcher
 */

import { Metadata } from 'next';
import ClientToolkitFetcher from '@/components/library/ClientToolkitFetcher';
import HeaderSection from '@/components/library/Header';

export const metadata: Metadata = {
  title: 'Frontend UI Library Collection | StrataUI',
  description: 'Discover the best frontend UI libraries, component systems, and design tools. Curated collection of React, Vue, Angular components, CSS frameworks, and development resources.',
  keywords: [
    'frontend UI libraries',
    'component libraries',
    'React UI kits',
    'Vue components',
    'Angular UI',
    'CSS frameworks',
    'design systems',
    'UI components',
    'frontend development tools'
  ],
  openGraph: {
    title: 'Frontend UI Library Collection | StrataUI',
    description: 'Discover the best frontend UI libraries, component systems, and design tools.',
    url: 'https://strataui.dev/library',
    siteName: 'StrataUI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend UI Library Collection | StrataUI',
    description: 'Discover the best frontend UI libraries, component systems, and design tools.',
  },
  alternates: {
    canonical: 'https://strataui.dev/library',
  },
};

export default function LibraryPage() {
  // Structured data for the main library page
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'StrataUI Library',
    url: 'https://strataui.dev/library',
    description: 'Curated collection of frontend UI libraries and development tools',
    publisher: {
      '@type': 'Organization',
      name: 'StrataUI'
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      
      <main className="relative min-h-screen overflow-visible max-w-full items-center justify-center mx-auto">
        {/* Page Title for SEO */}
        <div className="sr-only">
          <h1>Frontend UI Libraries and Development Tools</h1>
          <p>Discover curated collection of React, Vue, Angular components, CSS frameworks, and design systems for modern web development.</p>
        </div>
        
        {/* Content area */}
        <div className="relative z-10 mx-auto">
          <HeaderSection />
          <ClientToolkitFetcher />
        </div>
      </main>
    </>
  );
}
