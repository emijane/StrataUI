'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Toolkit } from '@/types';

export default function HorizontalFilterBar({
    typeSlug,
    allToolkits,
    selectedSubcategories,
    onSubcategoryChange,
    selectedTech,
    onTechChange,
    allTypes
}: {
    typeSlug?: string;
    allToolkits: Toolkit[];
    selectedSubcategories: string[];
    onSubcategoryChange: (subs: string[]) => void;
    selectedTech: string[];
    onTechChange: (techs: string[]) => void;
    allTypes: { type: string; type_slug: string }[];
}) {
    const pathname = usePathname();

    const [isSubOpen, setIsSubOpen] = useState(false);
    const [isTechOpen, setIsTechOpen] = useState(false);

    const subRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (subRef.current && !subRef.current.contains(e.target as Node)) setIsSubOpen(false);
            if (techRef.current && !techRef.current.contains(e.target as Node)) setIsTechOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredToolkits = typeSlug
        ? allToolkits.filter(t => t.type_slug === typeSlug)
        : allToolkits;

    const uniqueSubcategories = useMemo(() => {
        const map = new Map<string, string>();
        filteredToolkits.forEach(toolkit => {
            if (toolkit.subcategory_slug && toolkit.subcategory) {
                map.set(toolkit.subcategory_slug, toolkit.subcategory);
            }
        });
        return Array.from(map.entries());
    }, [filteredToolkits]);

    const uniqueTechs = useMemo(() => {
        const techSet = new Set<string>();
        filteredToolkits.forEach(lib => lib.tech?.forEach(t => techSet.add(t)));
        return [...techSet].sort();
    }, [filteredToolkits]);

    const toggleSub = (slug: string) => {
        onSubcategoryChange(
            selectedSubcategories.includes(slug)
                ? selectedSubcategories.filter(s => s !== slug)
                : [...selectedSubcategories, slug]
        );
    };

    const toggleTech = (tech: string) => {
        onTechChange(
            selectedTech.includes(tech)
                ? selectedTech.filter(t => t !== tech)
                : [...selectedTech, tech]
        );
    };

    return (
        <div className="w-full z-50">
            {/* Type pills */}
            <div className="flex flex-wrap gap-2 mb-4 mx-auto items-center justify-center max-w-[55rem]">
                {allTypes.map(({ type, type_slug }) => {
                    const isActive = pathname === `/library/${type_slug}`;
                    return (
                        <Link
                            key={type_slug}
                            href={`/library/${type_slug}`}
                            className={`text-xs px-3 py-1 rounded-full border border-black/20 transition ${
                                isActive ? 'bg-black/10 text-black' : 'hover:bg-black/10'
                            }`}
                        >
                            {type}
                        </Link>
                    );
                })}
            </div>

            {/* Subcategory & Technology Filters */}
            <div className="flex gap-4 flex-wrap mt-10 mb-5">
                {/* Subcategory Dropdown */}
                <div className="relative" ref={subRef}>
                    <button
                        onClick={() => {
                            setIsSubOpen(prev => !prev);
                            setIsTechOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-black text-xs rounded-xl border border-black/20 hover:bg-white/20 transition"
                    >
                        Subcategory
                        {selectedSubcategories.length > 0 && (
                            <span className="text-purple-500">({selectedSubcategories.length})</span>
                        )}
                        {isSubOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isSubOpen && (
                        <div className="absolute left-0 mt-2 bg-white p-4 z-50 w-64 rounded-xl border border-black/20 shadow-lg text-xs">
                            <div className="flex flex-col gap-2 text-black">
                                {uniqueSubcategories.map(([slug, label]) => (
                                    <label key={slug} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedSubcategories.includes(slug)}
                                            onChange={() => toggleSub(slug)}
                                            className="appearance-none w-3.5 h-3.5 border border-black/30 rounded-md checked:bg-purple-500"
                                        />
                                        {label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Technology Dropdown */}
                <div className="relative" ref={techRef}>
                    <button
                        onClick={() => {
                            setIsTechOpen(prev => !prev);
                            setIsSubOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-black text-xs rounded-xl border border-black/20 hover:bg-white/20 transition"
                    >
                        Technology
                        {selectedTech.length > 0 && (
                            <span className="text-purple-500">({selectedTech.length})</span>
                        )}
                        {isTechOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isTechOpen && (
                        <div className="absolute left-0 mt-2 bg-white p-4 z-50 w-64 rounded-xl border border-black/20 shadow-lg text-xs">
                            <div className="flex flex-col gap-2 text-black">
                                {uniqueTechs.map((tech) => (
                                    <label key={tech} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedTech.includes(tech)}
                                            onChange={() => toggleTech(tech)}
                                            className="appearance-none w-3.5 h-3.5 border border-black/30 rounded-md checked:bg-purple-500"
                                        />
                                        {tech}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
