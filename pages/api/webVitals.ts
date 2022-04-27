import type { NextApiRequest, NextApiResponse } from 'next';

import { NextWebVitalsExtendedMetric } from '../../src/model/metrics';

import binparWebVitals, { binparWebVitalsByBrowser } from '../../src/utils/binparWebVitals';
import binparWebViews from '../../src/utils/binparWebViews';

const logMetricsData = process.env.LOG_METRICS_DATA === 'true';
const privateMetrics = process.env.PRIVATE_METRICS_DATA === 'true';

const webVitalsHandler = (req: NextApiRequest, res: NextApiResponse): void => {
  const webVitalsList = JSON.parse(req.body as string) as NextWebVitalsExtendedMetric[];
  if (privateMetrics) {
    res.statusCode = 403;
    res.send('Forbidden');
  } else if (webVitalsList) {
    webVitalsList.forEach((webVitalsData): void => {
      const extendedData: Record<string, string | number> = {
        url: webVitalsData.url,
        label: webVitalsData.metric.label,
        name: webVitalsData.metric.name,
      };
      if (logMetricsData) {
        // eslint-disable-next-line no-console
        console.log({ extendedData, ...webVitalsData });
      }
      if (binparWebVitals) {
        binparWebVitals.observe(extendedData, webVitalsData.metric.value);
      }
      if (binparWebVitalsByBrowser) {
        binparWebVitalsByBrowser.observe(
          {
            ...extendedData,
            userAgent: req.headers['user-agent'] ?? '',
          },
          webVitalsData.metric.value,
        );
      }
      if (webVitalsData.isNew) {
        if (binparWebViews) {
          const { label, name, ...additional } = extendedData;
          binparWebViews.inc(additional);
        }
      }
    });
    res.end('ok');
  }
};

export default webVitalsHandler;
