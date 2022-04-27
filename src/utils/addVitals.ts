import { NextWebVitalsMetric } from 'next/app';

import { NextWebVitalsExtendedMetric } from '../model/metrics';

const debouncedVitals = new Array<NextWebVitalsExtendedMetric>();

const apiUrl = '/api/webVitals';

let vitalsTimeOut: NodeJS.Timeout | undefined;

const sendVitals = async (): Promise<void> => {
  vitalsTimeOut = undefined;
  const body = JSON.stringify(debouncedVitals);
  debouncedVitals.length = 0;
  if (navigator.sendBeacon) {
    navigator.sendBeacon(apiUrl, body);
  } else {
    await fetch(apiUrl, { body, method: 'POST', keepalive: true });
  }
};

let lastUrl = '';

const addVitals = (metric: NextWebVitalsMetric, url: string): void => {
  debouncedVitals.push({ url, metric, isNew: lastUrl !== url });
  lastUrl = url;
  if (!vitalsTimeOut) {
    vitalsTimeOut = setTimeout(sendVitals, 1000);
  }
};

export default addVitals;
