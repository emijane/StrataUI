'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Utility hook to prevent hydration mismatch
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

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
  const hasMounted = useHasMounted();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFrameworkOpen, setIsFrameworkOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  // Collapse sidebar on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  if (!hasMounted) return null;

  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((cat) => cat !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  }

  return (
    <aside
      className="sticky top-16 w-full md:w-80 md:p-4 outline outline-white/20 text-white 
        max-h-[calc(100vh-4rem)] overflow-y-auto 
        bg-white/5 backdrop-blur-md border border-white/10 shadow-lg rounded-xl"
    >
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-blue-800">
        <h2 className="text-white font-semibold">Filters</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-blue-800 text-white p-2 rounded-md"
        >
          {isSidebarOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Filter Content */}
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
          className="text-purple-300"
        >
          <div className="flex flex-col gap-2 text-sm mt-2">
            {FRAMEWORK_TAGS.map((tag) => (
              <label key={tag} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="framework"
                  value={tag}
                  checked={selectedTag === tag}
                  onChange={() => onSelect(tag)}
                  className="accent-blue-500 appearance-none ml-2 w-4 h-4 outline outline-white/20 rounded-full checked:bg-purple-300 checked:border-transparent"
                />
                {formatTagLabel(tag)}
              </label>
            ))}
          </div>
        </Collapsible>

        {/* Category Section */}
        <Collapsible
          title="Category"
          isOpen={isCategoryOpen}
          onToggle={() => setIsCategoryOpen((prev) => !prev)}
          className="text-purple-300"
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
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
          </div>
        </Collapsible>
      </div>
    </aside>
  );
}

// --- Collapsible helper component with animation ---
type CollapsibleProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
};

function Collapsible({ title, isOpen, onToggle, children, className = '' }: CollapsibleProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className="mb-6 border-b border-white/10 pb-1">
      <button
        onClick={onToggle}
        className={`w-full flex justify-between items-center text-left text-sm font-medium mb-4 ${className}`}
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="transition-all duration-500 ease-in-out overflow-hidden mb-4"
      >
        {children}
      </div>
    </div>
  );
}

// --- Label formatting ---
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
