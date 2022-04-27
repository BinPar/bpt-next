import { getSitemapUrlsData, sitemapLocales } from '../config/sitemap';

const getAllUrls = async (): Promise<string[]> => {
  const result = new Array<string>();
  const urls = await getSitemapUrlsData();
  urls.forEach((url) => {
    result.push(url.loc);
    sitemapLocales.forEach((locale) => {
      result.push(`/${locale}${url.loc}`);
    });
  });
  return result;
};

export default getAllUrls;
