'use client';

import LibraryFetcher from '@/components/LibraryFetcher';

export default function LibraryPage() {
  return (
    <main className="relative min-h-screen overflow-visible">
      <div className="background-glow-pink"></div>
      <div className="background-glow-pink-wide"></div>

      {/* Foreground content */}
      <div className="relative z-10">
        <LibraryFetcher />
      </div>
    </main>
  );
}
