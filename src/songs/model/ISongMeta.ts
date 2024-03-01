import { SongMetaType } from './SongMetaType';

export interface ISongMeta {
  uuid: string;
  type: SongMetaType;
  value: string;
}
