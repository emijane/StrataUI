'use client';

/**
 * SearchBar Component
 *
 * A reusable search input that allows users to filter toolkits by name, tag, or technology.
 * It is styled as a rounded input and is fully controlled via props.
 *
 * Props:
 * - `searchTerm` (string): The current value of the input
 * - `onSearchChange` (function): Callback to update the parent state when the input changes
 */

type Props = {
    searchTerm: string;
    onSearchChange: (term: string) => void;
};

export default function SearchBar({ searchTerm, onSearchChange }: Props) {
    return (
        // Container centers the search bar and limits width
        <div className="w-full max-w-[42rem] mx-auto my-10">
            <input
                type="text"
                placeholder="Search by name, tag, or technology.."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)} // Updates parent state
                className="w-full px-5 py-3 rounded-3xl text-sm text-black bg-white/10 outline-none border border-black/20 focus:ring"
            />
        </div>
    );
}
