'use client';

import type { Library } from '@/types';
import { memo, useMemo } from 'react';

const TAG_LABELS: Record<string, string> = {
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

function formatTagLabel(tag: string): string {
  return TAG_LABELS[tag] || tag;
}

function formatCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}

const LibraryCard = memo(({ lib }: { lib: Library }) => {
  const formattedTags = useMemo(
    () =>
      (lib.tags || []).map((tag) => ({
        key: tag,
        label: formatTagLabel(tag),
      })),
    [lib.tags]
  );

  const category = useMemo(
    () =>
      lib.category
        ? {
            key: lib.category,
            label: formatCategoryLabel(lib.category),
          }
        : null,
    [lib.category]
  );

  return (
    <a
      key={lib.id}
      href={lib.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-grow min-w-[260px] max-w-[100%] sm:max-w-[48%] lg:max-w-[31%] p-4 
        bg-white/10 backdrop-blur-md border border-white/20 
        rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer no-underline"
    >
      <div className="flex flex-col h-full">
        <h2 className="text-white font-semibold text-lg mb-1">{lib.name}</h2>

        <div className="flex flex-wrap gap-2 mt-3 items-center">
          {formattedTags.map(({ key, label }) => (
            <span
              key={key}
              className="text-xs outline outline-white/30 text-white p-2 rounded-xl"
            >
              {label}
            </span>
          ))}
          {category && (
            <span
              key={category.key}
              className="text-xs outline outline-white/30 text-white p-2 rounded-xl"
            >
              {category.label}
            </span>
          )}
        </div>
      </div>
    </a>
  );
});

LibraryCard.displayName = 'LibraryCard';

export default function LibraryList({ libraries }: { libraries: Library[] }) {
  if (libraries.length === 0) {
    return <p className="m-8 text-white">No libraries to display.</p>;
  }

  return (
    <section
      aria-label="Library results"
      className="flex flex-wrap gap-5 m-8"
    >
      {libraries.map((lib) => (
        <LibraryCard key={lib.id} lib={lib} />
      ))}
    </section>
  );
}
