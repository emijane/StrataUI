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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
    return (
        <nav className="text-black flex flex-row justify-between pt-5 pb-5 pr-10 pl-10 bg-white/80 backdrop-blur-lg border-b border-black/5">
            {/* Left section: logo + title + version tag */}
            <div className="flex flex-row items-center gap-2">
                <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
                    <Image
                        src="/strataui-icon.png"
                        alt="StrataUI Icon"
                        width={25}
                        height={25}
                        priority
                    />
                    StrataUI
                </Link>

                {/* Version tag */}
                <span className="text-black/60 pt-1 pb-1 pl-2 pr-2 text-xs rounded-xl outline-1 outline-black/20 font-semibold">
                    v0.1
                </span>
            </div>

            {/* Right section: nav links + GitHub */}
            <ul className="flex flex-row gap-5 font-semibold text-black/90 justify-center items-center text-sm relative">
                <li>
                    <Link href="/library/" className="text-black">
                        Library
                    </Link>
                </li>

                {/* GitHub Icon */}
                <li>
                    <a
                        href="https://github.com/YOUR_REPO"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="StrataUI on GitHub"
                    >
                        <FontAwesomeIcon
                            icon={faGithub}
                            className="text-lg hover:text-purple-300 transition"
                        />
                    </a>
                </li>
            </ul>
        </nav>
    );
}
