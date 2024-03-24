import { HASH, SPACE, GT } from '@/common/constants';
import { SongMetaFactory } from './SongMetaFactory';
import { SongVerseFactory } from './SongVerseFactory';
import { type ISong, type ISongMeta, type ISongVerse } from '../model';
import { blake2bHex } from 'blakejs';

const BEGINING: string = HASH + HASH + SPACE;

export class SongFactory implements ISong {

  static isBegining(line: string): boolean {
    return line.startsWith(BEGINING);
  }

  hash: string;
  title: string;
  meta: SongMetaFactory;
  verses: ISongVerse[];
  searchText: string;

  currentVerse?: SongVerseFactory;

  constructor(title: string) {
    this.hash = "";
    this.title = title.substring(BEGINING.length);
    this.meta = new SongMetaFactory();
    this.verses = [];
    this.searchText = "";

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
  const searchText = [
    title,
    verses.map((verse) => verse.lines.map((line) => line.text).join("\n")).join("\n"),
    Object.values(meta).join("\n").replace(/ ?\[object Object\] ?/, " ")
  ].join("\n");
  // console.log(searchText);
  return {
    hash: blake2bHex(title, undefined, 4),
    title,
    meta,
    verses,
    searchText
  };
}
