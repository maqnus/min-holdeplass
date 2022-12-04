import styles from './Home.module.scss';
import Head from 'next/head'
import JourneyWrapper, { useJourneyContext } from '../hooks/journeyContext'
import NextArrivals from '../components/NextArrivals/NextArrivals';

const Title = () => {
  const {stopPlaceName} = useJourneyContext();
  return (
    <section className='section'>
      <h1 className={`title is-flex is-justify-content-center ${styles.title}`}>
        I <span className='materialIcon'>favorite</span> {stopPlaceName}
      </h1>
      <p className={`subtitle has-text-centered ${styles.subtitle}`}>
        Rutedata for verdens beste holdeplass <span>i sanntid</span>
      </p>
    </section>
  )
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Mitt stopp</title>
        <meta name="description" content="Rutedata for din favoritt-holdeplass i sanntid" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </Head>
      <JourneyWrapper numberOfDepartures={17}>
        <header className={styles.header}>
          <Title />
        </header>
        <main>
          <div className='container'>
            <NextArrivals />
          </div>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://kjelland.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Laget av Magnus Nymo Kjelland
          </a>
        </footer>
      </JourneyWrapper>
    </>
  )
}
