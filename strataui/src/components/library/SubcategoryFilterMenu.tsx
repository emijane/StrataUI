'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export type SubOption = { name: string; slug: string; count?: number };

export default function SubcategoryFilterMenu({ options }: { options: SubOption[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const selected = useMemo(
        () => new Set((params.get('subs') || '').split(',').filter(Boolean)),
        [params]
    );

    const hasSelection = selected.size > 0;

    function applySelection(nextSet: Set<string>) {
        const q = new URLSearchParams(params.toString());
        const arr = Array.from(nextSet);
        if (arr.length) {
            q.set('subs', arr.join(','));
        } else {
            q.delete('subs');
        }
        router.push(`${pathname}?${q.toString()}`, { scroll: false });
    }

    function toggle(slug: string) {
        const next = new Set(selected);
        if (next.has(slug)) {
            next.delete(slug);
        } else {
            next.add(slug);
        }
        applySelection(next);
    }

    function clearAll() {
        applySelection(new Set<string>());
    }

    return (
        <div className="relative">
            <details className="group">
                <summary
                    className="inline-flex items-center gap-2 h-9 px-3 rounded-4xl border border-gray-300 bg-white cursor-pointer select-none"
                    aria-haspopup="listbox"
                >
                    <span className="text-sm">
                        {hasSelection ? `Filters (${selected.size})` : 'Filters'}
                    </span>
                    <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                </summary>

                <div
                    className="absolute right-0 mt-2 w-64 max-h-80 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg z-40 p-1"
                    role="listbox"
                    aria-multiselectable="true"
                >
                    <div className="flex items-center justify-between px-2 py-1.5">
                        <span className="text-xs text-gray-500">Subcategories</span>
                        {hasSelection && (
                            <button
                                onClick={clearAll}
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <ul className="py-1">
                        {options.map((o) => {
                            const active = selected.has(o.slug);
                            return (
                                <li key={o.slug}>
                                    <label
                                        className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-50"
                                        title={o.name}
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={active}
                                                onChange={() => toggle(o.slug)}
                                                className="h-4 w-4 appearance-none border border-gray-300 rounded-xl checked:bg-purple-300 checked:border-transparent"
                                            />
                                            <span className="truncate">{o.name}</span>
                                        </div>
                                        <span className="ml-2 text-xs text-gray-500">
                                            {o.count ?? ''}
                                        </span>
                                    </label>
                                </li>
                            );
                        })}
                        {options.length === 0 && (
                            <li className="px-3 py-2 text-sm text-gray-500">No subcategories</li>
                        )}
                    </ul>
                </div>
            </details>
        </div>
    );
}
