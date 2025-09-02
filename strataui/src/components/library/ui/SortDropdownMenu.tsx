'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

type SortKey = 'default' | 'popular-14d';

export default function SortDropdownMenu() {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const currentSort = (params.get('sort') as SortKey) ?? 'default';

    // Close if clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function setSort(next: SortKey) {
        const q = new URLSearchParams(params.toString());
        if (next === 'default') q.delete('sort');
        else q.set('sort', next);
        router.push(`${pathname}?${q.toString()}`, { scroll: false });
        setOpen(false);
    }

    return (
        <div ref={wrapperRef} className="relative flex justify-end max-w-[12rem] text-black/90 text-xs md:text-sm">
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <span>Sort by</span>
                <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform ml-1 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <menu
                    className="absolute right-0 top-full mt-2 min-w-[12rem] border border-gray-300 rounded-lg bg-white shadow-md overflow-hidden z-10"
                >
                    <button
                        className={`block w-full text-left py-2 pl-4 hover:bg-gray-100 ${currentSort === 'default' ? 'bg-gray-50 font-medium' : ''}`}
                        onClick={() => setSort('default')}
                    >
                        Default (Newest)
                    </button>
                    <button
                        className={`block w-full text-left py-2 pl-4 hover:bg-gray-100 ${currentSort === 'popular-14d' ? 'bg-gray-50 font-medium' : ''}`}
                        onClick={() => setSort('popular-14d')}
                    >
                        Popular (14d)
                    </button>
                </menu>
            )}
        </div>
    );
}
