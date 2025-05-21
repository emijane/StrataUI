// Active filter manager

'use client';

type Props = {
    selectedTags: string[];
    onTagClear: (tag: string) => void;
    selectedTech: string[];
    onTechClear: (tech: string) => void;
    searchTerm: string;
    onSearchClear: () => void;
    onClearAll: () => void;
};

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

export default function AppliedFilters({
    selectedTags,
    onTagClear,
    selectedTech,
    onTechClear,
    searchTerm,
    onSearchClear,
    onClearAll
}: Props) {
    const hasActiveFilters =
        selectedTags.length > 0 || selectedTech.length > 0 || searchTerm.trim().length > 0;

    if (!hasActiveFilters) return null;

    return (
        <div className="flex flex-col gap-3 mb-5">
            <p className="text-white/70 text-sm">Filters applied:</p>

            <div className="flex flex-wrap flex-items-center gap-2 text-sm text-white w-full mx-auto">
                {selectedTags.map((tag) => (
                    <FilterPill
                        key={tag}
                        label={TAG_LABELS[tag] || tag}
                        onRemove={() => onTagClear(tag)}
                    />
                ))}

                {selectedTech.map((tech) => (
                    <FilterPill
                        key={tech}
                        label={TECH_LABELS[tech] || tech}
                        onRemove={() => onTechClear(tech)}
                    />
                ))}

                {searchTerm.trim() && (
                    <FilterPill label={`Search: "${searchTerm}"`} onRemove={onSearchClear} />
                )}

                <button 
                    className="flex font-space-mono text-xs items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:cursor-pointer"
                    onClick={onClearAll}
                    aria-label="Clear filters"
                >
                    Clear Filters
                    <div className="text-white focus:outline-none">×</div>
                </button>
            </div>
        </div>
    );
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <button 
            className="flex font-space-mono text-xs items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 hover:cursor-pointer"
            onClick={onRemove}
            aria-label={`Remove ${label}`}
        >  
            {label}
            <div className="text-white focus:outline-none">×</div>
        </button>
    );
}
