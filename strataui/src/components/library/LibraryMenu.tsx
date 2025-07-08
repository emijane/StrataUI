'use client';

/**
 * LibraryMenu Component
 *
 * This sidebar navigation component fetches a list of toolkits grouped by type and subcategory
 * from Supabase, and renders them as a responsive sidebar for navigation.
 *
 * Behavior:
 * - Fetches all subcategories and their related types (`type_id`)
 * - Groups subcategories by type
 * - Highlights the active subcategory based on the current route
 * - Responsive layout with a mobile drawer and static desktop sidebar
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Props = {
    mobileOpen: boolean;
    onClose: () => void; // Called when a menu item is clicked (used to close the drawer on mobile)
};

// Represents a group of subcategories under a single type
type MenuGroup = {
    type: string;
    typeSlug: string;
    subcategories: { name: string; slug: string }[];
};

// Raw subcategory row fetched from Supabase, with nested type info
type SubcategoryRow = {
    name: string;
    slug: string;
    type: {
        name: string;
        slug: string;
    };
};

export default function LibraryMenu({ mobileOpen, onClose }: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeSub = searchParams.get('subcategory');
    const [menu, setMenu] = useState<MenuGroup[]>([]);

    /**
     * Fetches all subcategories and their associated type info from Supabase.
     * Groups them into a structured format to drive sidebar rendering.
     */
    useEffect(() => {
        const fetchMenu = async () => {
            const { data, error } = await supabase
                .from('subcategories')
                .select(`
                    name,
                    slug,
                    type: type_id (
                        name,
                        slug
                    )
                `);

            if (error) {
                console.error('Failed to fetch menu data:', error);
                return;
            }

            // Normalize and safely cast rows to ensure type consistency
            const typedData: SubcategoryRow[] = (data as unknown[]).map((row) => {
                const r = row as {
                    name: string;
                    slug: string;
                    type: SubcategoryRow['type'] | SubcategoryRow['type'][];
                };
                return {
                    name: r.name,
                    slug: r.slug,
                    type: Array.isArray(r.type) ? r.type[0] : r.type
                };
            });

            // Group subcategories by their typeSlug
            const grouped: Record<string, MenuGroup> = {};

            typedData.forEach((row) => {
                const typeSlug = row.type?.slug;
                if (!row.type || !typeSlug || !row.slug || !row.name) return;

                if (!grouped[typeSlug]) {
                    grouped[typeSlug] = {
                        type: row.type.name,
                        typeSlug,
                        subcategories: []
                    };
                }

                grouped[typeSlug].subcategories.push({
                    name: row.name,
                    slug: row.slug
                });
            });

            setMenu(Object.values(grouped));
        };

        fetchMenu();
    }, []);

    return (
        <aside
            className={`
                bg-white border-r border-gray-200 px-3 py-4 sm:w-75 w-full
                overflow-y-auto 
                ${mobileOpen ? 'block fixed top-[160px] left-0 right-0 z-40 shadow-lg border-b max-h-[calc(100vh-160px)]' : 'hidden'}
                lg:static lg:block lg:top-auto lg:left-auto lg:z-0 lg:h-[calc(100vh-128px)] lg:w-auto lg:shadow-none lg:border-b-0
            `}
            aria-label="Sidebar"
        >
            <div className="px-3 py-4">
                <ul className="space-y-2">
                    {menu.map((group) => (
                        <li key={group.typeSlug} className="mb-5">
                            {/* Make this a clickable link to show all in the category */}
                            <Link 
                                href={`/library/${group.typeSlug}`}
                                className="block text-xs uppercase tracking-wide text-black mb-2 hover:text-gray-700 transition-colors"
                                onClick={onClose}
                            >
                                {group.type}
                            </Link>

                            {/* Subcategory links */}
                            {group.subcategories.map((sub) => {
                                const isActive =
                                    pathname.includes(group.typeSlug) && activeSub === sub.slug;

                                return (
                                    <Link
                                        key={sub.slug}
                                        href={`/library/${group.typeSlug}?subcategory=${sub.slug}`}
                                        className={`block px-4 py-2 rounded-lg hover:underline ${
                                            isActive
                                                ? 'text-black font-semibold text-sm'
                                                : 'text-black text-sm'
                                        }`}
                                        onClick={onClose}
                                    >
                                        {sub.name}
                                    </Link>
                                );
                            })}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
