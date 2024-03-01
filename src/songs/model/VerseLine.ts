import { v4 as uuid } from 'uuid';
import type { IVerseLine } from './IVerseLine';

export class VerseLine implements IVerseLine {
  uuid: string;
  text: string;
  chord: string;

  constructor(text: string, chord: string) {
    this.uuid = uuid();
    this.text = text;
    this.chord = chord;
  }
}
