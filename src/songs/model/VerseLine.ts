import { v4 as uuid } from 'uuid';

export class VerseLine {
  uuid: string;
  text: string;
  chord: string;

  constructor(text: string, chord: string) {
    this.uuid = uuid();
    this.text = text;
    this.chord = chord;
  }
}
