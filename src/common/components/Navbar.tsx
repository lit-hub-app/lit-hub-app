import Link from 'next/link';
import styles from '@/styles/Navbar.module.scss';

export default function NavBarComponent() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navBrand}>
        <Link href='/'>LITHUB</Link>
      </div>
      <div className={styles.navMenu}>
        <ul>
          <li>
            <Link href='/library'>Library</Link>
          </li>
          <li>
            <Link href='/reader'>Reader</Link>
          </li>
          <li>
            <Link href='/login'>Login</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};
