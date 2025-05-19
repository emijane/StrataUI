'use client';

type Props = {
    selectedTags: string[];
    onTagClear: (tag: string) => void;
    selectedTech: string[];
    onTechClear: (tech: string) => void;
    searchTerm: string;
    onSearchClear: () => void;
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
    onSearchClear
}: Props) {
    const hasActiveFilters =
        selectedTags.length > 0 || selectedTech.length > 0 || searchTerm.trim().length > 0;

    if (!hasActiveFilters) return null;

    return (
        <div className="mb-6 flex flex-row flex-wrap items-center gap-2 text-sm text-white w-full max-w-[94rem] mx-auto sm:invisible md:visible">
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
        </div>
    );
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="flex font-space-mono text-sm items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full border border-white/20">
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
