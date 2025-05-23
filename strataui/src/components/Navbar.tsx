'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import LibraryMenu from './library/LibraryMenu';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 text-black flex flex-row justify-between pt-5 pb-5 pr-10 pl-10 bg-white/80 backdrop-blur-lg border-b border-black/10">
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
                <span className="text-black/60 pt-1 pb-1 pl-2 pr-2 text-xs rounded-xl outline-1 outline-black/30 font-semibold">
                    v0.1
                </span>
            </div>

            <ul className="flex flex-row gap-5 font-semibold text-black/90 justify-center items-center text-sm relative">
                <li>
                    <Link href='/library/' className="text-black">Library</Link>
                </li>

                {/* Consolidated Dropdown */}
                <li className="relative group inline-block">
                    <button className="flex items-center gap-2 hover:text-purple-300 transition focus:outline-none">
                        Categories <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                    </button>

                    <div className="absolute top-full right-0 mt-2 bg-white/10 border border-white/20 rounded-xl shadow-xl backdrop-blur-md p-5 z-50
                        invisible opacity-0 translate-y-1
                        group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-200 ease-in-out
                        w-[40rem]
                    ">
                        <div className="grid grid-cols-2 gap-6 text-sm text-black">
                            <LibraryMenu />
                        </div>
                    </div>
                </li>

                {/* GitHub Icon */}
                <li>
                    <a
                        href="https://github.com/YOUR_REPO"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faGithub} className="text-lg hover:text-purple-300 transition" />
                    </a>
                </li>
            </ul>
        </nav>
    );
}
