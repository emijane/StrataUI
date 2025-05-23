'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Toolkit } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function HorizontalFilterBar({
    typeSlug,
    allToolkits,
    selectedSubcategories,
    onSubcategoryChange,
    selectedTech,
    onTechChange,
    onClearAll
}: {
    typeSlug?: string;
    allToolkits: Toolkit[];
    selectedSubcategories: string[];
    onSubcategoryChange: (subs: string[]) => void;
    selectedTech: string[];
    onTechChange: (techs: string[]) => void;
    allTypes: { type: string; type_slug: string }[];
    onClearAll: () => void;
}) {

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

    const hasActiveFilters = selectedSubcategories.length > 0 || selectedTech.length > 0;

    return (
        <div className="w-full z-50">

            {/* Subcategory & Technology Filters + Clear Filters */}
            <div className="flex flex-wrap gap-4 items-center mt-10 mb-5">
                {/* Subcategory Dropdown */}
                <div className="relative" ref={subRef}>
                    <button
                        onClick={() => {
                            setIsSubOpen(prev => !prev);
                            setIsTechOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-black text-xs rounded-xl border border-black/20 hover:bg-black/5 transition hover:cursor-pointer"
                    >
                        Subcategory
                        {selectedSubcategories.length > 0 && (
                            <span className="text-purple-500">({selectedSubcategories.length})</span>
                        )}
                        {isSubOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isSubOpen && (
                        <div className="absolute left-0 mt-2 bg-white p-4 z-50 w-64 rounded-xl border border-black/20 shadow-lg text-xs">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-black font-medium">Subcategory</span>
                                {selectedSubcategories.length > 0 && (
                                    <button
                                        onClick={() => onSubcategoryChange([])}
                                        className="text-purple-500 hover:text-purple-600 transition text-xs hover:cursor-pointer"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 text-black">
                                {uniqueSubcategories.map(([slug, label]) => (
                                    <label key={slug} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedSubcategories.includes(slug)}
                                            onChange={() => toggleSub(slug)}
                                            className="appearance-none w-3.5 h-3.5 border border-black/30 rounded-md checked:bg-purple-500 cursor-pointer"
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
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-black text-xs rounded-xl border border-black/20 hover:bg-black/5 transition hover:cursor-pointer"
                    >
                        Technology
                        {selectedTech.length > 0 && (
                            <span className="text-purple-500">({selectedTech.length})</span>
                        )}
                        {isTechOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isTechOpen && (
                        <div className="absolute left-0 mt-2 bg-white p-4 z-50 w-64 rounded-xl border border-black/20 shadow-lg text-xs">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-black font-medium">Technology</span>
                                {selectedTech.length > 0 && (
                                    <button
                                        onClick={() => onTechChange([])}
                                        className="text-purple-500 hover:text-purple-600 transition text-xs cursor-pointer"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 text-black">
                                {uniqueTechs.map((tech) => (
                                    <label key={tech} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedTech.includes(tech)}
                                            onChange={() => toggleTech(tech)}
                                            className="appearance-none w-3.5 h-3.5 border border-black/30 rounded-md checked:bg-purple-500 cursor-pointer"
                                        />
                                        {tech}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Global Clear Filters Button */}
                {hasActiveFilters && (
                    <button
                        onClick={onClearAll}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-black text-xs rounded-xl border border-black/20 hover:bg-white/20 transition hover:cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faXmark} className="w-2 h-2" />
                        Clear Filters
                    </button>
                )}

            </div>
        </div>
    );
}
