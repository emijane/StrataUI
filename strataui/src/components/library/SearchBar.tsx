'use client';

type Props = {
    searchTerm: string;
    onSearchChange: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearchChange }: Props) {
    return (
        <div className="max-w-[50rem] mx-auto mb-10">
            <input
                type="text"
                placeholder="Search by name, tag, or technology.."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full font-space-mono px-5 py-3 rounded-3xl text-sm text-white bg-white/10 outline-none border border-white/20 focus:ring"
            />
        </div>
    );
}
