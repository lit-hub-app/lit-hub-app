import Link from 'next/link';

export default function NavBarComponent() {
  return (
    <nav>
      <Link href='/'>HOME</Link>
      <Link href='/about'>LINK TO PAGE</Link>
    </nav>
  )
};
