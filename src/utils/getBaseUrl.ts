import { baseUrl } from '../config';

const getBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      return baseUrl;
    }
    return 'http://localhost:3000';
  }
  return window.location.origin;
};

export default getBaseUrl;
