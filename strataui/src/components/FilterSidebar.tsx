'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(true);

  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((cat) => cat !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  }

  return (
    <aside className="sticky top-16 w-full md:w-75 md:p-4 bg-blue-950 text-white max-h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-blue-800">
        <h2 className="text-white font-semibold">Filters</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-800 text-white p-2 rounded-md"
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Filter Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] p-4' : 'max-h-0 p-0'
        } md:max-h-none md:p-4`}
      >
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search libraries..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm bg-white text-black focus:outline-none focus:ring"
          />
        </div>

        {/* Framework Radios */}
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

        {/* Category Checkboxes */}
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
