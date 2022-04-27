import { NextApiHandler } from 'next';

const allowAll = `
User-agent: *
Allow: /
`;

const disallowAll = `
User-agent: *
Disallow: /
`;

// eslint-disable-next-line @typescript-eslint/require-await
const robots: NextApiHandler = async (_, res) => {
  if (process.env.ambient === 'release') {
    res.end(allowAll);
  } else {
    res.end(disallowAll);
  }
};

export default robots;
