'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { getTypes } from '@/lib/getTypes';

type TypeEntry = {
    type: string;
    type_slug: string;
};

export default function Navbar() {
    const [types, setTypes] = useState<TypeEntry[]>([]);

    useEffect(() => {
        async function fetchTypes() {
            const result = await getTypes();
            if (Array.isArray(result)) {
                setTypes(result);
            } else {
                setTypes([]);
            }
        }
        fetchTypes();
    }, []);

    return (
        <nav className="sticky top-0 z-50 text-white flex flex-row justify-between pt-5 pb-5 pr-10 pl-10 backdrop-blur-md border-b border-white/20">
            <div className="flex flex-row items-center gap-5">
                <ul className="flex items-center gap-2">
                    <li>
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
                    </li>
                </ul>
                <span className="text-white/60 bg-white/10 pt-1 pb-1 pl-2 pr-2 text-xs rounded-xl outline-1 outline-white/30 font-semibold">
                    v1.0
                </span>
            </div>

            <ul className="flex flex-row gap-5 font-semibold text-white/90 justify-center items-center text-sm">
                {types.map(({ type, type_slug }) => (
                    <li key={type_slug}>
                        <Link href={`/library/${type_slug}`} className="hover:text-purple-300 transition">
                            {type}
                        </Link>
                    </li>
                ))}

                <li>
                    <a href="https://github.com/YOUR_GITHUB_REPO" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="text-lg hover:text-purple-300 transition" />
                    </a>
                </li>
            </ul>
        </nav>
    );
}
