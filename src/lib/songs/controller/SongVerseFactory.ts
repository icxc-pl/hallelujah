import { VerseLineFactory } from './VerseLineFactory';
import { type ISongVerse, SongVerse, VerseLine } from '../model';

export class SongVerseFactory implements ISongVerse {
  uuid: string;
  lines: VerseLine[];

  constructor() {
    this.uuid = "";
    this.lines = [];
  }

  addLine(text: string, chord: string): void {
    this.lines.push(new VerseLine(text, chord));
  }

  processLine(line: string): void {
    this.lines.push(VerseLineFactory.fromLine(line));
  }

  isEmpty(): boolean {
    return this.lines.length == 0;
  }

  get(): SongVerse {
    return new SongVerse(this.lines);
  }
}
