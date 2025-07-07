'use client';

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

import ToolkitFetcher from '@/components/library/ToolkitFetcher';

export default function LibraryPage() {
  return (
    <main className="relative min-h-screen overflow-visible max-w-full items-center justify-center mx-auto">
      
      {/* Foreground content area */}
      <div className="relative z-10 mx-auto">
        <ToolkitFetcher />
      </div>
    </main>
  );
}
