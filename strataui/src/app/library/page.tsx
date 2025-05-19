'use client';

import LibraryFetcher from '@/components/library/LibraryFetcher';

export default function LibraryPage() {
  return (
    <main className="relative min-h-screen overflow-visible max-w-[95rem] items-center justify-center mx-auto">
      <div className="background-glow-pink"></div>
      <div className="background-glow-pink-wide"></div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-[95rem] mx-auto">
        <LibraryFetcher />
      </div>
    </main>
  );
}
