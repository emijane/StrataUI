'use client';

type Props = {
    selectedTags: string[];
    onTagClear: (tag: string) => void;
    selectedTech: string[];
    onTechClear: (tech: string) => void;
    searchTerm: string;
    onSearchClear: () => void;
    onClearAll: () => void; // ✅ NEW PROP
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
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white w-full max-w-[94rem] mx-auto">
            <p className="text-white/70">Filters applied:</p>

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

            <span className="flex font-space-mono text-xs items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full border border-white/20">
                Clear Filters
                <button
                    onClick={onClearAll}
                    className="text-white focus:outline-none"
                    aria-label="Clear filters"
                >
                    ×
                </button>
            </span>
        </div>
    );
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="flex font-space-mono text-xs items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full border border-white/20">
            {label}
            <button
                onClick={onRemove}
                className="text-white focus:outline-none"
                aria-label={`Remove ${label}`}
            >
                ×
            </button>
        </span>
    );
}
