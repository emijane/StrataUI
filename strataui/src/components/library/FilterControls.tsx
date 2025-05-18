// components/FilterControls.tsx
type FilterControlsProps = {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
};

const TAGS = ['all', 'tailwind', 'react', 'vue', 'angular', 'svelte'];

export default function FilterControls({ selectedTag, onSelectTag }: FilterControlsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {TAGS.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className={`px-3 py-1 rounded-full border transition ${
            selectedTag === tag
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}
        >
          {tag === 'all' ? 'All' : tag.charAt(0).toUpperCase() + tag.slice(1)}
        </button>
      ))}
    </div>
  );
}
