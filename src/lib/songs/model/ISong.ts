import type { ISongMeta } from './ISongMeta';
import type { ISongVerse } from './ISongVerse';

export interface ISong {
  hash: string;
  title: string;
  normalizedTitle: string;
  meta: ISongMeta;
  verses: ISongVerse[];
}
