import { NextApiHandler, NextApiRequest } from 'next';

import getHost from '../../src/tools/getHost';
import getSitemap from '../../src/utils/getSitemap';

import { baseUrl } from '../../src/config/sitemap';

const getBaseUrl = (req: NextApiRequest): string => {
  if (baseUrl) {
    return baseUrl;
  }
  const host = getHost(req);
  return `http${host.includes('localhost') ? '' : 's'}://${host}`;
};

const sitemap: NextApiHandler = async (req, res) => {
  const sitemapBaseUrl = getBaseUrl(req);
  const sitemapInfo = await getSitemap(sitemapBaseUrl);
  res.setHeader('Content-Type', 'application/xml; charset=utf-8').end(sitemapInfo);
};

export default sitemap;
