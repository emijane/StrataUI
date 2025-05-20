'use client';

import { Search } from 'lucide-react'; // Using Lucide icon

type Props = {
    searchTerm: string;
    onSearchChange: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearchChange }: Props) {
    return (
        <div className="w-full max-w-[45rem] mx-auto mb-10">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />

                <input
                    type="text"
                    placeholder="Search for toolkits..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    maxLength={60}
                    className="w-full font-space-mono px-10 py-3 rounded-3xl text-sm text-white bg-white/10 outline-none border border-white/20 focus:ring focus:ring-white/50"
                />
            </div>
        </div>
    );
}
