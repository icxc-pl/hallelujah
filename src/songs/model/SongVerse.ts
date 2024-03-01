import { v4 as uuid } from 'uuid';
import { VerseLine } from './VerseLine';
import type { ISongVerse } from './ISongVerse';

export class SongVerse implements ISongVerse {
  uuid: string;
  lines: VerseLine[];

  constructor(lines: VerseLine[]) {
    this.uuid = uuid();
    this.lines = lines;
  }
}
