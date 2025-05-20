'use client';


export default function HeaderSection() {
  return (
    <div className="max-w-2xl text-center mx-auto mb-10">
      <div className="flex flex-col items-center gap-4 justify-center">
        <p className="font-space-mono text-xs text-white/90 bg-white/10 backdrop-blur-md border border-white/20 
                rounded-3xl shadow-md no-underline px-3 py-1 
                transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">Over 300 tools for you to discover!</p>
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">Explore Toolkits</h1>
      </div>
      <p className="text-white/80 mt-5 text-sm md:text-md lg:text-base">
        Discover your next go-to toolkit — explore powerful, beautifully crafted libraries and components to supercharge your next project and streamline your development workflow.
      </p>
    </div>
  );
}
