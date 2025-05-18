'use client';

type Props = {
  selected: string[];
  onChange: (categories: string[]) => void;
};

const CATEGORIES = ['framework', 'font', 'color-tool', 'animation', 'icon'];

export default function CategorySidebar({ selected, onChange }: Props) {
  function toggleCategory(category: string) {
    if (selected.includes(category)) {
      onChange(selected.filter((c) => c !== category));
    } else {
      onChange([...selected, category]);
    }
  }

  return (
    <aside className="w-full md:w-64">
      <h3 className="text-md font-medium mb-2">Filter by Category</h3>
      <div className="space-y-2">
        {CATEGORIES.map((cat) => (
          <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="accent-blue-600"
            />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </label>
        ))}
      </div>
    </aside>
  );
}
