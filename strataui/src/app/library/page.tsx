'use client';

import ToolkitFetcher from '@/components/library/ToolkitFetcher';

export default function LibraryPage() {
  return (
    <main className="relative min-h-screen overflow-visible max-w-full items-center justify-center mx-auto">

      {/* Foreground content */}
      <div className="relative z-10 mx-auto">
        <ToolkitFetcher />
      </div>
    </main>
  );
}
