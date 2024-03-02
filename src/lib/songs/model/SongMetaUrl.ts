import type { ISongMetaUrl } from './ISongMetaUrl';
import { SongMeta } from './SongMeta';
import { SongMetaType } from './SongMetaType';
import { SongMetaUrlType } from './SongMetaUrlType';

export class SongMetaUrl extends SongMeta implements ISongMetaUrl {
  urlType: SongMetaUrlType;

  constructor(urlType: SongMetaUrlType, url: string) {
    super(SongMetaType.URL, url);
    this.urlType = urlType;
  }
}
