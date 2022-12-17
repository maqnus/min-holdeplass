import JourneyWrapper from '../hooks/journeyContext'
import NextArrivals from '../components/NextArrivals/NextArrivals'
import type { NextPageWithLayout } from './_app'
import Layout from '../components/Layout/Layout'

const Page: NextPageWithLayout = () => {
  return (
    <JourneyWrapper numberOfDepartures={17} stopPlace={{id: 'NSR:StopPlace:4000', name: 'Jernbanetorget', estimatedCalls: []}}>
      <Layout>
        <NextArrivals />
      </Layout>
    </JourneyWrapper>
  )
}

export default Page;
