import { NextApiHandler } from 'next';
import prometheusRegistry from '../../src/utils/prometheusRegistry';

const metrics: NextApiHandler = async (_, res) => {
  res.setHeader('Content-Type', prometheusRegistry.contentType)
  res.end(await prometheusRegistry.metrics())
};

export default metrics;
