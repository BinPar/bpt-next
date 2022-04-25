import { NextWebVitalsMetric } from 'next/app';

export interface NextWebVitalsExtendedMetric {
  url: string;
  metric: NextWebVitalsMetric;
  isNew: boolean;
}