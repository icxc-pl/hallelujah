import { VerseLine } from '../model/VerseLine';

export class SongVerse {
  lines: VerseLine[];

  constructor(lines: VerseLine[]) {
    this.lines = lines;
  }
}
