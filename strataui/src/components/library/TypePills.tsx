'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type TypePillsProps = {
    allTypes: { type: string; type_slug: string }[];
};

export default function TypePills({ allTypes }: TypePillsProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-wrap gap-2 mb-4 mx-auto items-center justify-center max-w-[55rem]">
            {allTypes.map(({ type, type_slug }) => {
                const isActive = pathname === `/library/${type_slug}`;
                return (
                    <Link
                        key={type_slug}
                        href={`/library/${type_slug}`}
                        className={`text-xs px-3 py-1 rounded-full border border-black/20 transition ${
                            isActive ? 'bg-black/5 text-black' : 'hover:bg-black/5'
                        }`}
                    >
                        {type}
                    </Link>
                );
            })}
        </div>
    );
}
