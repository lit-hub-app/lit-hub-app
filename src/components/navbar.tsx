import Link from 'next/link';

export default function NavBarComponent() {
  return (
    <nav id='navbar'>
      <Link href='/'>HOME</Link>
      <Link href='/library'>Library</Link>
      <Link href='/about'>ABOUT</Link>
    </nav>
  )
};

