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
            {/* Leading separator */}
            <span className="text-gray-400 mr-2">/</span>
            
            {/* Library - clickable if not on main library page, bolded if current page */}
            {typeSlug ? (
                <Link 
                    href="/library" 
                    className="text-gray-600 hover:text-black transition-colors"
                >
                    Library
                </Link>
            ) : (
                <span className="text-black font-bold">Library</span>
            )}

            {/* Show category if we have type data */}
            {typeSlug && typeName && (
                <>
                    {renderSeparator()}
                    {/* Category - clickable if we have subcategory, bolded if current page */}
                    {subcategorySlug && subcategoryName ? (
                        <Link 
                            href={`/library/${typeSlug}`}
                            className="text-gray-600 hover:text-black transition-colors"
                        >
                            {typeName}
                        </Link>
                    ) : (
                        <span className="text-black font-bold">{typeName}</span>
                    )}
                </>
            )}

            {/* Show subcategory if present - always current page so always bolded */}
            {subcategorySlug && subcategoryName && (
                <>
                    {renderSeparator()}
                    <span className="text-black font-bold">
                        {subcategoryName}
                    </span>
                </>
            )}
        </nav>
    );
}