'use client';

/**
 * HeaderSection Component
 *
 * This component renders the hero/header area Library page on StrataUI.
 * It includes:
 * - A badge-style subtitle
 * - A large headline
 * - A supporting paragraph of descriptive text
 *
 * It's designed to be centered and responsive, adapting to different screen sizes.
 */

export default function HeaderSection() {
    return (
        // Container centers the content and limits its width
        <div className="max-w-4xl p-7 items-center text-center mx-auto">
            
            {/* Title block: badge + headline */}
            <div>
                {/* Main heading */}
                <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                    Discover tools that power your workflow
                </h1>
            </div>

            {/* Supporting description */}
            <p className="text-black/70 mt-4 text-sm md:text-md lg:text-base">
                Explore powerful, beautifully crafted libraries and components to supercharge your next project and streamline your development workflow.
            </p>
        </div>
    );
}
