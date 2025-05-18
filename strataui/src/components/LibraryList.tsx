import type { Library } from '@/types';

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

export default function LibraryList({ libraries }: { libraries: Library[] }) {
  return (
    <div className="flex flex-wrap gap-5 m-8">
      {libraries.map((lib) => (
        <a
          key={lib.id}
          href={lib.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-grow min-w-[260px] max-w-[100%] sm:max-w-[48%] lg:max-w-[31%] p-4 border rounded-lg shadow-sm dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow duration-200 cursor-pointer no-underline"
        >
          <div className="flex flex-col h-full">
            <h2 className="text-blue-600 font-semibold text-lg mb-1">{lib.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 break-words">{lib.url}</p>

            <div className="flex flex-wrap gap-2 mt-2 items-center">
              {(lib.tags || []).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-white"
                >
                  {formatTagLabel(tag)}
                </span>
              ))}
              {lib.category && (
                <span className="text-xs bg-gray-300 text-gray-900 px-2 py-0.5 rounded-full dark:bg-gray-600 dark:text-white">
                  {formatCategoryLabel(lib.category)}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
