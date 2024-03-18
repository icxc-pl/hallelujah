import { HASH, SPACE, GT } from '@/common/constants';
import { SongMetaFactory } from './SongMetaFactory';
import { SongVerseFactory } from './SongVerseFactory';
import { type ISong, type ISongMeta, type ISongVerse } from '../model';
import { normalizeText } from '@/common/helpers';
import { blake2bHex } from 'blakejs';

const BEGINING: string = HASH + HASH + SPACE;

export class SongFactory implements ISong {

  static isBegining(line: string): boolean {
    return line.startsWith(BEGINING);
  }

  id?: number;
  hash: string;
  title: string;
  normalizedTitle: string;
  meta: SongMetaFactory;
  verses: ISongVerse[];

  currentVerse?: SongVerseFactory;

  constructor(title: string) {
    this.hash = "";
    this.title = title.substring(BEGINING.length);
    this.normalizedTitle = "";
    this.meta = new SongMetaFactory();
    this.verses = [];

    this.currentVerse = undefined;
  }

  finishVerse(): void {
    if (this.currentVerse != null) {
      this.verses.push(this.currentVerse.get());
      delete this.currentVerse;
    }
  }

  addLine(line: string): void {
    if (line.startsWith(GT)) {
      try {
        this.meta.processLine(line);
      } catch (e) {
        console.warn(e as string);
      }
    } else {
      if (this.currentVerse == null) {
        this.currentVerse = new SongVerseFactory();
      }

      this.currentVerse.processLine(line);
    }
  }

  get(): ISong {
    return createSong(this.title, this.meta.get(), this.verses);
  }
}

export function createSong(title: string, meta: ISongMeta, verses: ISongVerse[]): ISong {
  return {
    hash: blake2bHex(title, undefined, 4),
    title,
    normalizedTitle: normalizeText(title),
    meta: meta,
    verses: verses
  };
}
