'use client';

import { useMemo } from 'react';
import { FILTER_CATEGORIES } from '@/lib/filterConfig';
import type { Toolkit } from '@/types';

type FilterMap = {
    subcategory_slug: string[];
    tech: string[];
    languages: string[];
    pricing: string[];
};

type Props = {
    allToolkits: Toolkit[];
    filters: FilterMap;
    onFilterChange: (key: keyof FilterMap, values: string[]) => void;
};

const getUniqueValues = (toolkits: Toolkit[], field: keyof Toolkit): string[] => {
    const values = new Set<string>();
    toolkits.forEach(toolkit => {
        const fieldValue = toolkit[field];
        if (Array.isArray(fieldValue)) {
            fieldValue.forEach(val => val && values.add(val));
        } else if (typeof fieldValue === 'string') {
            if (fieldValue) values.add(fieldValue);
        }
    });
    return [...values].sort();
};

export default function FilterSidebar({ allToolkits, filters, onFilterChange }: Props) {
    const dynamicOptions = useMemo(() => {
        const options: Record<keyof FilterMap, string[]> = {
            subcategory_slug: [],
            tech: [],
            languages: [],
            pricing: []
        };

        Object.values(FILTER_CATEGORIES).forEach(({ field }) => {
            options[field as keyof FilterMap] = getUniqueValues(allToolkits, field as keyof Toolkit);
        });

        return options;
    }, [allToolkits]);

    const handleToggle = (key: keyof FilterMap, value: string) => {
        const current = filters[key] || [];
        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];
        onFilterChange(key, updated);
    };

    return (
        <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-lg">
            {Object.entries(FILTER_CATEGORIES).map(([label, { field }]) => (
                <div key={field}>
                    <h4 className="font-space-mono text-sm font-semibold uppercase tracking-wide mb-4">{label}</h4>
                    <div className="flex flex-col gap-2 text-sm">
                        {dynamicOptions[field as keyof FilterMap].map(option => (
                            <label key={option} className="flex items-center gap-3 text-sm hover:text-purple-300 cursor-pointer transition">
                                <input
                                    type="checkbox"
                                    checked={filters[field as keyof FilterMap]?.includes(option)}
                                    onChange={() => handleToggle(field as keyof FilterMap, option)}
                                    className="appearance-none w-4 h-4 border border-white/30 rounded-md checked:bg-purple-400 checked:border-transparent"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
