'use client';

type Props = {
    searchTerm: string;
    onSearchChange: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearchChange }: Props) {
    return (
        <div className="w-full max-w-[42rem] mx-auto my-10">
            <input
                type="text"
                placeholder="Search by name, tag, or technology.."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-5 py-3 rounded-3xl text-sm text-black bg-white/10 outline-none border border-black/20 focus:ring"
            />
        </div>
    );
}
