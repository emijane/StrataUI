'use client';

/**
 * LibraryMenu Component (Collapsible + Expand/Collapse Toggle + Persistence)
 *
 * Features:
 * - Collapsible type groups with subcategories.
 * - Auto-expands the group matching the current route.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Props = {
    mobileOpen: boolean;
    onClose: () => void;
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

const STORAGE_KEY = 'stratauiSidebarExpanded';

export default function LibraryMenu({ mobileOpen, onClose }: Props) {
    const pathname = usePathname();
    const [menu, setMenu] = useState<MenuGroup[]>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    // Fetch menu from Supabase
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

            const groups = Object.values(grouped).map((g) => ({
                ...g,
                subcategories: g.subcategories.sort((a, b) => a.name.localeCompare(b.name))
            }));

            setMenu(groups);
        };

        fetchMenu();
    }, []);

    // Expand all groups by default when menu first loads
    useEffect(() => {
        if (menu.length === 0) return;
        setExpanded(() => {
            const all: Record<string, boolean> = {};
            menu.forEach((g) => (all[g.typeSlug] = true));
            return all;
        });
    }, [menu]);

    // Load persisted expanded state
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved) as Record<string, boolean>;
                setExpanded(parsed);
            } catch {
                // ignore
            }
        }
    }, []);

    // Auto-expand active group
    useEffect(() => {
        if (menu.length === 0) return;
        setExpanded((prev) => {
            const next = { ...prev };
            menu.forEach((group) => {
                if (pathname.includes(`/library/${group.typeSlug}`)) {
                    next[group.typeSlug] = true;
                }
            });
            return next;
        });
    }, [pathname, menu]);

    // Toggle a single group
    const toggle = (slug: string) => {
        setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
    };

    const Chevron = ({ open }: { open: boolean }) => (
        <svg
            className={`h-4 w-4 transition-transform hover:cursor-pointer ${open ? 'rotate-90' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707A1 1 0 1 1 8.707 5.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z" />
        </svg>
    );

    return (
        <aside
            className={`
                bg-white border-r border-gray-200 px-4 py-5 sm:w-75 w-full
                overflow-y-auto
                ${mobileOpen ? 'block fixed top-[160px] left-0 right-0 z-40 shadow-lg border-b max-h-[calc(100vh-160px)]' : 'hidden'}
                lg:static lg:block lg:top-auto lg:left-auto lg:z-0 lg:h-[calc(100vh-128px)] lg:w-auto lg:shadow-none lg:border-b-0
            `}
            aria-label="Sidebar"
        >
            <div className="px-3">

                <ul className="space-y-2">
                    {menu.map((group) => {
                        const isOpen = !!expanded[group.typeSlug];
                        const panelId = `panel-${group.typeSlug}`;
                        const btnId = `btn-${group.typeSlug}`;

                        return (
                            <li key={group.typeSlug} className="mb-3">
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/library/${group.typeSlug}`}
                                        className="text-xs uppercase tracking-wide text-gray-700 hover:text-black hover:underline transition-colors"
                                        onClick={onClose}
                                    >
                                        {group.type}
                                    </Link>

                                    <button
                                        id={btnId}
                                        type="button"
                                        className="flex items-center gap-2 text-gray-600 hover:text-black text-xs px-2 py-1 rounded-md"
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        onClick={() => toggle(group.typeSlug)}
                                    >
                                        <span className="sr-only">
                                            {isOpen ? 'Collapse' : 'Expand'} {group.type}
                                        </span>
                                        <Chevron open={isOpen} />
                                    </button>
                                </div>

                                <div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={btnId}
                                    className={`mt-2 overflow-hidden transition-all duration-200 ease-out ${
                                        isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="pl-2">
                                        {group.subcategories.map((sub) => {
                                            const isActive = pathname.includes(
                                                `${group.typeSlug}/${sub.slug}`
                                            );
                                            return (
                                                <Link
                                                    key={sub.slug}
                                                    href={`/library/${group.typeSlug}/${sub.slug}`}
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
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
