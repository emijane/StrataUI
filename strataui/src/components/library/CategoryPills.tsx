// src/components/library/CategoryPills.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Category = { name: string; slug: string };

export default function CategoryPills({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    // Treat absence of ?type as "all"
    const active = params.get('type') ?? 'all';

    const setType = (slug: string) => {
        const q = new URLSearchParams(params.toString());

        if (slug === 'all') {
            q.delete('type'); // clean URL for "All"
        } else {
            q.set('type', slug);
        }

        // switching category (or "All") should reset subcategory filters
        q.delete('subs');

        const qs = q.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    };

    if (!categories?.length) {
        return (
            <div className="flex gap-2 py-2">
                <span className="h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
                <span className="h-8 w-24 rounded-full bg-gray-200 animate-pulse" />
                <span className="h-8 w-16 rounded-full bg-gray-200 animate-pulse" />
            </div>
        );
    }

    // Prepend the synthetic "All" option
    const pills: Category[] = [{ name: 'All', slug: 'all' }, ...categories];

    return (
        <div className="flex flex-wrap justify-center gap-2 py-2">
            {pills.map((c) => {
                const isActive = c.slug === active;
                return (
                    <button
                        key={c.slug}
                        onClick={() => setType(c.slug)}
                        className={`h-8 px-3 rounded-full border whitespace-nowrap transition
                            ${isActive
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-black border-gray-300 hover:bg-gray-100'}`}
                        aria-pressed={isActive}
                        aria-current={isActive ? 'page' : undefined}
                        title={c.name}
                    >
                        {c.name}
                    </button>
                );
            })}
        </div>
    );
}
