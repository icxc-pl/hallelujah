import { SongMeta } from './SongMeta';
import { SongMetaType } from './SongMetaType';
import { SongVerse } from './SongVerse';
import { v4 as uuid } from 'uuid';
import { normalizeText } from '@/common/helpers';
import type { ISong } from './ISong';

export class Song implements ISong {
  id?: number;
  uuid: string;
  title: string;
  normalizedTitle: string;
  meta: SongMeta[];
  verses: SongVerse[];

  constructor(
    title: string,
    meta: SongMeta[],
    verses: SongVerse[]
  ) {
    this.uuid = uuid();
    this.title = title;
    this.normalizedTitle = normalizeText(title);
    this.meta = meta;
    this.verses = verses;
  }

  getMetaByType(type: SongMetaType): SongMeta | null {
    for (const metaEntry of this.meta) {
      if (metaEntry.type == type) {
        return metaEntry;
      }
    }

    return null;
  }
}
