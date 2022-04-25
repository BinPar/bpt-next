import { Counter } from 'prom-client';
import prometheusRegistry from './prometheusRegistry';

let binparWebViews:
  | Counter<'url' | 'userAgent' | 'label' | 'name'>
  | undefined;

if (process.env.NODE_ENV === 'production') {
  binparWebViews = new Counter({
    name: 'binpar_web_views',
    help: 'General BinPar Web Views',
    labelNames: ['url', 'userAgent', 'label', 'name'],
  });
  prometheusRegistry.registerMetric(binparWebViews);
}

const currentBinparWebViews = binparWebViews;

export default currentBinparWebViews;
