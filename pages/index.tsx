import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Index: React.FC = () => {
  const { t } = useTranslation('index');
  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
        <meta property="og:image" content="/assets/rocketLaptop.png" />
      </Head>
      <h1>{t('pageTitle')}</h1>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'es', ['index'])),
  },
});

export default Index;
