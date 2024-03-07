import { VerseLine } from '../model';

const SEPARATOR: string = ' | ';

export class VerseLineFactory {
  static fromLine(line: string): VerseLine {
    const parts: string[] = line.split(SEPARATOR);
    return new VerseLine(parts[0], parts[1]);
  }
}
