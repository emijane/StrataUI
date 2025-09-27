'use client';

/**
 * Breadcrumb Component
 *
 * Dynamically generates breadcrumbs based on the current route, category, and subcategory.
 * Displays navigation hierarchy like: Library → Category → Subcategory
 *
 * Props:
 * - `typeSlug` (optional string): The current category slug
 * - `typeName` (optional string): The current category display name
 * - `subcategorySlug` (optional string): The current subcategory slug
 * - `subcategoryName` (optional string): The current subcategory display name
 */

import Link from 'next/link';

type Props = {
    typeSlug?: string;
    typeName?: string;
    subcategorySlug?: string;
    subcategoryName?: string;
};

export default function Breadcrumb({
    typeSlug,
    typeName,
    subcategorySlug,
    subcategoryName,
}: Props) {
    const renderSeparator = () => (
        <span className="text-gray-300 mx-2">/</span>
    );

    // Don’t render anything on the main /library page
    if (!typeSlug) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className="hidden lg:block text-sm px-7 py-2"
        >
            {/* Library - always clickable if we have a typeSlug */}
            <Link
                href="/library"
                className="text-gray-600 hover:text-black hover:underline transition-colors"
            >
                Library
            </Link>

            {/* Category */}
            {typeName && (
                <>
                    {renderSeparator()}
                    {subcategorySlug && subcategoryName ? (
                        <Link
                            href={`/library/${typeSlug}`}
                            className="text-gray-600 hover:text-black hover:underline transition-colors"
                        >
                            {typeName}
                        </Link>
                    ) : (
                        <span className="text-black font-semibold">{typeName}</span>
                    )}
                </>
            )}

            {/* Subcategory */}
            {subcategorySlug && subcategoryName && (
                <>
                    {renderSeparator()}
                    <span className="text-black font-semibold">
                        {subcategoryName}
                    </span>
                </>
            )}
        </nav>
    );
}
