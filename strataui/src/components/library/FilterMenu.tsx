'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Library } from '@/types';

type Props = {
    selectedTags: string[];
    onTagChange: (tags: string[]) => void;
    selectedTech: string[];
    onTechChange: (techs: string[]) => void;
    allLibraries: Library[]; // ✅ NEW
};

const TAGS = [
    'ui-library',
    'component-kit',
    'design-system',
    'headless-ui',
    'mobile-ui-framework',
    'framework'
];

const TECHS = [
    'react',
    'vue',
    'angular',
    'svelte',
    'tailwind',
    'bootstrap',
    'html',
    'bulma'
];

const TAG_LABELS: Record<string, string> = {
    'ui-library': 'UI Library',
    'component-kit': 'Component Kit',
    'design-system': 'Design System',
    'headless-ui': 'Headless UI',
    'mobile-ui-framework': 'Mobile UI Framework',
    framework: 'Framework'
};

const TECH_LABELS: Record<string, string> = {
    react: 'React',
    vue: 'Vue.js',
    angular: 'Angular',
    svelte: 'Svelte',
    tailwind: 'Tailwind CSS',
    bootstrap: 'Bootstrap',
    html: 'HTML',
    bulma: 'Bulma'
};

export default function FilterSidebar({
    selectedTags,
    onTagChange,
    selectedTech,
    onTechChange,
    allLibraries
}: Props) {
    const [isTagOpen, setIsTagOpen] = useState(false);
    const [isTechOpen, setIsTechOpen] = useState(false);

    const tagRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tagRef.current && !tagRef.current.contains(event.target as Node)) {
                setIsTagOpen(false);
            }
            if (techRef.current && !techRef.current.contains(event.target as Node)) {
                setIsTechOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getTagCount = (tag: string) =>
        allLibraries.filter((lib) => lib.tags?.includes(tag)).length;

    const getTechCount = (tech: string) =>
        allLibraries.filter((lib) => lib.tech?.includes(tech)).length;

    const toggleTag = (tag: string) => {
        onTagChange(
            selectedTags.includes(tag)
                ? selectedTags.filter((t) => t !== tag)
                : [...selectedTags, tag]
        );
    };

    const toggleTech = (tech: string) => {
        onTechChange(
            selectedTech.includes(tech)
                ? selectedTech.filter((t) => t !== tech)
                : [...selectedTech, tech]
        );
    };

    return (
        <div className="w-full px-4 py-4 bg-white/5 backdrop-blur-md border-b border-white/10 relative z-50">
            <div className="flex gap-4 flex-wrap">
                {/* Category Dropdown */}
                <div className="relative" ref={tagRef}>
                    <button
                        onClick={() => {
                            setIsTagOpen((prev) => !prev);
                            setIsTechOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm rounded-lg border border-white/20 hover:bg-white/20 transition"
                    >
                        Filter by Category
                        {selectedTags.length > 0 && (
                            <span className="text-purple-300">({selectedTags.length})</span>
                        )}
                        {isTagOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isTagOpen && (
                        <div className="absolute left-0 mt-2 bg-black border border-white/10 rounded-lg shadow-lg p-4 w-64">
                            <div className="flex flex-col gap-2 text-white text-sm">
                                {TAGS.map((tag) => (
                                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => toggleTag(tag)}
                                            className="appearance-none w-4 h-4 border border-white/20 rounded-md checked:bg-purple-300"
                                        />
                                        {TAG_LABELS[tag]} ({getTagCount(tag)})
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
                            setIsTechOpen((prev) => !prev);
                            setIsTagOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-sm rounded-lg border border-white/20 hover:bg-white/20 transition"
                    >
                        Filter by Technology
                        {selectedTech.length > 0 && (
                            <span className="text-purple-300">({selectedTech.length})</span>
                        )}
                        {isTechOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isTechOpen && (
                        <div className="absolute left-0 mt-2 bg-black border border-white/10 rounded-lg shadow-lg p-4 z-50 w-64">
                            <div className="flex flex-col gap-2 text-white text-sm">
                                {TECHS.map((tech) => (
                                    <label key={tech} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedTech.includes(tech)}
                                            onChange={() => toggleTech(tech)}
                                            className="appearance-none w-4 h-4 border border-white/20 rounded-md checked:bg-purple-300"
                                        />
                                        {TECH_LABELS[tech]} ({getTechCount(tech)})
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
