import Head from 'next/head';
import { Navbar, Footer } from '@/common/components/core';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Gutendex eReader</title>
        <meta name="description" content="Lit Hub E-Reader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <div id="page-container">
          {children}
        </div>
      </main>

      <Footer />
    </>
  )
};
