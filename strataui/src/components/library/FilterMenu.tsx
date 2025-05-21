// DEPRECATED - Filter menu manager (horizontal)

'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Toolkit } from '@/types';

type Props = {
    selectedSubcategories: string[];
    onSubcategoryChange: (subcategories: string[]) => void;
    selectedTech: string[];
    onTechChange: (techs: string[]) => void;
    allLibraries: Toolkit[];
};

export default function FilterMenu({
    selectedSubcategories,
    onSubcategoryChange,
    selectedTech,
    onTechChange,
    allLibraries
}: Props) {
    const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
    const [isTechOpen, setIsTechOpen] = useState(false);

    const subcategoryRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);

    // ⬇️ Dynamically extract unique subcategories and techs
    const uniqueSubcategories = useMemo(() => {
        return [...new Set(allLibraries.map(lib => lib.subcategory_slug).filter(Boolean))].sort();
    }, [allLibraries]);

    const uniqueTechs = useMemo(() => {
        const techSet = new Set<string>();
        allLibraries.forEach(lib => lib.tech?.forEach(t => techSet.add(t)));
        return [...techSet].sort();
    }, [allLibraries]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (subcategoryRef.current && !subcategoryRef.current.contains(event.target as Node)) {
                setIsSubcategoryOpen(false);
            }
            if (techRef.current && !techRef.current.contains(event.target as Node)) {
                setIsTechOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getSubcategoryCount = (slug: string) =>
        allLibraries.filter(lib => lib.subcategory_slug === slug).length;

    const getTechCount = (tech: string) =>
        allLibraries.filter(lib => lib.tech?.includes(tech)).length;

    const toggleSubcategory = (slug: string) => {
        onSubcategoryChange(
            selectedSubcategories.includes(slug)
                ? selectedSubcategories.filter(t => t !== slug)
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
        <div className="w-full py-4 relative z-50">
            <div className="flex gap-4 flex-wrap">

                {/* Subcategory Filter */}
                <div className="relative" ref={subcategoryRef}>
                    <button
                        onClick={() => {
                            setIsSubcategoryOpen(prev => !prev);
                            setIsTechOpen(false);
                        }}
                        className="font-space-mono flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-xs rounded-xl border border-white/20 hover:bg-white/20 transition"
                    >
                        Type
                        {selectedSubcategories.length > 0 && (
                            <span className="text-purple-300">({selectedSubcategories.length})</span>
                        )}
                        {isSubcategoryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isSubcategoryOpen && (
                        <div className="font-space-mono text-xs absolute left-0 mt-2 bg-custom-gray shadow-lg p-4 z-50 w-64 rounded-xl border border-white/20">
                            <div className="flex flex-col gap-3 text-white text-xs">
                                {uniqueSubcategories.map(slug => (
                                    <label key={slug} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800">
                                        <input
                                            type="checkbox"
                                            checked={selectedSubcategories.includes(slug)}
                                            onChange={() => toggleSubcategory(slug)}
                                            className="appearance-none w-3.5 h-3.5 border border-white/20 rounded-xl checked:bg-purple-300"
                                        />
                                        {slug} ({getSubcategoryCount(slug)})
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Technology Filter */}
                <div className="relative" ref={techRef}>
                    <button
                        onClick={() => {
                            setIsTechOpen(prev => !prev);
                            setIsSubcategoryOpen(false);
                        }}
                        className="font-space-mono flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-xs rounded-xl border border-white/20 hover:bg-white/20 transition"
                    >
                        Technology
                        {selectedTech.length > 0 && (
                            <span className="text-purple-300">({selectedTech.length})</span>
                        )}
                        {isTechOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isTechOpen && (
                        <div className="font-space-mono absolute left-0 mt-2 bg-custom-gray shadow-lg p-4 z-50 w-64 rounded-xl border border-white/20">
                            <div className="flex flex-col gap-3 text-white text-xs">
                                {uniqueTechs.map(tech => (
                                    <label key={tech} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedTech.includes(tech)}
                                            onChange={() => toggleTech(tech)}
                                            className="appearance-none w-3.5 h-3.5 border border-white/20 rounded-xl checked:bg-purple-300"
                                        />
                                        {tech} ({getTechCount(tech)})
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
