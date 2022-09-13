/* eslint-disable react/jsx-props-no-spreading */
import { appWithTranslation, SSRConfig } from 'next-i18next';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { ComponentType } from 'react';

import addVitals from '../src/utils/addVitals';

import '../src/styles/globals.css';

type AppPropsWithSSRConfig = AppProps & { pageProps: SSRConfig };

const App: ComponentType<AppPropsWithSSRConfig> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>BinPar | Digital Ignition</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  addVitals(metric, window?.location?.pathname ?? '');
};

export default appWithTranslation(App);
