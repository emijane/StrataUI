'use client';

import { Search } from 'lucide-react'; // Using Lucide icon

type Props = {
    searchTerm: string;
    onSearchChange: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearchChange }: Props) {
    return (
        <div className="w-full max-w-[94rem] mx-auto px-5 mb-6">
            <p className="text-white/70 mb-5">Search for your favorite design and development tools.</p>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />

                <input
                    type="text"
                    placeholder="Search for toolkits..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    maxLength={60}
                    className="w-full font-space-mono pl-10 pr-4 py-3 rounded-lg text-sm text-white bg-white/10 outline-none border border-white/20 focus:ring"
                />
            </div>
        </div>
    );
}
