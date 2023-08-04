import { SongMetaType } from './SongMetaType';

export class SongMeta {
  type: SongMetaType;
  value: string;

  constructor(type: SongMetaType, value: string) {
    this.type = type;
    this.value = value;
  }
}
