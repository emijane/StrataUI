'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Props = {
    mobileOpen: boolean;
    onClose: () => void; // Optional future usage
};

type MenuGroup = {
    type: string;
    typeSlug: string;
    subcategories: { name: string; slug: string }[];
};

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
                 bg-white border-r border-gray-200 px-3 py-4 sm:w-75 w-full overflow-y-auto
                ${mobileOpen ? 'fixed top-[128px] left-0 h-[calc(100vh-128px)] z-40' : 'hidden'}
                lg:static lg:block lg:top-auto lg:left-auto lg:h-auto lg:z-0
            `}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium ">
                    {menu.map((group) => (
                        <li key={group.typeSlug} className='mb-5'>
                            <p className="text-xs uppercase tracking-wide text-black mb-2">
                                {group.type}
                            </p>
                            {group.subcategories.map((sub) => {
                                const isActive =
                                    pathname.includes(group.typeSlug) && activeSub === sub.slug;
                                return (
                                    <Link
                                        key={sub.slug}
                                        href={`/library/${group.typeSlug}?subcategory=${sub.slug}`}
                                        className={`block px-4 py-2 rounded-lg ${
                                            isActive
                                                ? 'text-black font-semibold'
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
