'use client';

type Props = {
  selectedTag: string;
  onSelect: (tag: string) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const FRAMEWORK_TAGS = ['all', 'tailwind', 'react', 'vue', 'angular', 'svelte'];
const CATEGORY_TAGS = ['framework', 'font', 'color-tool', 'animation', 'icon'];

export default function FilterSidebar({
  selectedTag,
  onSelect,
  selectedCategories,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: Props) {
  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((cat) => cat !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  }

  return (
    <aside className="w-full md:w-64 h-full bg-blue-950 text-white p-4">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search libraries..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 rounded-md text-sm bg-white text-black focus:outline-none focus:ring"
        />
      </div>

      {/* Framework Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-white/80">Filter by Framework</h3>
        <div className="flex flex-col gap-2 text-sm">
          {FRAMEWORK_TAGS.map((tag) => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="framework"
                value={tag}
                checked={selectedTag === tag}
                onChange={() => onSelect(tag)}
                className="accent-blue-500"
              />
              {formatTagLabel(tag)}
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-white/80">Filter by Category</h3>
        <div className="flex flex-col gap-2 text-sm">
          {CATEGORY_TAGS.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-blue-500"
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

function formatTagLabel(tag: string): string {
  const labels: Record<string, string> = {
    all: 'All',
    tailwind: 'Tailwind CSS',
    react: 'React',
    vue: 'Vue.js',
    angular: 'Angular',
    svelte: 'Svelte',
  };
  return labels[tag] || tag;
}
