import '../styles/index.scss'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import flagsmith from "flagsmith/isomorphic";
import { FlagsmithProvider } from 'flagsmith/react';


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  flagsmithState: any
}

export default function App({ Component, pageProps, flagsmithState }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <FlagsmithProvider
      serverState={flagsmithState}
      options={{
        environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID ?? '',
      }}
      flagsmith={flagsmith}>
        <Component {...pageProps} />
    </FlagsmithProvider>
  )
}

App.getInitialProps = async () => {
  await flagsmith.init({ // fetches flags on the server and passes them to the App 
      environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID ?? '',
  });
  return { flagsmithState: flagsmith.getState() }
}
