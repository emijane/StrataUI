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

export default function Breadcrumb({ typeSlug, typeName, subcategorySlug, subcategoryName }: Props) {
    const renderSeparator = () => (
        <span className="text-gray-400 mx-2">/</span>
    );

    return (
        <nav aria-label="Breadcrumb" className="flex items-center text-sm">
            {/* Always show Library as the root */}
            <Link 
                href="/library" 
                className="text-gray-600 hover:text-black transition-colors"
            >
                Library
            </Link>

            {/* Show category if we have type data */}
            {typeSlug && typeName && (
                <>
                    {renderSeparator()}
                    <Link 
                        href={`/library/${typeSlug}`}
                        className="text-gray-600 hover:text-black transition-colors"
                    >
                        {typeName}
                    </Link>
                </>
            )}

            {/* Show subcategory if present */}
            {subcategorySlug && subcategoryName && (
                <>
                    {renderSeparator()}
                    <Link 
                        href={`/library/${typeSlug}?subcategory=${subcategorySlug}`}
                        className="text-black font-medium hover:text-gray-700 transition-colors"
                    >
                        {subcategoryName}
                    </Link>
                </>
            )}
        </nav>
    );
}