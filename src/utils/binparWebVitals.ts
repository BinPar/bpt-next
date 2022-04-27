import { Summary } from 'prom-client';
import prometheusRegistry from './prometheusRegistry';

let binparWebVitals:
  | Summary<'url' | 'label' | 'name'>
  | undefined;

let refBinparWebVitalsByBrowser:
  | Summary<'url' | 'userAgent' | 'label' | 'name'>
  | undefined;


if (process.env.NODE_ENV === 'production') {
  binparWebVitals = new Summary({
    name: 'binpar_web_vitals_general',
    help: 'General BinPar Web Vitals',
    labelNames: ['url', 'label', 'name'],
    percentiles: [0.01, 0.1, 0.5, 0.9, 0.99],
  });
  prometheusRegistry.registerMetric(binparWebVitals);
  refBinparWebVitalsByBrowser = new Summary({
    name: 'binpar_web_vitals_agent',
    help: 'General BinPar Web Vitals',
    labelNames: ['url', 'userAgent', 'label', 'name'],
    percentiles: [0.01, 0.1, 0.5, 0.9, 0.99],
  });
  prometheusRegistry.registerMetric(refBinparWebVitalsByBrowser);
}

const currentBinparWebVitals = binparWebVitals;

export default currentBinparWebVitals;

export const binparWebVitalsByBrowser = refBinparWebVitalsByBrowser;