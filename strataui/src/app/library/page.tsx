'use client';

import LibraryFetcher from '@/components/LibraryFetcher';

export default function LibraryPage() {
  return (
    <div className="relative min-h-screen overflow-visible">
      {/* Fixed blurred background circle */}
      <div className="fixed top-30 left-450 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2 bg-blue-500 opacity-30 blur-[120px] rounded-full pointer-events-none z-[-1]" />

      <LibraryFetcher />
    </div>
  );
}
