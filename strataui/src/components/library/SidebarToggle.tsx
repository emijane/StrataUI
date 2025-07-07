'use client';

/**
 * SidebarToggle Component
 *
 * A simple accessible button used to toggle the sidebar (typically in mobile or narrow viewports).
 * It uses an inline SVG icon (hamburger menu) and triggers a callback when clicked.
 *
 * Props:
 * - `onToggle` (function): Function to call when the button is clicked (toggles sidebar open/close)
 */

type Props = {
    onToggle: () => void;
};

export default function SidebarToggle({ onToggle }: Props) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg hover:bg-gray-200 hover:cursor-pointer"
        >
            {/* Visually hidden label for screen readers */}
            <span className="sr-only">Toggle sidebar</span>

            {/* Hamburger icon */}
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
            </svg>
        </button>
    );
}
