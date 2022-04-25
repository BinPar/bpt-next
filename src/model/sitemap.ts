export interface SitemapUrl {
  loc: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export type SitemapDefaultValues = Required<Pick<SitemapUrl, 'changefreq' | 'priority'>>;
