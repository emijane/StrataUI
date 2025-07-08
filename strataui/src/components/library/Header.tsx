'use client';

/**
 * HeaderSection Component
 *
 * This component renders the hero/header area of the Toolkits page in StrataUI.
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
        <div className="max-w-2xl text-center mx-auto">
            
            {/* Title block: badge + headline */}
            <div className="flex flex-col items-center gap-4 justify-center">

                {/* Badge-style subtitle */}
                <p
                    className="font-space-mono text-xs text-black bg-white/10 backdrop-blur-md border border-black/20 
                               rounded-3xl no-underline px-3 py-1 
                               transition-all duration-300 hover:scale-[1.02]"
                >
                    Over 300+ tools for you to discover!
                </p>

                {/* Main heading */}
                <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                    Find your next toolkit
                </h1>
            </div>

            {/* Supporting description */}
            <p className="text-black/60 mt-5 text-sm md:text-md lg:text-base font-semibold">
                Explore powerful, beautifully crafted libraries and components
                to supercharge your next project and streamline your development workflow.
            </p>
        </div>
    );
}
