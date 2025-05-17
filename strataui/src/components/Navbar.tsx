import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
          <Link href="/library">Library</Link>
        </li>
      </ul>
    </nav>
  );
}
