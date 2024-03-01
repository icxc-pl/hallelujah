import type { ISongMeta } from './ISongMeta';
import { SongMetaType } from './SongMetaType';
import { v4 as uuid } from 'uuid';

export class SongMeta implements ISongMeta {
  uuid: string;
  type: SongMetaType;
  value: string;

  constructor(type: SongMetaType, value: string) {
    this.uuid = uuid();
    this.type = type;
    this.value = value;
  }
}
