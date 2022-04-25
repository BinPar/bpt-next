export const themeStorageKey = 'theme';

export const {ambient} = process.env;

export const baseUrl =
  ambient === 'release' ? 'https://bpt-next-web-test.binpar.cloud' : 'https://bpt-next-web.binpar.cloud';

export const baseModelUrl = (): string => {
  if (window.location.protocol.startsWith('https')) {
    if (window.location.host.indexOf('-test.') !== -1) {
      return 'https://binpar-web-test.imgix.net/models/';
    }
    return 'https://binpar-web.imgix.net/models/';
  }
  return '/models/';
};
