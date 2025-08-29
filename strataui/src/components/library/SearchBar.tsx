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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSubmit?: () => void;
};

export default function SearchBar({ searchTerm, onSearchChange, onSubmit }: Props) {
  return (
    <div className="w-full max-w-[20rem] mx-auto">
      <div className="flex flex-row items-center gap-2 border border-black/10 rounded-3xl px-3 py-1">
        <input
          type="text"
          placeholder="What tool are you looking for?"
          value={searchTerm}
          maxLength={80}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
          className="w-full px-1.5 py-2 rounded-3xl text-sm font-normal focus:outline-none"
        />
        <button
          type="button"
          aria-label="Search"
          onClick={onSubmit}
          className="text-gray-500 hover:text-gray-700 hover:cursor-pointer pr-2"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}

