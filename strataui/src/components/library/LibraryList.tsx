'use client';

import type { Library } from '@/types';
import { memo, useMemo, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const TAG_LABELS: Record<string, string> = {
  'ui-library': 'UI Library',
  'component-kit': 'Component Kit',
  'design-system': 'Design System',
  'headless-ui': 'Headless UI',
  'mobile-ui-framework': 'Mobile UI Framework',
  tailwind: 'Tailwind CSS',
  react: 'React',
  vue: 'Vue.js',
  angular: 'Angular',
  svelte: 'Svelte',
};

const TECH_LABELS: Record<string, string> = {
  "angular": "Angular",
  "bootstrap": "Bootstrap",
  "bulma": "Bulma",
  "html": "HTML",
  "react": "React",
  "svelte": "Svelte",
  "tailwind": "Tailwind",
  "vue": "Vue",
};


function formatTagLabel(tag: string): string {
  return TAG_LABELS[tag] || tag;
}

function formatTechLabel(tech: string): string {
  return TECH_LABELS[tech] || tech;
}

const LibraryCard = memo(({ lib }: { lib: Library }) => {
  const formattedTags = useMemo(
    () => (lib.tags || []).map((tag: string) => ({ key: tag, label: formatTagLabel(tag) })),
    [lib.tags]
  );

  const techLabels = useMemo(
    () => (lib.tech || []).map((item: string) => ({ key: item, label: formatTechLabel(item) })),
    [lib.tech]
  );

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator
        .share({
          title: lib.name,
          url: lib.url,
          text: `Check out this library: ${lib.name}`,
        })
        .catch((err) => console.error('Sharing failed:', err));
    } else {
      navigator.clipboard.writeText(lib.url).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  return (
    <div className="break-inside-avoid mb-6 w-full inline-block">
      <a
        href={lib.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white/10 backdrop-blur-md border border-white/20 
          rounded-2xl shadow-md cursor-pointer no-underline p-4 
          transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      >
        <div className="flex flex-col h-full">
          <div className="relative">
            <h2 className="text-white font-semibold text-lg mb-1 pr-8">{lib.name}</h2>
            <button
              onClick={handleShare}
              className="absolute top-0 right-0 text-white hover:text-white/80 transition-colors"
              aria-label={`Share ${lib.name}`}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 opacity-60" />
            </button>
          </div>

          {lib.description && (
            <p className="text-white/70 text-sm mt-2">{lib.description}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-3 items-center">
            {formattedTags.map(({ key, label }: { key: string; label: string }) => (
              <span
                key={key}
                className="font-space-mono text-xs outline outline-white/30 text-white pl-3 pr-3 pt-2 pb-2 rounded-xl"
              >
                {label}
              </span>
            ))}
            {techLabels.map(({ key, label }: { key: string; label: string }) => (
              <span
                key={key}
                className="font-space-mono text-xs outline outline-white/30 text-white pl-3 pr-3 pt-2 pb-2 rounded-xl"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
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
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {libraries.map((lib) => (
            <LibraryCard key={lib.id} lib={lib} />
          ))}
        </div>
      )}
    </section>
  );
}
