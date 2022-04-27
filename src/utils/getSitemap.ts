import builder from 'xmlbuilder';

import {
  getSitemapUrlsData,
  sitemapDefaultValues as defaults,
  sitemapLocales as locales,
} from '../config/sitemap';

const buildSitemap = async (baseUrl: string): Promise<string> => {
  const urls = await getSitemapUrlsData();
  const now = new Date().toISOString();
  const urlset = builder
    .create('urlset')
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .att('xmlns:news', 'http://www.google.com/schemas/sitemap-news/0.9')
    .att('xmlns:xhtml', 'http://www.w3.org/1999/xhtml')
    .att('xmlns:mobile', 'http://www.google.com/schemas/sitemap-mobile/1.0')
    .att('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1')
    .att('xmlns:video', 'http://www.google.com/schemas/sitemap-video/1.1');

  for (let i = 0, l = urls.length; i < l; i++) {
    const { loc, changefreq = defaults.changefreq, priority = defaults.priority } = urls[i];
    const url = urlset.ele('url');
    url.ele('loc', `${baseUrl}${loc}`.replace(/\/$/, ''));
    url.ele('changefreq', changefreq);
    url.ele('priority', priority);
    url.ele('lastmod', now);
    for (let j = 0, k = locales.length; j < k; j++) {
      const locale = locales[j];
      url
        .ele('xhtml:link')
        .att('rel', 'alternate')
        .att('hreflang', locale)
        .att('href', `${baseUrl}/${locale}${loc}`.replace(/\/$/, ''));
    }
  }

  const sitemap = urlset.end({ pretty: true });
  return sitemap;
};

const getSitemap = async (baseUrl: string): Promise<string> => buildSitemap(baseUrl);

export default getSitemap;
