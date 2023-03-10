import '@/styles/globals.scss'
import styles from '../styles/Navbar.module.scss'

import type { AppProps } from 'next/app'
import Layout from '../components/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
