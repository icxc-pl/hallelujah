import { VerseLineFactory } from './VerseLineFactory';
import { VerseLine } from '../model/VerseLine';
import { SongVerse } from '../model/SongVerse';

export class SongVerseFactory implements SongVerse {
  lines: VerseLine[];

  constructor() {
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
