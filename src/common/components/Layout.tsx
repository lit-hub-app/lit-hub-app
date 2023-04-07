import Navbar from './Core/Navbar';
import Head from 'next/head';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Lit Hub eReader</title>
        <meta name="description" content="Lit Hub E-Reader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  )
};
