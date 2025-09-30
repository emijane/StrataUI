'use client';

/**
 * Navbar Component
 *
 * This is the top navigation bar for the StrataUI interface. It includes:
 * - A logo and site name with version label
 * - Navigation links (e.g., "Library")
 * - A GitHub icon link to the project repository
 *
 * Features:
 * - Responsive layout using flexbox
 * - Slight blur and transparency effect using Tailwind backdrop utilities
 * - Accessible external link behavior (opens GitHub in new tab with `rel="noopener noreferrer"`)
 */

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import SearchBar from './library/ui/SearchBar';

export default function Navbar() {
  // --- add state + handler ---
  const [term, setTerm] = useState('');
  const router = useRouter();

  const submitSearch = () => {
    const q = term.trim();
    if (q) router.push(`/library?search=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="text-black flex flex-row justify-between pt-5 pb-5 pr-10 pl-10 bg-white/80 backdrop-blur-lg border-b border-black/5">
      {/* Left: logo + version */}
      <div className="flex flex-row items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
          <Image
              src="/strataui-icon.png"
              alt="StrataUI Icon"
              width={25}
              height={23}
              priority
              style={{ width: "25px", height: "22px", objectFit: "fill" }}
          />
          StrataUI
        </Link>
        <span className="text-black/60 pt-1 pb-1 pl-2 pr-2 text-xs rounded-xl outline-1 outline-black/20 font-semibold">
          v0.1
        </span>
      </div>

      {/* Right: search + links */}
      <ul className="flex flex-row gap-5 font-semibold text-black/90 justify-center items-center text-sm">
        <li className="w-80">
          <SearchBar searchTerm={term} onSearchChange={setTerm} onSubmit={submitSearch} />
        </li>

        <li>
          <Link href="/library/" className="text-black">Library</Link>
        </li>

        <li>
          <a
            href="https://github.com/YOUR_REPO"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="StrataUI on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="text-lg hover:text-purple-300 transition" />
          </a>
        </li>
      </ul>
    </nav>
  );
}