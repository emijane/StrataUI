'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import LibraryList from './LibraryList';
import FilterSidebar from './FilterSidebar';
import type { Library } from '@/types';

export default function LibraryFetcher() {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibraries() {
      setLoading(true);

      let query = supabase
        .from('libraries')
        .select('id, name, url, tags, category');

      if (selectedTag !== 'all') {
        query = query.contains('tags', [selectedTag]);
      }

      if (selectedCategories.length > 0) {
        query = query.in('category', selectedCategories);
      }

      const { data, error } = await query.order('name');
      console.log('SUPABASE DATA:', data);

      if (error) {
        console.error('Error fetching libraries:', error);
        setLibraries([]);
      } else {
        const term = searchTerm.toLowerCase();
        const filtered = data?.filter((lib: Library) => {
          const nameMatch = lib.name.toLowerCase().includes(term);
          const tagMatch = (lib.tags || []).some((tag: string) =>
            tag.toLowerCase().includes(term)
          );
          return nameMatch || tagMatch;
        });

        setLibraries(filtered || []);
      }

      setLoading(false);
    }

    fetchLibraries();
  }, [selectedTag, selectedCategories, searchTerm]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar with tag & category filters */}
        <FilterSidebar
            selectedTag={selectedTag}
            onSelect={setSelectedTag}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
        />


      {/* Main content */}
      <div className="flex-1">

        {/* Results */}
        {loading ? (
          <p>Loading libraries...</p>
        ) : libraries.length === 0 ? (
          <p>No libraries found.</p>
        ) : (
          <LibraryList libraries={libraries} />
        )}
      </div>
    </div>
  );
}
