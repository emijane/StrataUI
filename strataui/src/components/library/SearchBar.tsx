'use client';

type Props = {
    searchTerm: string;
    onSearchChange: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearchChange }: Props) {
    return (
        <div className="w-full mx-auto mb-6">
            <p className="text-white/70 mb-5">Search for your favorite design and development tools.</p>
            <input
                type="text"
                placeholder="Search for toolkits..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full font-space-mono px-4 py-3 rounded-3xl text-sm text-white bg-white/10 outline-none border border-white/20 focus:ring"
            />
        </div>
    );
}
