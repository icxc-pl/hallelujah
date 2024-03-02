import { v4 as uuid } from 'uuid';
import type { IPlaylist } from './IPlaylist';

export class Playlist implements IPlaylist {
  uuid: string;
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
    this.uuid = uuid();
    this.id = id;
    this.title = title;
    this.normalizedTitle = normalizeText(title);
    this.meta = meta;
    this.verses = verses;
  }
}
