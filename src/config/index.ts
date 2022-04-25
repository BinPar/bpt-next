import { Ambient } from '../model/data';
import { Theme } from '../model/react';

export const defaultTheme: Theme = 'dark';

export const themeStorageKey = 'theme';

export const ambient = process.env.ambient as Ambient;

export const baseUrl =
  ambient === 'release' ? 'https://binpar.com' : 'https://web-test.binpar.cloud';

export const cndURL =
  ambient === 'release' ? 'https://binpar-web.imgix.net' : 'https://binpar-web-test.imgix.net';

export const baseModelUrl = (): string => {
  if (window.location.protocol.startsWith('https')) {
    if (window.location.host.indexOf('-test.') !== -1) {
      return 'https://binpar-web-test.imgix.net/models/';
    }
    return 'https://binpar-web.imgix.net/models/';
  }
  return '/models/';
};
