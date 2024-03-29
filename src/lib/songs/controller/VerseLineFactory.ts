import { v4 as uuid } from 'uuid';
import { type IVerseLine } from '../model';

const SEPARATOR: string = ' | ';

export class VerseLineFactory {
  static fromLine(line: string): IVerseLine {
    const parts: string[] = line.split(SEPARATOR);
    return createVerseLineObject(parts[0], parts[1]);
  }
}

export function createVerseLineObject(text: string, chord: string): IVerseLine {
  return {
    uuid: uuid(),
    text,
    chord
  };
}
