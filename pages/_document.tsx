/* eslint-disable react/no-danger */
import { Head, Html, Main, NextScript } from 'next/document';
import { defaultTheme } from '../src/config';

const MyDocument = (): JSX.Element => (
  <Html className={defaultTheme === 'dark' ? 'dark' : ''}>
    <Head>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
