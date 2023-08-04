import { v4 as uuid } from 'uuid';
import { VerseLine } from '../model/VerseLine';

export class SongVerse {
  uuid: string;
  lines: VerseLine[];

  constructor(lines: VerseLine[]) {
    this.uuid = uuid();
    this.lines = lines;
  }
}
