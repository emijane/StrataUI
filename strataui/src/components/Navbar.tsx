'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { getTypes } from '../lib/getTypes';

type TypeEntry = {
    type: string;
    type_slug: string;
};

export default function Navbar() {
    const [types, setTypes] = useState<TypeEntry[]>([]);

    useEffect(() => {
        async function fetchTypes() {
            const result = await getTypes();
            setTypes(result || []);
        }
        fetchTypes();
    }, []);

    return (
        <nav className="sticky top-0 z-50 text-white flex flex-row justify-between pt-5 pb-5 pr-10 pl-10 backdrop-blur-md border-b border-white/20 bg-black">
            <div className="flex flex-row items-center gap-5">
                <Link href="/" className="flex items-center gap-2 text-2xl font-semibold font-space-mono">
                    <Image
                        src="/strataui-icon.png"
                        alt="StrataUI Icon"
                        width={25}
                        height={25}
                        priority
                    />
                    StrataUI
                </Link>
                <span className="text-white/60 bg-white/10 pt-1 pb-1 pl-2 pr-2 text-xs rounded-xl outline-1 outline-white/30 font-semibold">
                    v1.0
                </span>
            </div>

            <ul className="flex flex-row gap-5 font-semibold text-white/90 justify-center items-center text-sm relative">
                <li>
                    <Link href='/library/' className="text-white">Library</Link>
                </li>
                {/* Categories Dropdown */}
                <li className="relative group inline-block">
                    <button className="flex items-center gap-2 hover:text-purple-300 transition focus:outline-none">
                        Categories <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                    </button>

                    <div className="absolute top-full right-0 mt-2 w-auto bg-white/10 border border-white/20 rounded-xl shadow-xl backdrop-blur-md p-3 z-50
                        invisible opacity-0 translate-y-1
                        group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-200 ease-in-out
                    ">
                        <ul className="grid grid-cols-1 gap-2 min-w-[12rem]">
                            {types.map(({ type, type_slug }) => (
                                <li key={type_slug}>
                                    <Link
                                        href={`/library/${type_slug}`}
                                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/20 rounded transition whitespace-nowrap"
                                    >
                                        {type}
                                    </Link>
                                </li>
                            ))}
                        </ul>
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
