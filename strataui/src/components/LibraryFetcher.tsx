'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const TAG_LABELS: Record<string, string> = {
  tailwind: 'Tailwind CSS',
  react: 'React',
  vue: 'Vue.js',
  angular: 'Angular',
  svelte: 'Svelte',
};


type Library = {
  id: number;
  name: string;
  url: string;
  tag: string;
};

export default function LibraryFetcher() {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibraries() {
      const { data, error } = await supabase
        .from('tailwind_libraries')
        .select('*')
        .order('name');

      console.log("Fetched libraries:", data);

      if (error) console.error('Error fetching libraries:', error);
      else setLibraries(data || []);

      setLoading(false);
    }

    fetchLibraries();
  }, []);

  if (loading) return <p className="text-gray-500">Loading libraries...</p>;
  if (!libraries.length) return <p className="text-red-500">No libraries found.</p>;

  return (
    <ul className="space-y-4 mt-6">
      {libraries.map((lib) => (
        <li
          key={lib.id}
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900"
        >
          <div className="flex flex-col gap-1">
            <a
              href={lib.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 text-lg font-semibold hover:underline"
            >
              {lib.name}
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 break-all">{lib.url}</p>
            <span className="self-start mt-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              {TAG_LABELS[lib.tag] || lib.tag}

            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
