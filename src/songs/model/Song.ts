import { SongMeta } from './SongMeta';
import { SongMetaType } from './SongMetaType';
import { SongVerse } from './SongVerse';

export class Song {
  id: number;
  title: string;
  meta: SongMeta[];
  verses: SongVerse[];

  constructor(
    id: number,
    title: string,
    meta: SongMeta[],
    verses: SongVerse[]
  ) {
    this.id = id;
    this.title = title;
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
