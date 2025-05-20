import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 text-white flex flex-row justify-between pt-5 pb-5 pr-10 pl-10 backdrop-blur-md border-b border-white/20">
            <div className="flex flex-row items-center gap-5">
              <ul className="flex items-center gap-2">
                  <li>
                      <Link href="/" className="flex items-center gap-2 text-2xl font-semibold font-space-mono">
                          <Image
                              src="/strataui-icon.png"
                              alt="StrataUI Icon"
                              width={25}
                              height={25}
                              priority
                          />
                          StrataUI
                      </Link>
                  </li>
              </ul>
              <span className='text-white/60 bg-white/10 pt-1 pb-1 pl-2 pr-2 text-xs rounded-xl outline-1 outline-white/30 font-semibold'>v1.0</span>
            </div>
            <ul className="flex flex-row gap-5 font-semibold text-white/90">
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
