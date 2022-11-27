import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import NextArrivals from './components/NextArrivals/NextArrivals'
import Navigation from './components/Navigation/Navigation'
import JourneyWrapper, { useJourneyContext } from './journeyContext'

const Title = () => {
  const {stopPlaceName} = useJourneyContext();
  return (
    <h1 className={styles.title}>I <span className={styles.materialIcon}>favorite</span> {stopPlaceName} </h1>
  )
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mitt stopp</title>
        <meta name="description" content="Rutedata for din favoritt-holdeplass i sanntid" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
      </Head>
      <JourneyWrapper>
        <main className={styles.main}>
          <Title />
          <p className={styles.description}>
            Rutedata for verdens beste holdeplass <span>i sanntid</span>
          </p>
          
          {/* <Navigation /> */}

          <div className={styles.grid}>
              <NextArrivals />
          </div>
        </main>
      </JourneyWrapper>


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
