import { HASH, SPACE, GT } from '@/common/constants';
import { SongMetaFactory } from './SongMetaFactory';
import { SongVerseFactory } from './SongVerseFactory';
import { Song } from '../model/Song';
import { SongMeta } from '../model/SongMeta';
import { SongVerse } from '../model/SongVerse';

const BEGINING: string = HASH + HASH + SPACE;
let COUNTER: number = 0;

export class SongFactory implements Song {
  static isBegining(line: string): boolean {
    return line.startsWith(BEGINING);
  }

  id: number;
  title: string;
  meta: SongMeta[];
  verses: SongVerse[];

  currentVerse: SongVerseFactory | null;

  constructor(title: string) {
    this.id = ++COUNTER;
    this.title = title.substring(BEGINING.length);
    this.meta = [];
    this.verses = [];

    this.currentVerse = null;
  }

  finishVerse(): void {
    if (this.currentVerse != null) {
      this.verses.push(this.currentVerse.get());
      this.currentVerse = null;
    }
  }

  addLine(line: string): void {
    if (line.startsWith(GT)) {
      try {
        this.meta.push(SongMetaFactory.processLine(line));
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

  get(): Song {
    return new Song(this.id, this.title, this.meta, this.verses);
  }
}
