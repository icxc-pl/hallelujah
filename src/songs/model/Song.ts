import { SongMeta } from './SongMeta';
import { SongMetaType } from './SongMetaType';
import { SongVerse } from './SongVerse';
import { v4 as uuid } from 'uuid';
import { normalizeText } from '@/common/helpers';

export class Song {
  uuid: string;
  id: number;
  title: string;
  normalizedTitle: string;
  meta: SongMeta[];
  verses: SongVerse[];

  constructor(
    id: number,
    title: string,
    meta: SongMeta[],
    verses: SongVerse[]
  ) {
    this.uuid = uuid();
    this.id = id;
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
