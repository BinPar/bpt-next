import { SitemapDefaultValues, SitemapUrl } from '../model/sitemap';

export const sitemapDefaultValues: SitemapDefaultValues = {
  changefreq: 'monthly',
  priority: 0.7,
};

export const baseUrl = process.env.BASE_URL;

export const sitemapLocales = ['en'];

// eslint-disable-next-line @typescript-eslint/require-await
export const getSitemapUrlsData = async (): Promise<SitemapUrl[]> => {

  const sitemapUrlsData = new Array<SitemapUrl>(
    {
      loc: '/',
      priority: 1,
    },
  );
  return sitemapUrlsData;
};
