'use client';

import type { Library } from '@/types';
import { memo, useMemo, ReactNode } from 'react';

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
    () => (lib.tags || []).map((tag) => ({ key: tag, label: formatTagLabel(tag) })),
    [lib.tags]
  );

  const category = useMemo(
    () => (lib.category ? { key: lib.category, label: formatCategoryLabel(lib.category) } : null),
    [lib.category]
  );

  // Random width variation (for demo purposes)
  const widthClasses = [
    'sm:w-[45%]',
    'sm:w-[60%]',
    'sm:w-[48%]',
    'sm:w-[52%]',
    'sm:w-[40%]',
  ];
  const randomWidth = widthClasses[Math.floor(Math.random() * widthClasses.length)];

  return (
    <a
      key={lib.id}
      href={lib.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full ${randomWidth} md:w-auto flex-grow 
        bg-white/10 backdrop-blur-md border border-white/20 
        rounded-2xl shadow-md cursor-pointer no-underline p-4 
        transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      <div className="flex flex-col h-full">
        <h2 className="text-white font-semibold text-lg mb-1">{lib.name}</h2>

        <div className="flex flex-wrap gap-2 mt-3 items-center">
          {formattedTags.map(({ key, label }) => (
            <span
              key={key}
              className="font-space-mono text-xs outline outline-white/30 text-white pl-3 pr-3 pt-2 pb-2 rounded-xl"
            >
              {label}
            </span>
          ))}
          {category && (
            <span
              key={category.key}
              className="font-space-mono text-xs outline outline-white/30 text-white pl-3 pr-3 pt-2 pb-2 rounded-xl"
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

export default function LibraryList({
  libraries,
  children,
}: {
  libraries: Library[];
  children?: ReactNode;
}) {
  return (
    <section className="w-full max-w-[94rem] mx-auto px-4 md:px-6" aria-label="Library section">
      {children && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white">
          {children}
        </div>
      )}

      {libraries.length === 0 ? (
        <p className="text-white">No libraries to display.</p>
      ) : (
        <div className="flex flex-wrap justify-start gap-5">
          {libraries.map((lib) => (
            <LibraryCard key={lib.id} lib={lib} />
          ))}
        </div>
      )}
    </section>
  );
}
