'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

type Props = {
    selectedTags: string[];
    onTagChange: (tags: string[]) => void;
    selectedTech: string[];
    onTechChange: (techs: string[]) => void;
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

function formatLabel(value: string, labels: Record<string, string>): string {
    return labels[value] || value;
}

function useHasMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted;
}

export default function FilterSidebar({
    selectedTags,
    onTagChange,
    selectedTech,
    onTechChange,
}: Props) {
    const hasMounted = useHasMounted();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTagOpen, setIsTagOpen] = useState(true);
    const [isTechOpen, setIsTechOpen] = useState(true);

    useLayoutEffect(() => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, []);

    if (!hasMounted) return null;

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
        <aside className="sticky top-18 w-full md:w-70 lg:w-80 md:pt-5 md:pl-5 outline outline-white/20 text-white max-h-[calc(100vh-4rem)] overflow-y-auto bg-white/5 backdrop-blur-md border-r-1 border-white/10 z-50">
            <div className="md:hidden flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-white font-semibold">Filters</h2>
                <button
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                    className="outline-2 outline-white/10 focus:outline-white/30 text-white p-1 rounded-md"
                >
                    {isSidebarOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isSidebarOpen ? 'max-h-[1000px] p-4' : 'max-h-0 p-0'
                } md:max-h-none md:p-4`}
            >
                <Collapsible
                    title="CATEGORY"
                    isOpen={isTagOpen}
                    onToggle={() => setIsTagOpen((prev) => !prev)}
                >
                    <div className="flex flex-col gap-3 text-sm mt-2">
                        {TAGS.map((tag) => (
                            <label key={tag} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => toggleTag(tag)}
                                    className="appearance-none w-4 h-4 ml-2 border border-white/20 rounded-md checked:bg-purple-300 checked:border-transparent cursor-pointer"
                                />
                                {formatLabel(tag, TAG_LABELS)}
                            </label>
                        ))}
                    </div>
                </Collapsible>

                <Collapsible
                    title="TECHNOLOGY"
                    isOpen={isTechOpen}
                    onToggle={() => setIsTechOpen((prev) => !prev)}
                >
                    <div className="flex flex-col gap-3 text-sm mt-2">
                        {TECHS.map((tech) => (
                            <label key={tech} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedTech.includes(tech)}
                                    onChange={() => toggleTech(tech)}
                                    className="appearance-none w-4 h-4 ml-2 border border-white/20 rounded-md checked:bg-purple-300 checked:border-transparent cursor-pointer"
                                />
                                {formatLabel(tech, TECH_LABELS)}
                            </label>
                        ))}
                    </div>
                </Collapsible>
            </div>
        </aside>
    );
}

type CollapsibleProps = {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
};

function Collapsible({ title, isOpen, onToggle, children }: CollapsibleProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string>('0px');

    useEffect(() => {
        if (ref.current) {
            setHeight(isOpen ? `${ref.current.scrollHeight}px` : '0px');
        }
    }, [isOpen]);

    return (
        <div className="mb-6 border-b border-white/10 pb-1">
            <button
                onClick={onToggle}
                className="w-full font-space-mono flex justify-between items-center text-left text-xs font-semibold tracking-wide mb-4 text-purple-300/80"
            >
                {title}
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <div
                ref={ref}
                style={{ maxHeight: height }}
                className="transition-all duration-500 ease-in-out overflow-hidden mb-4"
            >
                {children}
            </div>
        </div>
    );
}
