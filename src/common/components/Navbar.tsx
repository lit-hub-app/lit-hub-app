import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/components/Navbar.module.scss';
import { getCookie } from 'cookies-next';

export default function NavBarComponent() {

  const router = useRouter();
  
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    console.log("Reloading")
    const cookie = getCookie('logged-in') as boolean;
    setLoggedIn(cookie);
    //router.reload(window.location.pathname);
  }, []);
  
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
            {
              loggedIn ? (
                <Link href='/profile'>Profile</Link>
              ) : (
                <Link href='/login'>Login</Link>
              )
            }
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};
