import type { ISongMeta } from './ISongMeta';
import { SongMetaUrlType } from './SongMetaUrlType';

export interface ISongMetaUrl extends ISongMeta {
  urlType: SongMetaUrlType;
}
