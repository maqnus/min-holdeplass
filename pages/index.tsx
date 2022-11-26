import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import FutureJourneys from './components/FutureJourneys/FutureJourneys'
import Navigation from './components/Navigation/Navigation'
import SelectedStop from './components/SelectedStop/SelectedStop'
import JourneyWrapper from './journeyContext'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mitt stopp</title>
        <meta name="description" content="Rutedata for din favoritt-holdeplass i sanntid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mitt stopp
        </h1>
        <p className={styles.description}>
          Rutedata for din favoritt-holdeplass <span>i sanntid</span>
        </p>
        
        <Navigation />

        <div className={styles.grid}>
          <JourneyWrapper>
            <SelectedStop />
            <FutureJourneys />
          </JourneyWrapper>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
