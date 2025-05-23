'use client';


export default function HeaderSection() {
  return (
    <div className="max-w-2xl text-center mx-auto">
      <div className="flex flex-col items-center gap-4 justify-center">
        <p className="font-space-mono text-xs text-black bg-white/10 backdrop-blur-md border border-black/20 
                rounded-3xl no-underline px-3 py-1 
                transition-all duration-300 hover:scale-[1.02]">Over 300 tools for you to discover!</p>
        <h1 className=" text-black text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">Explore Toolkits</h1>
      </div>
      <p className="text-black/60 mt-5 text-sm md:text-md lg:text-base font-semibold">
        Discover your next go-to toolkit — explore powerful, beautifully crafted libraries and components to supercharge your next project and streamline your development workflow.
      </p>
    </div>
  );
}
