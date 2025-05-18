import Link from 'next/link';

export default function Navbar() {
    return (
    <nav className='sticky top-0 z-50 text-white flex flex-row justify-between pt-5 pb-5 pr-10 pl-10 backdrop-blur-md border border-white/20 
        shadow-md hover:shadow-lg'>
        <ul>
            <li>
                <Link href="/" className="text-2xl font-bold">StrataUI</Link>
            </li>
        </ul>
        <ul className='flex flex-row gap-5'>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/library">Library</Link>
            </li>
        </ul>
    </nav>
  );
}