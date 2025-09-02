// src/components/library/CategoryPills.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Category = { name: string; slug: string };

export default function CategoryPills({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const active = params.get('type') ?? categories[0]?.slug;

    const setType = (slug: string) => {
        const q = new URLSearchParams(params.toString());
        q.set('type', slug);
        q.delete('subs'); // reset subcategory filters when switching category
        router.push(`${pathname}?${q.toString()}`, { scroll: false });
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

    return (
        <div className="flex flex-wrap justify-center gap-2 py-2">
            {categories.map((c) => {
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
