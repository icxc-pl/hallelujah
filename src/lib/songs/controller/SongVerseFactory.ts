import { v4 as uuid } from 'uuid';
import { VerseLineFactory } from './VerseLineFactory';
import { type ISongVerse, type IVerseLine } from '../model';

export class SongVerseFactory implements ISongVerse {
  lines: IVerseLine[];

  constructor() {
    this.lines = [];
  }

  processLine(line: string): void {
    this.lines.push(VerseLineFactory.fromLine(line));
  }

  isEmpty(): boolean {
    return this.lines.length == 0;
  }

  get(): ISongVerse {
    return createSongVerseObject(this.lines);
  }
}

export function createSongVerseObject(lines: IVerseLine[]): ISongVerse {
  return {
    uuid: uuid(),
    lines
  };
}
