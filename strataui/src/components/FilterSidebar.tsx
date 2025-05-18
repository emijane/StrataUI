'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// ----- Types -----
type Props = {
  selectedTag: string;
  onSelect: (tag: string) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

// ----- Constants -----
const FRAMEWORK_TAGS = ['all', 'tailwind', 'react', 'vue', 'angular', 'svelte'];
const CATEGORY_TAGS = ['framework', 'font', 'color-tool', 'animation', 'icon'];

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

function formatLabel(value: string, labels: Record<string, string>): string {
  return labels[value] || value;
}

// ----- Utility: Hydration Guard -----
function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// ----- Main Component -----
export default function FilterSidebar({
  selectedTag,
  onSelect,
  selectedCategories,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: Props) {
  const hasMounted = useHasMounted();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFrameworkOpen, setIsFrameworkOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // Collapse sidebar on mobile layout
  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  if (!hasMounted) return null;

  const toggleCategory = (cat: string) => {
    onCategoryChange(
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat]
    );
  };

  return (
    <aside
      className="sticky top-16 w-full md:w-80 md:p-4 outline outline-white/20 text-white 
      max-h-[calc(100vh-4rem)] overflow-y-auto bg-white/5 
      backdrop-blur-md border border-white/10 shadow-lg"
    >
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-blue-800">
        <h2 className="text-white font-semibold">Filters</h2>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="bg-blue-800 text-white p-2 rounded-md"
        >
          {isSidebarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Filters Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isSidebarOpen ? 'max-h-[1000px] p-4' : 'max-h-0 p-0'
        } md:max-h-none md:p-4`}
      >
        <h2 className="text-lg font-semibold mb-4 text-white">Filter Content</h2>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search libraries..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm outline outline-white/20 text-white bg-transparent focus:outline-none focus:ring"
          />
        </div>

        {/* Framework Section */}
        <Collapsible
          title="Framework"
          isOpen={isFrameworkOpen}
          onToggle={() => setIsFrameworkOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-2 text-sm mt-2">
            {FRAMEWORK_TAGS.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="framework"
                  value={tag}
                  checked={selectedTag === tag}
                  onChange={() => onSelect(tag)}
                  className="accent-blue-500 appearance-none ml-2 w-4 h-4 outline outline-white/20 rounded-full checked:bg-purple-300 checked:border-transparent"
                />
                {formatLabel(tag, TAG_LABELS)}
              </label>
            ))}
          </div>
        </Collapsible>

        {/* Category Section */}
        <Collapsible
          title="Category"
          isOpen={isCategoryOpen}
          onToggle={() => setIsCategoryOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-2 text-sm mt-2">
            {CATEGORY_TAGS.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="appearance-none w-4 h-4 ml-2 border border-white/20 rounded-md checked:bg-purple-300 checked:border-transparent accent-blue-500"
                />
                {formatLabel(cat, CATEGORY_LABELS)}
              </label>
            ))}
          </div>
        </Collapsible>
      </div>
    </aside>
  );
}

// ----- Collapsible Component -----
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
        className="w-full flex justify-between items-center text-left text-sm font-medium mb-4 text-purple-300"
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
