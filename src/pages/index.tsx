// import styles from '@/styles/Navbar.module.scss'
// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import Link from 'next/link';
// import Layout from '../components/layout'
// const inter = Inter({ subsets: ['latin'] })
// export default function IndexPage() {
//   return (
//     <div>
//       LIB HUB
//     </div>
//   );
// };

import { useState, useEffect } from 'react';
import type { NextPage } from "next";
import type api from './api/getBooks';

const Home: NextPage = () => {

  useEffect(() => {
    console.log('use effect invoked')
    void fetch('api/getBooks')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => (console.log('api/getBooks', error)));
  }, []);

  return <div>Lit Hub</div>;
};

export default Home;