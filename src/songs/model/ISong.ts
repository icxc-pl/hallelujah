import type { ISongMeta } from './ISongMeta';
import type { ISongVerse } from './ISongVerse';

export interface ISong {
  uuid: string;
  id: number;
  title: string;
  normalizedTitle: string;
  meta: ISongMeta[];
  verses: ISongVerse[];
}
