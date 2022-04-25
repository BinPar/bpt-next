export const themeStorageKey = 'theme';

export const {ambient} = process.env;

export const baseUrl =
  ambient === 'release' ? 'https://bpt-next-web-test.binpar.cloud' : 'https://bpt-next-web.binpar.online';
