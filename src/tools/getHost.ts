import { NextApiRequest } from 'next';

const getHost = (req: NextApiRequest): string => {
  if (req.headers.host) {
    return req.headers.host.toLowerCase();
  }
  if (req.url) {
    return new URL(req.url).host.toLowerCase();
  }
  console.warn('Robots request with no req.headers.host nor req.url...');
  return '';
};

export default getHost;
