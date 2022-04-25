/* eslint-disable react/no-danger */
import { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = (): JSX.Element => (
  <Html>
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
