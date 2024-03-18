import { HASH, SPACE, NL, EMPTY_STRING } from '@/common/constants';
import { type ISong } from './model';
import { SongFactory } from './controller/SongFactory';

const BEGINING: string = HASH + SPACE;

export class SongImporter {
  songs: ISong[];
  currentSong: SongFactory | null;

  constructor() {
    this.songs = [];
    this.currentSong = null;
  }

  getLines(content: string): string[] {
    const lines: string[] = content.split(NL);

    while (lines.length > 0) {
      const line: string | undefined = lines.shift();
      if (typeof line == 'undefined' || line.startsWith(BEGINING)) {
        break;
      }
    }

    return lines;
  }

  beginNewSong(line: string) {
    this.currentSong = new SongFactory(line);
  }

  endCurrentsong() {
    if (this.currentSong != null) {
      this.songs.push(this.currentSong.get());
    }
    this.currentSong = null;
  }

  process(content: string): ISong[] {
    this.songs = [];
    const lines = this.getLines(content);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (SongFactory.isBegining(line)) {
        this.endCurrentsong();
        this.beginNewSong(line);
        continue;
      }

      if (this.currentSong == null) {
        continue;
      }

      if (line == EMPTY_STRING) {
        if (i + 1 < lines.length) {
          this.currentSong.finishVerse();
        }
        continue;
      }

      this.currentSong.addLine(line);
    }

    this.endCurrentsong();
    
    return this.songs;
  }
}
