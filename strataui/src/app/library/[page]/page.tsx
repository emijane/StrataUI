'use client';

/**
 * TypePage
 *
 * This dynamic route component renders a category-specific page in StrataUI,
 * such as `/library/design-systems-kits`, based on the `type` slug in the URL.
 *
 * Responsibilities:
 * - Extracts the `type` slug from the URL
 * - Formats a readable title from the slug (e.g., "design-systems-kits" → "Design Systems Kits")
 * - Sets up dynamic metadata with `<Head>` for SEO and social sharing
 * - Renders the <ToolkitFetcher /> to display filtered toolkits by category
 *
 * Behavior:
 * - If the URL contains query parameters (e.g., `?subcategory=...`), a `noindex` tag is added for SEO purposes
 */

import { useParams, usePathname } from 'next/navigation';
import Head from 'next/head';
import ToolkitFetcher from '@/components/library/ToolkitFetcher';

export default function TypePage() {
    // Grab the `type` slug from the dynamic route (e.g., "design-systems-kits")
    const { page } = useParams();

    // Get the full pathname (used to set canonical URL and noindex condition)
    const pathname = usePathname();

    // Convert the slug to a readable page title (e.g., "design-systems-kits" → "Design Systems Kits")
    const readableTitle = String(page)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

    return (
        <>
            <Head>
                <title>{readableTitle} | StrataUI</title>
                <meta
                    name="description"
                    content={`Explore ${readableTitle} toolkits curated to enhance your workflow.`}
                />
                <link rel="canonical" href={`https://strataui.dev${pathname}`} />
                {/* Prevent search engines from indexing filtered views */}
                {pathname.includes('?') && <meta name="robots" content="noindex" />}
            </Head>

            <main className="relative min-h-screen overflow-visible max-w-full items-center justify-center mx-auto">
                {/* Foreground content area */}
                <div className="relative z-10 mx-auto">
                    <ToolkitFetcher typeSlug={page as string} />
                </div>
            </main>
        </>
    );
}
