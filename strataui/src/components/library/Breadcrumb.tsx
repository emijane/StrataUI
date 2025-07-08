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

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

type Props = {
    typeSlug?: string;
    typeName?: string;
    subcategorySlug?: string;
    subcategoryName?: string;
};

type BreadcrumbData = {
    typeName: string;
    subcategoryName?: string;
};

export default function Breadcrumb({ typeSlug, typeName, subcategorySlug, subcategoryName }: Props) {
    const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData | null>(null);

    // Fetch category and subcategory names if not provided
    useEffect(() => {
        const fetchBreadcrumbData = async () => {
            if (!typeSlug) {
                setBreadcrumbData(null);
                return;
            }

            // If we have all the data we need, use it directly
            if (typeName && (!subcategorySlug || subcategoryName)) {
                setBreadcrumbData({
                    typeName,
                    subcategoryName
                });
                return;
            }

            // Otherwise, fetch the data from Supabase
            const { data, error } = await supabase
                .from('types')
                .select(`
                    name,
                    slug,
                    subcategories (
                        name,
                        slug
                    )
                `)
                .eq('slug', typeSlug)
                .single();

            if (error) {
                console.error('Error fetching breadcrumb data:', error);
                return;
            }

            let resolvedSubcategoryName = subcategoryName;
            if (subcategorySlug && !subcategoryName && data.subcategories) {
                const subcategory = data.subcategories.find((sub: any) => sub.slug === subcategorySlug);
                resolvedSubcategoryName = subcategory?.name;
            }

            setBreadcrumbData({
                typeName: data.name,
                subcategoryName: resolvedSubcategoryName
            });
        };

        fetchBreadcrumbData();
    }, [typeSlug, typeName, subcategorySlug, subcategoryName]);

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

            {/* Show category if we have breadcrumb data */}
            {breadcrumbData && (
                <>
                    {renderSeparator()}
                    <Link 
                        href={`/library/${typeSlug}`}
                        className="text-gray-600 hover:text-black transition-colors"
                    >
                        {breadcrumbData.typeName}
                    </Link>
                </>
            )}

            {/* Show subcategory if present */}
            {breadcrumbData?.subcategoryName && (
                <>
                    {renderSeparator()}
                    <span className="text-black font-medium">
                        {breadcrumbData.subcategoryName}
                    </span>
                </>
            )}

            {/* If no specific data, show generic "Designer Tools" */}
            {!breadcrumbData && (
                <>
                    {renderSeparator()}
                    <span className="text-black font-medium">Designer Tools</span>
                </>
            )}
        </nav>
    );
}