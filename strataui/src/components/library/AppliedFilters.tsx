'use client';

type Props = {
  selectedTag: string;
  onTagClear: () => void;
  selectedTech: string[];
  onTechClear: (tech: string) => void;
  searchTerm: string;
  onSearchClear: () => void;
};

const TAG_LABELS: Record<string, string> = {
  all: 'All',
  tailwind: 'Tailwind CSS',
  react: 'React',
  vue: 'Vue.js',
  angular: 'Angular',
  svelte: 'Svelte',
};

const TECH_LABELS: Record<string, string> = {
  framework: 'Framework',
  font: 'Font',
  'color-tool': 'Color Tool',
  animation: 'Animation',
  icon: 'Icon',
};

export default function AppliedFilters({
  selectedTag,
  onTagClear,
  selectedTech,
  onTechClear,
  searchTerm,
  onSearchClear,
}: Props) {
  console.log('🧪 AppliedFilters props:', {
    selectedTag,
    selectedTech,
    searchTerm,
  });

  const hasActiveFilters =
    selectedTag !== 'all' ||
    selectedTech.length > 0 ||
    searchTerm.trim().length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-6 flex flex-row items-center gap-2 text-sm text-white w-full max-w-[94rem] mx-auto sm:invisible md:visible">
      <p className="text-white/70">Filters applied:</p>

      {selectedTag !== 'all' && (
        <FilterPill label={TAG_LABELS[selectedTag] || selectedTag} onRemove={onTagClear} />
      )}

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
