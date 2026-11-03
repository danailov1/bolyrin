import credits from './image-credits.json';

export interface ImageCredit {
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  description?: string;
}

export const imageCredits = credits as Record<string, ImageCredit>;

export function getImageCredit(src?: string): ImageCredit | undefined {
  if (!src) return undefined;
  return imageCredits[src.split('?')[0]];
}
