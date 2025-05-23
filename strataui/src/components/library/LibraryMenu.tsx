'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type MenuGroup = {
    type: string;
    typeSlug: string;
    subcategories: { name: string; slug: string }[];
};

export default function LibraryMenu() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeSub = searchParams.get('subcategory');

    const [menu, setMenu] = useState<MenuGroup[]>([]);

    useEffect(() => {
        const fetchMenu = async () => {
            const { data, error } = await supabase
                .from('strataui_db')
                .select('type, type_slug, subcategory, subcategory_slug')
                .order('type_slug', { ascending: true });

            if (error) {
                console.error('Failed to fetch menu data:', error);
                return;
            }

            const grouped: Record<string, MenuGroup> = {};

            data.forEach((row) => {
                if (!row.type_slug || !row.subcategory || !row.subcategory_slug) return;

                if (!grouped[row.type_slug]) {
                    grouped[row.type_slug] = {
                        type: row.type,
                        typeSlug: row.type_slug,
                        subcategories: []
                    };
                }

                grouped[row.type_slug].subcategories.push({
                    name: row.subcategory,
                    slug: row.subcategory_slug
                });
            });

            setMenu(Object.values(grouped));
        };

        fetchMenu();
    }, []);

    const chunkedMenu = menu.reduce<MenuGroup[][]>((acc, item, index) => {
        const chunkIndex = Math.floor(index / 3);
        if (!acc[chunkIndex]) acc[chunkIndex] = [];
        acc[chunkIndex].push(item);
        return acc;
    }, []);

    return (
        <aside className="w-full">
            <div className="mb-5">
                <Link
                    href="/library"
                    className="block px-3 py-2 text-sm text-black/80 font-medium hover:bg-white/10 rounded-md"
                >
                    View All Toolkits
                </Link>
            </div>
            <div className="flex gap-10">
                {chunkedMenu.map((column, i) => (
                    <div key={i} className="space-y-6">
                        {column.map((group) => (
                            <div key={group.typeSlug}>
                                <p className="text-xs uppercase tracking-wide mb-2 text-black/60 font-semibold">
                                    {group.type}
                                </p>
                                <ul className="space-y-1">
                                    {group.subcategories.map((sub) => {
                                        const isActive = pathname.includes(group.typeSlug) && activeSub === sub.slug;
                                        return (
                                            <li key={sub.slug}>
                                                <Link
                                                    href={`/library/${group.typeSlug}?subcategory=${sub.slug}`}
                                                    className={`block px-3 py-1 rounded-md transition-colors ${
                                                        isActive
                                                            ? 'bg-white/10 text-black font-medium'
                                                            : 'text-black/70 hover:bg-white/5'
                                                    }`}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </aside>
    );
}
