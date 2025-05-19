'use client';

type Props = {
  selectedTag: string;
  onTagClear: () => void;
  selectedCategories: string[];
  onCategoryClear: (category: string) => void;
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

const CATEGORY_LABELS: Record<string, string> = {
  framework: 'Framework',
  font: 'Font',
  'color-tool': 'Color Tool',
  animation: 'Animation',
  icon: 'Icon',
};

export default function AppliedFilters({
  selectedTag,
  onTagClear,
  selectedCategories,
  onCategoryClear,
  searchTerm,
  onSearchClear,
}: Props) {
  console.log('🧪 AppliedFilters props:', {
    selectedTag,
    selectedCategories,
    searchTerm,
  });

  const hasActiveFilters =
    selectedTag !== 'all' ||
    selectedCategories.length > 0 ||
    searchTerm.trim().length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="mb-6 flex flex-row items-center gap-2 text-sm text-white w-full max-w-[94rem] mx-auto sm:invisible md:visible">
      <p className="text-white/70">Filters applied:</p>

      {selectedTag !== 'all' && (
        <FilterPill label={TAG_LABELS[selectedTag] || selectedTag} onRemove={onTagClear} />
      )}

      {selectedCategories.map((cat) => (
        <FilterPill
          key={cat}
          label={CATEGORY_LABELS[cat] || cat}
          onRemove={() => onCategoryClear(cat)}
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
